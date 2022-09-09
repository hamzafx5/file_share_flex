import randomNumber from "./randomNumber.js";

export default function randomHexString(length = 10) {
    let hex = "";
    let symbols = [
        "c",
        "d",
        "e",
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
    ];
    // shuffle the symbols
    symbols = symbols
        .map((value) => ({
            value,
            sort: randomNumber(100),
        }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    for (let i = 0; i < length; i++) {
        hex += symbols[randomNumber(symbols.length)];
    }
    return hex.trim();
}
