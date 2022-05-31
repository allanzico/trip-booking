import User from "../models/User";
import Stripe from "stripe";
import queryString from "query-string";
import Experience from "../models/Experience";
import Order from "../models/Order";
const stripe = new Stripe(<string>process.env.STRIPE_SECRET, {
  apiVersion: "2020-08-27",
});

export class StripeSetup {
  //  testVariable: string = "TEST"

  async createStripeAccount(req: any, res: any) {
    const user = await User.findById(req.user._id).exec();
    const stripeRedirectUrl = process.env.STRIPE_REDIRECT_URL;
    const stripe = new Stripe(<string>process.env.STRIPE_SECRET, {
      apiVersion: "2020-08-27",
    });
    try {
      if (!user.stripe_account_id) {
        const account = await stripe.accounts.create({
          type: "express",
          country: "NL",
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
        });
        user.stripe_account_id = account.id;
        user.save();
      }

      let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: <string>stripeRedirectUrl,
        return_url: <string>stripeRedirectUrl,
        type: "account_onboarding",
      });

      //prefil user info
      accountLink = Object.assign(accountLink, {
        "stripe_user[email]": user.email || undefined,
      });
      let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
      res.send(link);
    } catch (error) {
      console.log(error);
    }
  }

  async getAccountStatus(req: any, res: any) {
    const user = await User.findById(req.user._id).exec();
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    // const updatedAccount = await this.updateDelayDays(account.id);
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        stripe_seller: account,
      },
      { new: true }
    )
      .select("-password")
      .exec();
    res.json(updatedUser);
  }

  // async updateDelayDays(accountId: any) {
  //   const stripe = new Stripe(<string>process.env.STRIPE_SECRET, {
  //     apiVersion: "2020-08-27",
  //   });
  //   const account = await stripe.accounts.update(accountId, {
  //     settings: {
  //       payouts: {
  //         schedule: {
  //           delay_days: 7,
  //         },
  //       },
  //     },
  //   });
  //   return account;
  // }

  async getAccountBalance(req: any, res: any) {

    const user = await User.findById(req.user._id).exec();
    try {
      const balance = await stripe.balance.retrieve({
        stripeAccount: user.stripe_account_id,
      });
      // console.log(this.testVariable)
      res.json(balance);
    } catch (error) {
      console.log(error);
    }
  }

  async payoutSetting(req: any, res: any) {
    try {
      const stripeSettingRedirectUrl = process.env.STRIPE_SETTING_REDIRECT_URL;
      const user = await User.findById(req.user._id).exec();
      const loginLink = await stripe.accounts.createLoginLink(
        user.stripe_seller.id,
        {
          redirect_url: <string>stripeSettingRedirectUrl,
        }
      );
      res.json(loginLink);
    } catch (error) {
      console.log(error);
    }
  }

  async stripeSessionId(req: any, res: any) {
    const stripeSuccessUrl = process.env.STRIPE_SUCCESS_URL;
    const stripeCancelUrl = process.env.STRIPE_CANCEL_URL;

    const { expId } = req.body;
    const item = await Experience.findById(expId).populate("postedBy").exec();
    const fee = (item.price * 20) / 100;
    try {
      // Set your secret key. Remember to switch to your live secret key in production.
      // See your keys here: https://dashboard.stripe.com/apikeys
      const session = await stripe.checkout.sessions.create({
        // payment_method_types: ['card'],
        line_items: [
          {
            name: item.title,
            amount: item.price * 100, //send in cents to stripe
            currency: "eur",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: <string>`${stripeSuccessUrl}/${item._id}`,
        cancel_url: <string>stripeCancelUrl,
        payment_intent_data: {
          application_fee_amount: fee * 100,
          transfer_data: {
            destination: item.postedBy.stripe_account_id,
          },
        },
      });

      await User.findByIdAndUpdate(req.user._id, {
        stripeSession: session,
      }).exec();
      res.send({
        sessionId: session.id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async stripeSuccess(req: any, res: any) {
    const { expId } = req.body;
    const user = await User.findById(req.user._id).exec();
    
    const stripe = new Stripe(<string>process.env.STRIPE_SECRET, {
      apiVersion: "2020-08-27",
    });
    try {
      
      if(!user.stripeSession) return
      const session = await stripe.checkout.sessions.retrieve(
        user.stripeSession.id
      );
      if (session.payment_status === "paid") {
        const orderExists = await Order.findOne({
          "session.id": session.id,
        }).exec();
        if (orderExists) {
          res.json({ success: true });
        } else {
        

          //Create new order
         await new Order({
            experience: expId,
            session,
            orderedBy: user._id,
          }).save();
          
          await User.findByIdAndUpdate(user._id, {
            $set: { stripeSession: {} },
          });

            //Edit tickets
        await Experience.findByIdAndUpdate(expId, {
          $inc: {booked: +1}, 
        }, { new: true })

          res.json({ success: true });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
