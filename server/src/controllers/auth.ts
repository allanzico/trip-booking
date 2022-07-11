import User from "../models/User";
import jwt from "jsonwebtoken";
import EmailSender from "../lib/sendEmail";
import crypto from "crypto";
import UserInterests from "../models/UserInterests";
const authy = require("authy")(<string>process.env.AUTHY_API_KEY);

export default class Authentication {
  //register users
  async registerUser(req: any, res: any, next: any): Promise<void> {
    const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
    const authToken = <string>process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);
    const twilioVerifyService = await client.verify.v2.services
      .create({ friendlyName: "Kusimbula" })
      .then((service: any) => service.sid);
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      userInterests,
      phone,
      role,
    } = req.body;
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        userInterests,
        role,
        phone,
        verifyToken: twilioVerifyService,
      });
      res.status(201).json({ success: true, user });
    } catch (error) {
      console.log(error);
      next(error);
    }

    // try {
    //   const { name, email, password } = req.body;
    //   let userExists = await User.findOne({ email: { $eq: email } }).exec();

    //   if (!email) return res.status(400).send("email is required");
    //   if (!password || password.length < 8)
    //     return res
    //       .status(400)
    //       .send("Make sure password is at least 8 characters long");
    //   if (userExists) return res.status(400).send("This email is taken");

    //   const user = new User(req.body);
    //   await user.save();
    //   console.log("USER CREATED", user);
    //   return res.json({ ok: true });
    // } catch (error) {
    //   console.log("CREATE USER FAILED", error);
    //   return res.sendStatus(400);
    // }
  }

  async updateUser(req: any, res: any) {
    //UPDATE
    const { password, firstName, lastName, phone, userId } = req.body;
    try {
      const user = await User.findById(userId);
      if (user) {
        user.password = password || user.password;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.phone = phone || user.phone;
        if (!password || password == null) {
          user.password = user.password;
        }
        await user.save();
        res.status(201).json({
          success: true,
          user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
          },
          message: "Profile updated!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Login users
  async loginUser(req: any, res: any, next: any) {
    const { email, password } = req.body;
    const tokenSecret = process.env.JWT_SECRET;
    // console.log(require('crypto').randomBytes(64).toString('hex'))

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, error: "Please provide email and password" });
    }

    try {
      let user = await User.findOne({ email }).select("+password");

      const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
      const authToken = <string>process.env.TWILIO_AUTH_TOKEN;
      const client = require("twilio")(accountSid, authToken);

      if (!user)
        return res.status(400).json({
          success: false,
          error: "Invalid credentials",
        });

      //generate token
      const token = jwt.sign({ _id: user._id }, <string>tokenSecret, {
        expiresIn: "7d",
      });

      //compare password
      const isMatch = await user.matchPasswords(password);
      if (!isMatch) {
        res.status(404).json({ success: false, error: "Invalid credentials" });
      }

      //SEND SMS
      await client.verify.v2
        .services(user.verifyToken)
        .verifications.create({ to: user.phone.number, channel: "sms" })
        .then((verification: any) => verification.status);

      res.status(201).json({
        success: true,
        token,
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          userInterest: user.userInterests,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSession: user.stripeSession,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      console.log("LOGIN FAILED", error);
      next(error);
    }
  }

  async logoutUser(req: any, res: any) {
    const userId = req.body._id;
    try {
      const user = await User.findById(userId).select("-password");
      user.verificationStatus = "pending";
      await user.save();
    } catch (error) {
      console.log(error);
    }
  }

  async getUsersById(req: any, res: any) {
    try {
      let user = await User.findById(req.params.userId)
        .select("-password")
        .exec();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async forgotPassword(req: any, res: any, next: any) {
    const { email } = req.body;
    const passwordResetUrl = process.env.RESET_URL;
    const emailSender = new EmailSender();
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return next(new ErrorResponse("Email could not be sent", 404));
      }

      const resetToken = user.getResetPasswordToken();
      await user.save();

      const resetUrl = `${passwordResetUrl}/${resetToken}`;
      const message = `
      <h1> You have requested a password reset </h1>
      <p> Please go to this link to reset your password </p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;
      try {
        await emailSender.sendEmail({
          to: user.email,
          subject: "Password reset request",
          text: message,
        });

        res.status(200).json({ success: true, data: "Reset email sent" });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        console.log(error);
        await user.save();
        // return next(new ErrorResponse("Email could not be sent", 500));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async resetPassword(req: any, res: any, next: any) {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");
    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        res.status(404).json({ success: false, data: "Invalid reset token" });
        // stop further execution in this callback
        return;
      }
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      res
        .status(201)
        .json({ success: true, data: "Password reset successful" });
    } catch (error) {
      next(error);
    }
  }

  //2FACTOR AUTHENTICATION

  // async sendTwoFactorToken(phoneNumber: any, twilioVerifyService: any) {
  //   const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
  //   const authToken = <string>process.env.TWILIO_AUTH_TOKEN;
  //   const client = require("twilio")(accountSid, authToken);
  //   try {
  //     await client.verify.v2
  //         .services(twilioVerifyService)
  //         .verifications.create({ to: phoneNumber, channel: "sms" })
  //         .then((verification: any) => (verification.status));
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // }

  async verifyTwofactorAuth(req: any, res: any) {
      const {code} = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    const phoneNumber = user.phone.number;
    const service = user.verifyToken
    try {
      const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
      const authToken = <string>process.env.TWILIO_AUTH_TOKEN;
      const client = require("twilio")(accountSid, authToken);

     const verificationCheck = await client.verify.v2
        .services(service)
        .verificationChecks.create({ to: phoneNumber, code: code })
        .then((verification_check: any) =>
          (verification_check)
        );

      if (verificationCheck.status === "approved") {
        user.verificationStatus = verificationCheck.status;
        await user.save();
        res.status(200).json({ success: true, data: user });
      }else {
        res.status(400).json({ success: false, data: "user not verified" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, data: error });
    }
  }

  async createUserInterests(req: any, res: any, next: any) {
    const { title } = req.body;
    try {
      const userInterests = await UserInterests.create({
        title,
      });
      res.status(201).json({ success: true, userInterests });
    } catch (error) {
      next(error);
    }
  }

  async getUserInterests(req: any, res: any) {
    try {
      let userInterests = await UserInterests.find({})
        .select("-image.data")
        .exec();
      res.json(userInterests);
    } catch (error) {
      console.log(error);
    }
  }
}
