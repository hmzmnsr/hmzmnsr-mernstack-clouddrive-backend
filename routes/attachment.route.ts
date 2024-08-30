import express from "express";
import {
  createAttachment,
  deleteAttachment,
  getAttachmentById,
  getAttachments,
} from "../controllers/attachment.controller";
import authMiddleware from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import { attachmentSchemaValidator } from "../validators/attachment.dto";

const router = express.Router();
router.get("/", authMiddleware, getAttachments);
router.get("/:id", authMiddleware, getAttachmentById);
router.post(
  "/",
  authMiddleware,
  validate(attachmentSchemaValidator),
  createAttachment
);
router.delete("/:id", authMiddleware, deleteAttachment);

export { router as attachmentRouter };
