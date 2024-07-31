import express from "express";
import { createUser, getUsers } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware"; // Adjust path if necessary
import { validate } from "../middleware/validationMiddleware"; // Adjust path if necessary
import { UserSchemaValidator } from "../validators/userSchema.dto"; // Adjust path if necessary

const router = express.Router();

router.get("/", authMiddleware, getUsers);
router.post("/", validate(UserSchemaValidator), authMiddleware, createUser);

export { router as userRouter };
