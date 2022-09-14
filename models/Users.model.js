import mongoose from "mongoose";
import Joi from "Joi";
const joiUserSchema = Joi.object({
    fullName: Joi.string().min(3).max(30).required().label("Full Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).max(20).required().label("Password"),
});

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
});

const User = mongoose.model("user", userSchema);

export function validateUser(user) {
    return joiUserSchema.validate(user);
}

export default User;
