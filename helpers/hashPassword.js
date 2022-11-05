import { config } from "dotenv";
config();
import bcrypt from "bcrypt";
const passwordSecretIngredIent = process.env.PASSWORD_SECRET_INGREDIENT;

export default async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const cookedPassword = cookPassword(password);
    const hashedPassword = await bcrypt.hash(cookedPassword, salt);
    return hashedPassword;
}

export function cookPassword(password) {
    let reversedPassword = [...password].reverse();
    let cookedPassword = [...password].map((chr, index) => {
        let unit = [];
        unit.push(passwordSecretIngredIent.charAt(index));
        unit.push(index * password.length);
        unit.push(chr);
        unit.push(reversedPassword[index]);
        return unit.join("");
    });
    return cookedPassword.join("").trim();
}

export async function comparePassword(password, encryptedPassword) {
    return await bcrypt.compare(cookPassword(password), encryptedPassword);
}
