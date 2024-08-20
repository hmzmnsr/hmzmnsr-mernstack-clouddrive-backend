import express from "express";
import {
  createFile,
  deleteFile,
  getFileById,
  getFiles,
} from "../controllers/fileController";
import { validate } from "../middleware/validationMiddleware";
import { fileSchemaValidator } from "../validators/file.dto";

const router = express.Router();

// Routes for File
router.get("/", getFiles);
router.get("/:id", getFileById);
router.post("/", validate(fileSchemaValidator), createFile);
router.delete("/:id", deleteFile);

export { router as fileRouter };
