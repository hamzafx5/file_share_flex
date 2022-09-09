import { config } from "dotenv";
config();
import app from "./app.js";

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is Running on PORT::${PORT}...`);
});
