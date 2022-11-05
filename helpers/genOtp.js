import randomNumber from "./randomNumber.js";

export default function genOtp() {
    let min = 100_000;
    let max = 899_999;
    let code = min + randomNumber(max);
    return code;
}
