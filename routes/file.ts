import express from "express";
import {
  createFile,
  getFiles,
  getFileById,
  deleteFile,
} from "../controllers/fileController";
import authMiddleware from "../middleware/authMiddleware";
import { validate } from "../middleware/validationMiddleware";
import { fileSchemaValidator } from "../validators/file.dto";

const router = express.Router();

// Routes for File
router.get("/", authMiddleware, getFiles);
router.get("/:id", authMiddleware, getFileById);
router.post("/", authMiddleware, validate(fileSchemaValidator), createFile);
router.delete("/:id", authMiddleware, deleteFile);

export { router as fileRouter };