import express from "express";
import {
  createFolder,
  deleteFolder,
  getAllFolders,
  getFolderById,
  getFolders,
  getRecentFolders,
} from "../controllers/folder.controller";
import { validate } from "../middleware/validation.middleware";
import { folderSchemaValidator } from "../validators/folder.dto";

const router = express.Router();

// Routes for Folder
router.get("/all", getAllFolders);
router.get("/recent", getRecentFolders);
router.get("/", getFolders);
router.get("/:id", getFolderById);
router.post("/", validate(folderSchemaValidator), createFolder);
router.delete("/:id", deleteFolder);

export { router as folderRouter };
