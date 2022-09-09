import express from "express";
import fs from "fs";
import path from "path";
import util from "util";
import getFileName from "../../helpers/getFileName.js";
import randomHexString from "../../helpers/randomHexString.js";
import multer from "multer";
import { uploadFile } from "../../s3.js";

const router = express.Router();
const unlinkFile = util.promisify(fs.unlink);
const storage = multer.diskStorage({
    destination: "uploads/temp",
    filename: function (req, file, cb) {
        console.log(file);
        let fileName = getFileName(file.originalname).replace(" ", "_");
        let fileKey = randomHexString(24);
        let fileExtension = path.extname(file.originalname);
        let fullFileName = `${fileKey}_${fileName}${fileExtension}`;
        cb(null, fullFileName);
    },
});
const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
    const result = await uploadFile(req.file);
    await unlinkFile(req.file.path);
    res.json({
        filePath: `/files/${result.Key}`,
    });
});

export default router;
