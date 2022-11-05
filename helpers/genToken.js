import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

export default function genToken(payload) {
    return jwt.sign(payload, TOKEN_SECRET_KEY, {
        expiresIn: "1h",
    });
}
