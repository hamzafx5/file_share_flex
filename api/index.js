import { Router } from "express";
const router = Router();

import register from "./routes/register/register.js";
import login from "./routes/login/login.js";
import verifyEmail from "./routes/verifyEmail/verifyEmail.js";
import resendOtp from "./routes/otp.js";
import upload from "./routes/upload.js";
import files from "./routes/files.js";

router.get("/test", (_, res) => {
    res.send("API is running... ✔👍👍😂");
});

router.use(register);
router.use(login);
router.use(verifyEmail);
router.use(resendOtp);
router.use("/upload", upload);
router.use("/files", files);

export default router;
