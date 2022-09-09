import { Router } from "express";
const router = Router();

router.get("/test", (_, res) => {
    res.send("API is running... ✔👍👍😂");
});

export default router;
