import express from "express";
import {
  addFavoriteFile,
  createUser,
  getUsers,
  loginUser,
  removeFavoriteFile,
  userProfile,
} from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware"; // Adjust path if necessary
import { validate } from "../middleware/validation.middleware"; // Adjust path if necessary
import {
  createUserBodyValidator,
  loginSchemaValidator,
} from "../validators/userSchema.dto"; // Adjust path if necessary

const router = express.Router();

// Routes
router.get("/", authMiddleware, getUsers);
router.post("/login", validate(loginSchemaValidator), loginUser);
router.post("/", validate(createUserBodyValidator), createUser);
router.get("/profile", authMiddleware, userProfile);
router.post("/favorites", authMiddleware, addFavoriteFile); // Add favorite file
router.delete("/favorites", authMiddleware, removeFavoriteFile); // Remove favorite file

export { router as userRouter };
