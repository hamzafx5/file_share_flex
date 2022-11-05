import { Router } from "express";
import Joi from "joi";
import genToken from "../../../helpers/genToken.js";
import { comparePassword } from "../../../helpers/hashPassword.js";
import User from "../../../modules/Users.module.js";
const router = Router();

const userLoginSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).max(20).required().label("Password"),
});

function validateLogin(user) {
    return userLoginSchema.validate(user);
}

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const { error } = validateLogin({ email, password });
    if (error) {
        const { message, context } = error.details[0];
        return res.status(400).json({
            ok: false,
            message: message,
            filed: context.key,
        });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            ok: false,
            message: "Email or password Doesn't Match",
            filed: "password",
        });
    }
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({
            ok: false,
            message: "Email or password Doesn't Match",
            filed: "password",
        });
    }
    const token = genToken({ _id: user._id });
    res.status(201)
        .cookie("accessToken", token, {
            httpOnly: true,
            sameSite: "strict",
        })
        .json({
            ok: true,
            message: "Logged in successfully",
        });
});

export default router;
