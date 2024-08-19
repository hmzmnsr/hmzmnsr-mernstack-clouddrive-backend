import Joi from "joi";

const attachmentSchemaValidator = Joi.object({
  attachmentPath: Joi.string().required(),
  attachmentName: Joi.string().required(),
  attachmentType: Joi.string().required(),
  attachmentOwnership: Joi.string().required(),
  dateTime: Joi.date().default(() => new Date()),
  userRef: Joi.string().required(), // Consider using a more specific validation for ObjectId
  size: Joi.number().required(),
});

export { attachmentSchemaValidator };