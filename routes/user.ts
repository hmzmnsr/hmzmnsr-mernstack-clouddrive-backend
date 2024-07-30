import express from 'express';
import { getUsers, createUser } from '../controllers/userController';
import { validate } from '../middleware/validationMiddleware'; // Adjust path if necessary
import { UserSchemaValidator } from '../validators/userSchema.dto'; // Adjust path if necessary
import authMiddleware from '../middleware/authMiddleware'; // Adjust path if necessary

const router = express.Router();

// Route to get all users (requires authentication)
router.get('/', authMiddleware, getUsers);

// Route to create a new user (requires validation and authentication)
router.post('/', validate(UserSchemaValidator), authMiddleware, createUser);

export { router as user };
