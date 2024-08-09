import express from "express";
import {
  createAttachment,
  getAttachments,
  getAttachmentById,
  deleteAttachment,
} from "../controllers/attachmentController";
import authMiddleware from "../middleware/authMiddleware";
import { validate } from "../middleware/validationMiddleware";
import { attachmentSchemaValidator } from "../validators/attachment.dto";

const router = express.Router();

// Routes for Attachment
router.get("/", authMiddleware, getAttachments);
router.get("/:id", authMiddleware, getAttachmentById);
router.post("/", authMiddleware, validate(attachmentSchemaValidator), createAttachment);
router.delete("/:id", authMiddleware, deleteAttachment);

export { router as attachmentRouter };
