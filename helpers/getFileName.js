export default function getFileName(originalname) {
    let fileName = originalname.substring(0, originalname.lastIndexOf("."));
    return fileName;
}
