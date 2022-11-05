export default function authenticate(req, res, next) {
    const token = req.cookies.accessToken;
    console.log({ token });
}
