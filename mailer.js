import { config } from "dotenv";
config();
import nodemailer from "nodemailer";
const mail = process.env.MAIL_USER;
const pass = process.env.MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: mail,
        pass,
    },
});

export default async function sendMail(argOptions) {
    const options = {
        from: mail,
        ...argOptions,
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(options, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
}
