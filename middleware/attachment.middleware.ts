import { Request, Response, NextFunction } from "express";

// Middleware to validate attachment data before saving
export const validateAttachment = (req: Request, res: Response, next: NextFunction) => {
  const { attachmentName, attachmentPath } = req.body;

  if (!attachmentName || !attachmentPath) {
    return res.status(400).send("Attachment name and path are required");
  }

  // Additional custom validation logic
  next();
};