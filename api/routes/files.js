import express from "express";
const router = express.Router();
import { getFileStream, deleteFile } from "../../s3.js";

router.get("/download/:key", async (req, res) => {
    let fileKey = req.params.key;
    let fileName = fileKey.substring(fileKey.indexOf("_") + 1);

    res.status(200).attachment(fileName);
    const readStream = getFileStream(fileKey);
    readStream.pipe(res);
});

router.delete("/:key", async (req, res) => {
    const fileKey = req.params.key;
    const result = await deleteFile(fileKey);
    console.log(result);
    res.json({ result });
});

export default router;
