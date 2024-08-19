import express from "express";
import {
  createFolder,
  getFolders,
  getFolderById,
  deleteFolder,
} from "../controllers/folderController";
import authMiddleware from "../middleware/authMiddleware";
import { validate } from "../middleware/validationMiddleware"; 
import { folderSchemaValidator } from "../validators/folder.dto";

const router = express.Router();

// Routes for Folder
router.get("/", authMiddleware, getFolders);
router.get("/:id", authMiddleware, getFolderById);
router.post("/", authMiddleware, validate(folderSchemaValidator), createFolder);
router.delete("/:id", authMiddleware, deleteFolder);

export { router as folderRouter };