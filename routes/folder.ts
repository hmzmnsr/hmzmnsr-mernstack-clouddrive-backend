import express from "express";
import {
  createFolder,
  deleteFolder,
  getFolderById,
  getFolders,
} from "../controllers/folderController";
import { validate } from "../middleware/validationMiddleware";
import { folderSchemaValidator } from "../validators/folder.dto";

const router = express.Router();

// Routes for Folder
router.get("/", getFolders);
router.get("/:id", getFolderById);
router.post("/", validate(folderSchemaValidator), createFolder);
router.delete("/:id", deleteFolder);

export { router as folderRouter };
