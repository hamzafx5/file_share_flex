import { Router } from "express";
import hashPassword from "../../../helpers/hashPassword.js";
const router = Router();
import User, { validateUser } from "../../../models/Users.model.js";

router.get("/register", async (req, res) => {
    let user = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
    };
    const { error } = validateUser(user);
    if (error) {
        return res.status(400).json({
            ok: false,
            message: error.details[0].message,
        });
    }

    // check if the email is used
    const userWithThisEmail = await User.find({ email: user.email });
    if (userWithThisEmail.length > 0) {
        return res.status(400).json({
            ok: false,
            message: "This Email is already been used",
        });
    }

    // hash the password
    user.password = await hashPassword(user.password);

    user = await new User(user).save();

    res.json({
        ok: true,
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
    });
});

export default router;
