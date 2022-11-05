import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        min: 100_000,
        max: 999_999,
        required: true,
    },
    expiresIn: {
        type: Date,
        default: Date.now,
        expires: 600,
    },
});

const Otp = mongoose.model("otp", OtpSchema);

export default Otp;
