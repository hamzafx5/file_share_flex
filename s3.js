import { config } from "dotenv";
config();
import fs from "fs";
import S3 from "aws-sdk/clients/s3.js";

const bucketName = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_S3_BUCKET_REGION;
const accessKeyId = process.env.AWS_S3_BUCKET_ACCESS_ID;
const secretAccessKey = process.env.AWS_S3_BUCKET_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

export function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
    };
    return s3.upload(uploadParams).promise();
}

export function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
    };
    return s3.getObject(downloadParams).createReadStream();
}

export function deleteFile(fileKey) {
    const params = {
        Bucket: bucketName,
        Key: fileKey,
    };
    return s3.deleteObject(params).promise();
}
