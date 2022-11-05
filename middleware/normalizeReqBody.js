export default function (req, res, next) {
    const isReqBodyEmpty = Object.keys(req.body).length === 0;
    const hasDataProperty = req.body.hasOwnProperty("data");
    if (!isReqBodyEmpty && hasDataProperty) {
        req.body = req.body.data;
    }
    next();
}
