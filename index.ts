import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";

dotenv.config();

import { defineRoutes } from "./routes";
import { connectToMongoDB } from "./utils/db";

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

defineRoutes(app);

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
  connectToMongoDB();
});
