import nodemailer from "nodemailer";

export default class EmailSender {
  sendEmail(options: any) {
    const emailService = process.env.EMAIL_SERVICE;
    const emailuserName= process.env.EMAIL_USER_NAME;
    const emailHost = process.env.EMAIL_HOST;
    const password = process.env.EMAIL_PASSWORD;
    const from = process.env.EMAIL_FROM;
    const transporter = nodemailer.createTransport({
      service: <string>emailService,
      host: <string>emailHost ,
      port: 587,
      auth: {
        user: <string>emailuserName,
        pass: <string>password,
      },
    });

    const mailOptions = {
      from: <string>from,
      to: options.to,
      subject: options.subject,
      html: options.text,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }
}
