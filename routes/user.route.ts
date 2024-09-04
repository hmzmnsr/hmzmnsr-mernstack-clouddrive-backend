import express from "express";
import {

  createUser,
  getUsers,
  loginUser,
  
  userProfile,
  updatePassword
} from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware"; // Adjust path if necessary
import { validate } from "../middleware/validation.middleware"; // Adjust path if necessary
import {
  createUserBodyValidator,
  loginSchemaValidator,
  updatePasswordValidator,
} from "../validators/userSchema.dto"; // Adjust path if necessary

const router = express.Router();

// Routes
router.get("/", authMiddleware, getUsers);
router.post("/login", validate(loginSchemaValidator), loginUser);
router.post("/", validate(createUserBodyValidator), createUser);
router.get("/profile", authMiddleware, userProfile);
router.patch("/password", authMiddleware, validate(updatePasswordValidator), updatePassword);


export { router as userRouter };
