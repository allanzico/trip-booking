"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailSender {
    sendEmail(options) {
        var _a, _b, _c, _d, _e;
        const emailService = (_a = process.env) === null || _a === void 0 ? void 0 : _a['EMAIL_SERVICE'];
        const emailuserName = (_b = process.env) === null || _b === void 0 ? void 0 : _b['EMAIL_USER_NAME'];
        const emailHost = (_c = process.env) === null || _c === void 0 ? void 0 : _c['EMAIL_HOST'];
        const password = (_d = process.env) === null || _d === void 0 ? void 0 : _d['EMAIL_PASSWORD'];
        const from = (_e = process.env) === null || _e === void 0 ? void 0 : _e['EMAIL_FROM'];
        const transporter = nodemailer_1.default.createTransport({
            service: emailService,
            host: emailHost,
            port: 587,
            auth: {
                user: emailuserName,
                pass: password,
            },
        });
        const mailOptions = {
            from: from,
            to: options.to,
            subject: options.subject,
            html: options.text,
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(info);
            }
        });
    }
}
exports.default = EmailSender;
