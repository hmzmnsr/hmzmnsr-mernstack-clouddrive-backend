import express from "express";
import { createUser, getUsers, loginUser } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware"; // Adjust path if necessary
import { validate } from "../middleware/validationMiddleware"; // Adjust path if necessary
import {
  createUserBodyValidator,
  loginSchemaValidator,
} from "../validators/userSchema.dto"; // Adjust path if necessary

const router = express.Router();

router.get("/", authMiddleware, getUsers);
router.post("/login", validate(loginSchemaValidator), loginUser);
router.post("/", validate(createUserBodyValidator), createUser);

export { router as userRouter };
