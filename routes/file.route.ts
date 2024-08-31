import express from "express";
import {
  createFile,
  deleteFile,
  getFileById,
  getFiles,
  getFilesByFavorite,
  getRecentFiles,
  markAsFavorite,
} from "../controllers/file.controller";
import { validate } from "../middleware/validation.middleware";
import {
  favoriteSchemaValidator,
  fileSchemaValidator,
} from "../validators/file.dto";

const router = express.Router();

// Routes for File
router.get("/recent", getRecentFiles);
router.get("/", getFiles);
router.get("/favorite", getFilesByFavorite);
router.get("/:id", getFileById);
router.post("/", validate(fileSchemaValidator), createFile);
router.delete("/:id", deleteFile);
router.patch(
  "/favorite/:id",
  validate(favoriteSchemaValidator),
  markAsFavorite
);

export { router as fileRouter };
