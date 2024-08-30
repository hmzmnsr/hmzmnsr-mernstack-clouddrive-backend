import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import path from "path";

const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: path.join(__dirname, envFile) });

import { defineRoutes } from "./routes";
import { connectToMongoDB } from "./utils/db";

const app: Application = express();
const port = process.env.PORT ?? 8001;

app.use(express.json()); // For parsing JSON request bodies
app.use(cors());

// Define application routes
defineRoutes(app);

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
  connectToMongoDB();
});
