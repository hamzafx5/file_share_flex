import { config } from "dotenv";
config();
import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;

export default async function connect() {
    try {
        mongoose.connect(uri);
        console.log("DB is connected...");
    } catch (err) {
        console.log(err);
    }
}
