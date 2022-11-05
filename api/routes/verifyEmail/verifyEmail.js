import express from "express";
import Otp from "../../../modules/Otp.module.js";
import User from "../../../modules/Users.module.js";
const router = express.Router();

router.post("/verify_email", async (req, res) => {
    const { code, email } = req.body;
    const otp = await Otp.findOne({ userEmail: email, code });
    if (!otp) {
        return res.status(400).json({
            ok: false,
            message: "The Verification Code in't valid",
        });
    }
    await Otp.deleteMany({ userEmail: email });
    await User.findOneAndUpdate(
        {
            email,
        },
        {
            $set: {
                isEmailVerified: true,
            },
        }
    );
    res.status(200).json({
        ok: true,
        message: "Your Email Is verified",
    });
});

export default router;
