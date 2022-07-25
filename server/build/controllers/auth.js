"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = __importDefault(require("../lib/sendEmail"));
const crypto_1 = __importDefault(require("crypto"));
const UserInterests_1 = __importDefault(require("../models/UserInterests"));
class Authentication {
    //register users
    async registerUser(req, res, next) {
        var _a, _b;
        const accountSid = (_a = process.env) === null || _a === void 0 ? void 0 : _a['TWILIO_ACCOUNT_SID'];
        const authToken = (_b = process.env) === null || _b === void 0 ? void 0 : _b['TWILIO_AUTH_TOKEN'];
        const client = require("twilio")(accountSid, authToken);
        const twilioVerifyService = await client.verify.v2.services
            .create({ friendlyName: "Kusimbula" })
            .then((service) => service.sid);
        const { firstName, lastName, email, password, confirmPassword, userInterests, phone, role, } = req.body;
        try {
            const user = await User_1.default.create({
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
        }
        catch (error) {
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
    async updateUser(req, res) {
        //UPDATE
        const { password, firstName, lastName, phone, userId } = req.body;
        try {
            const user = await User_1.default.findById(userId);
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
        }
        catch (error) {
            console.log(error);
        }
    }
    //Login users
    async loginUser(req, res, next) {
        var _a, _b, _c;
        const { email, password } = req.body;
        const tokenSecret = (_a = process.env) === null || _a === void 0 ? void 0 : _a['JWT_SECRET'];
        // console.log(require('crypto').randomBytes(64).toString('hex'))
        if (!email || !password) {
            res
                .status(400)
                .json({ success: false, error: "Please provide email and password" });
        }
        try {
            let user = await User_1.default.findOne({ email }).select("+password");
            const accountSid = (_b = process.env) === null || _b === void 0 ? void 0 : _b['TWILIO_ACCOUNT_SID'];
            const authToken = (_c = process.env) === null || _c === void 0 ? void 0 : _c['TWILIO_AUTH_TOKEN'];
            const client = require("twilio")(accountSid, authToken);
            if (!user)
                return res.status(400).json({
                    success: false,
                    error: "Invalid credentials",
                });
            //generate token
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, tokenSecret, {
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
                .then((verification) => verification.status);
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
                    verificationStatus: user.verificationStatus,
                    stripe_account_id: user.stripe_account_id,
                    stripe_seller: user.stripe_seller,
                    stripeSession: user.stripeSession,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            });
        }
        catch (error) {
            console.log("LOGIN FAILED", error);
            next(error);
        }
    }
    async logoutUser(req, res) {
        const userId = req.body._id;
        try {
            const user = await User_1.default.findById(userId).select("-password");
            user.verificationStatus = "pending";
            await user.save();
            res.status(200).json({ success: true, data: "user logged out" });
        }
        catch (error) {
            console.log(error);
        }
    }
    async getUsersById(req, res) {
        try {
            let user = await User_1.default.findById(req.params.userId)
                .select("-password")
                .exec();
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    async getUsers(req, res) {
        try {
            let users = await User_1.default.find({ _id: { $ne: req.params.userId } }).select("firstName lastName email").exec();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    async forgotPassword(req, res, next) {
        var _a;
        const { email } = req.body;
        const passwordResetUrl = (_a = process.env) === null || _a === void 0 ? void 0 : _a['RESET_URL'];
        const emailSender = new sendEmail_1.default();
        try {
            const user = await User_1.default.findOne({ email });
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
            }
            catch (error) {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;
                console.log(error);
                await user.save();
                // return next(new ErrorResponse("Email could not be sent", 500));
            }
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async resetPassword(req, res, next) {
        const resetPasswordToken = crypto_1.default
            .createHash("sha256")
            .update(req.params.resetToken)
            .digest("hex");
        try {
            const user = await User_1.default.findOne({
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
        }
        catch (error) {
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
    async verifyTwofactorAuth(req, res) {
        var _a, _b, _c, _d, _e;
        const { code } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const user = await User_1.default.findById(userId).select("-password");
        const phoneNumber = (_b = user.phone) === null || _b === void 0 ? void 0 : _b.number;
        const tokenSecret = (_c = process.env) === null || _c === void 0 ? void 0 : _c['JWT_SECRET'];
        const service = user === null || user === void 0 ? void 0 : user.verifyToken;
        try {
            const accountSid = (_d = process.env) === null || _d === void 0 ? void 0 : _d['TWILIO_ACCOUNT_SID'];
            const authToken = (_e = process.env) === null || _e === void 0 ? void 0 : _e['TWILIO_AUTH_TOKEN'];
            const client = require("twilio")(accountSid, authToken);
            const verificationCheck = await client.verify.v2
                .services(service)
                .verificationChecks.create({ to: phoneNumber, code: code })
                .then((verification_check) => verification_check);
            if (verificationCheck.status === "approved") {
                user.verificationStatus = verificationCheck.status;
                await user.save();
                //generate token
                const token = jsonwebtoken_1.default.sign({ _id: user._id }, tokenSecret, {
                    expiresIn: "7d",
                });
                res.status(201).json({
                    success: true,
                    token,
                    user: {
                        _id: user._id,
                        firstName: user === null || user === void 0 ? void 0 : user.firstName,
                        lastName: user === null || user === void 0 ? void 0 : user.lastName,
                        email: user === null || user === void 0 ? void 0 : user.email,
                        phone: user === null || user === void 0 ? void 0 : user.phone,
                        role: user === null || user === void 0 ? void 0 : user.role,
                        userInterest: user === null || user === void 0 ? void 0 : user.userInterests,
                        verificationStatus: user === null || user === void 0 ? void 0 : user.verificationStatus,
                        stripe_account_id: user === null || user === void 0 ? void 0 : user.stripe_account_id,
                        stripe_seller: user === null || user === void 0 ? void 0 : user.stripe_seller,
                        stripeSession: user === null || user === void 0 ? void 0 : user.stripeSession,
                        createdAt: user === null || user === void 0 ? void 0 : user.createdAt,
                        updatedAt: user === null || user === void 0 ? void 0 : user.updatedAt,
                    },
                });
            }
            else {
                res.status(400).json({ success: false, data: "user not verified" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ success: false, data: error });
        }
    }
    async createUserInterests(req, res, next) {
        const { title } = req.body;
        try {
            const userInterests = await UserInterests_1.default.create({
                title,
            });
            res.status(201).json({ success: true, userInterests });
        }
        catch (error) {
            next(error);
        }
    }
    async getUserInterests(res) {
        try {
            let userInterests = await UserInterests_1.default.find({})
                .select("-image.data")
                .exec();
            res.json(userInterests);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = Authentication;
