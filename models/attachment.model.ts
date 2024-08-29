import mongoose from "mongoose";
import attachmentSchema, { IAttachment } from "../schemas/attachment.schema";

// Remove the pre-save hook that sets attachmentOwnership
// since the attachmentOwnership field is no longer present

const AttachmentModel = mongoose.model<IAttachment>(
  "Attachment",
  attachmentSchema
);
export { AttachmentModel, IAttachment };
