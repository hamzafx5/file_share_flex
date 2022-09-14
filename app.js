import { config } from "dotenv";
config();
import connect from "./config/mongoDB.js";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import api from "./api/index.js";
import notFound from "./middleware/notFound.js";
import serverError from "./middleware/serverError.js";
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Connect to the mongoDB Database
await connect();

app.use("/api/v1", api);

app.all("*", notFound);
app.use(serverError);

export default app;
