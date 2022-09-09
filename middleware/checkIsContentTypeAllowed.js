export default function checkIsContentTypeAllowed(req, res, next) {
    let contentType = req.headers["content-type"];
    let isItJson = contentType === "application/json";
    let isItFormData = contentType.startsWith("multipart/form-data;");
    if (isItJson || isItFormData) {
        next();
    } else {
        res.status(400).send("Invalid Request Type");
    }
}
