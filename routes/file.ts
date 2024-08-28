import express from "express";
import {
  createFile,
  deleteFile,
  getFileById,
  getFiles,
  getFilesByFavorite,
  markAsFavorite,
} from "../controllers/fileController";
import { validate } from "../middleware/validationMiddleware";
import { fileSchemaValidator } from "../validators/file.dto";

const router = express.Router();

// Routes for File
router.get("/", getFiles);
router.get("/favorite", getFilesByFavorite);
router.get("/:id", getFileById);
router.post("/", validate(fileSchemaValidator), createFile);
router.delete("/:id", deleteFile);
router.patch("/favorite/:id", validate(fileSchemaValidator), markAsFavorite);

export { router as fileRouter };
