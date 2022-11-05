import express from "express";
import Joi from "joi";
import genOtp from "../../helpers/genOtp.js";
import sendMail from "../../mailer.js";
import Otp from "../../modules/Otp.module.js";
const router = express.Router();

router.post("/resend_otp", validateEmail, async (req, res) => {
    const { email } = req.body;
    const code = genOtp();
    await Otp.deleteMany({ userEmail: email });
    await new Otp({
        userEmail: email,
        code,
    }).save();
    await sendMail({
        to: email,
        subject: "Verify Email",
        html: `<p style="text-align: center; font-size: 18px;">The verification code is <span style="color: #4F46E5; font-weight: bold">${code}</span><p/>
               <p style="text-align: center; font-size: 15px; margin-top: 20px;">Not this code will expire in 10 minutes<p/>
        `,
    });
    res.json({
        ok: true,
        message: "The code is send to your email",
    });
});

const emailSchema = Joi.object({
    email: Joi.string().email().required(),
});

function validateEmail(req, res, next) {
    const { email } = req.body;
    const { error } = emailSchema.validate({ email });
    if (error) {
        const { message, context } = error.details[0];
        return res.status(400).json({
            ok: false,
            message: message,
            filed: context.key,
        });
    }
    next();
}

export default router;
