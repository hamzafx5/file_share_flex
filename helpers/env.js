import { config } from "dotenv";
config();

export default function isEnv(environmentType, callback = null) {
    let currentEnv = process.env.NODE_ENV;
    if (currentEnv === environmentType) {
        typeof callback === "function" && callback();
        return true;
    }
    return false;
}
