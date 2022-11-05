import { Router } from "express";
import genOtp from "../../../helpers/genOtp.js";
import hashPassword from "../../../helpers/hashPassword.js";
import sendMail from "../../../mailer.js";
import Otp from "../../../modules/Otp.module.js";
const router = Router();
import User, { validateUser } from "../../../modules/Users.module.js";

router.post("/register", async (req, res) => {
    let user = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
    };
    const { error } = validateUser(user);
    if (error) {
        const { message, context } = error.details[0];
        return res.status(400).json({
            ok: false,
            message: message,
            filed: context.key,
        });
    }

    // check if the email is used
    const userWithThisEmail = await User.find({ email: user.email });
    if (userWithThisEmail.length > 0) {
        return res.status(400).json({
            ok: false,
            filed: "email",
            message: "This Email is already been used",
        });
    }

    // hash the password
    user.password = await hashPassword(user.password);

    user = await new User(user).save();
    const otp = await Otp({
        userEmail: user.email,
        code: genOtp(),
    }).save();

    await sendMail({
        to: user.email,
        subject: "Verify Email",
        html: `<p style="text-align: center; font-size: 18px;">The verification code is <span style="color: #4F46E5; font-weight: bold">${otp.code}</span><p/>
               <p style="text-align: center; font-size: 15px; margin-top: 20px;">Not this code will expire in 10 minutes<p/>
        `,
    }).catch(console.error);
    if (user && user._id) {
        return res.status(201).json({
            ok: true,
            message: "The Account was created successfully",
        });
    }
});

export default router;
