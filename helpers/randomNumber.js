export default function randomNumber(limit = Date.now()) {
    return Math.floor(Math.random() * limit);
}
