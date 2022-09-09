import { Router } from "express";
const router = Router();
import Users, { validateUser } from "../../models/Users.model.js";

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
    res.json({ ok: true, user });
});

export default router;
