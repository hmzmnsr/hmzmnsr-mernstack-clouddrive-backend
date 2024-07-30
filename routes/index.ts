import express from 'express';
import { user } from './user';

const router = express.Router();

// Define base routes
router.use('/users', user); 

export default router;
