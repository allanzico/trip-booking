"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeSetup = void 0;
const User_1 = __importDefault(require("../models/User"));
const stripe_1 = __importDefault(require("stripe"));
const query_string_1 = __importDefault(require("query-string"));
const Experience_1 = __importDefault(require("../models/Experience"));
const Order_1 = __importDefault(require("../models/Order"));
const stripe = new stripe_1.default((_a = process.env) === null || _a === void 0 ? void 0 : _a['STRIPE_SECRET'], {
    apiVersion: "2020-08-27",
});
class StripeSetup {
    async createStripeAccount(req, res) {
        var _a, _b, _c;
        const user = await User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).exec();
        const stripeRedirectUrl = (_b = process.env) === null || _b === void 0 ? void 0 : _b['STRIPE_REDIRECT_URL'];
        const stripe = new stripe_1.default((_c = process.env) === null || _c === void 0 ? void 0 : _c['STRIPE_SECRET'], {
            apiVersion: "2020-08-27",
        });
        try {
            if (!user.stripe_account_id) {
                const account = await (stripe === null || stripe === void 0 ? void 0 : stripe.accounts.create({
                    type: "express",
                    country: "NL",
                    capabilities: {
                        card_payments: { requested: true },
                        transfers: { requested: true },
                    },
                }));
                user.stripe_account_id = account.id;
                user.save();
            }
            let accountLink = await stripe.accountLinks.create({
                account: user === null || user === void 0 ? void 0 : user.stripe_account_id,
                refresh_url: stripeRedirectUrl,
                return_url: stripeRedirectUrl,
                type: "account_onboarding",
            });
            //prefil user info
            accountLink = Object.assign(accountLink, {
                "stripe_user[email]": (user === null || user === void 0 ? void 0 : user.email) || undefined,
            });
            let link = `${accountLink === null || accountLink === void 0 ? void 0 : accountLink.url}?${query_string_1.default.stringify(accountLink)}`;
            res.send(link);
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAccountStatus(req, res) {
        const user = await User_1.default.findById(req.user._id).exec();
        const account = await (stripe === null || stripe === void 0 ? void 0 : stripe.accounts.retrieve(user === null || user === void 0 ? void 0 : user.stripe_account_id));
        // const updatedAccount = await this.updateDelayDays(account.id);
        const updatedUser = await User_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, {
            stripe_seller: account,
        }, { new: true })
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
    async getAccountBalance(req, res) {
        var _a;
        const user = await User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).exec();
        try {
            const balance = await stripe.balance.retrieve({
                stripeAccount: user === null || user === void 0 ? void 0 : user.stripe_account_id,
            });
            // console.log(this.testVariable)
            res.json(balance);
        }
        catch (error) {
            console.log(error);
        }
    }
    async payoutSetting(req, res) {
        var _a;
        try {
            const stripeSettingRedirectUrl = (_a = process.env) === null || _a === void 0 ? void 0 : _a['STRIPE_SETTING_REDIRECT_URL'];
            const user = await User_1.default.findById(req.user._id).exec();
            const loginLink = await stripe.accounts.createLoginLink(user.stripe_seller.id, {
                redirect_url: stripeSettingRedirectUrl,
            });
            res.json(loginLink);
        }
        catch (error) {
            console.log(error);
        }
    }
    async stripeSessionId(req, res) {
        var _a, _b;
        const stripeSuccessUrl = (_a = process.env) === null || _a === void 0 ? void 0 : _a['STRIPE_SUCCESS_URL'];
        const stripeCancelUrl = (_b = process.env) === null || _b === void 0 ? void 0 : _b['STRIPE_CANCEL_URL'];
        const { expId } = req.body;
        const item = await Experience_1.default.findById(expId).populate("postedBy").exec();
        const fee = (item.price * 20) / 100;
        try {
            // Set your secret key. Remember to switch to your live secret key in production.
            // See your keys here: https://dashboard.stripe.com/apikeys
            const session = await stripe.checkout.sessions.create({
                // payment_method_types: ['card'],
                line_items: [
                    {
                        name: item.title,
                        amount: item.price * 100,
                        currency: "eur",
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: `${stripeSuccessUrl}/${item._id}`,
                cancel_url: stripeCancelUrl,
                payment_intent_data: {
                    application_fee_amount: fee * 100,
                    transfer_data: {
                        destination: item.postedBy.stripe_account_id,
                    },
                },
            });
            await User_1.default.findByIdAndUpdate(req.user._id, {
                stripeSession: session,
            }).exec();
            res.send({
                sessionId: session.id,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async stripeSuccess(req, res) {
        var _a;
        const { expId } = req.body;
        const user = await User_1.default.findById(req.user._id).exec();
        const stripe = new stripe_1.default((_a = process.env) === null || _a === void 0 ? void 0 : _a['STRIPE_SECRET'], {
            apiVersion: "2020-08-27",
        });
        try {
            if (!user.stripeSession)
                return;
            const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id);
            if (session.payment_status === "paid") {
                const orderExists = await Order_1.default.findOne({
                    "session.id": session.id,
                }).exec();
                if (orderExists) {
                    res.json({ success: true });
                }
                else {
                    //Create new order
                    await new Order_1.default({
                        experience: expId,
                        session,
                        orderedBy: user._id,
                    }).save();
                    await User_1.default.findByIdAndUpdate(user._id, {
                        $set: { stripeSession: {} },
                    });
                    //Edit tickets
                    await Experience_1.default.findByIdAndUpdate(expId, {
                        $inc: { booked: +1 },
                    }, { new: true });
                    res.json({ success: true });
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.StripeSetup = StripeSetup;
