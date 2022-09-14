import { Router } from "express";
const router = Router();

import register from "./routes/register/register.js";
import upload from "./routes/upload.js";
import files from "./routes/files.js";

router.get("/test", (_, res) => {
    res.send("API is running... ✔👍👍😂");
});

router.use(register);
router.use("/upload", upload);
router.use("/files", files);

export default router;
