// src/index.ts

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { user } from './routes/user';

// Create an instance of express
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', user);

// Database connection
const mongoURI = 'your-mongodb-connection-string';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
