import mongoose from "mongoose";

export const TokensSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    tokenType: {
        type: String,
        enum: ["access", "refresh"],
        default: "access",
    },
});

const Token = mongoose.model("token", TokensSchema);

export default Token;
