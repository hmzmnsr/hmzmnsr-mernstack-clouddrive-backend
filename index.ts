import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';

dotenv.config();

import { defineRoutes } from './routes';
import { connectToMongoDB } from './utils/db';
import s3Routes from './routes/s3Routes'; // Importing S3 routes

const app: Application = express();
const port = process.env.PORT ?? 8001;

app.use(express.json()); // For parsing JSON request bodies
app.use(cors());

// Define application routes
defineRoutes(app);

// Add the S3 routes
app.use('/s3', s3Routes);

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
  connectToMongoDB();
});
