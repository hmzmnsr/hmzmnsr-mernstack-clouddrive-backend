import mongoose from "mongoose";
import attachmentSchema, { IAttachment } from "../schemas/attachment.schema";

attachmentSchema.pre<IAttachment>("save", function (next) {

  if (!this.attachmentOwnership) {
    this.attachmentOwnership = "default-owner";
  }
  next();
});

const AttachmentModel = mongoose.model<IAttachment>("Attachment", attachmentSchema);
export { IAttachment, AttachmentModel };