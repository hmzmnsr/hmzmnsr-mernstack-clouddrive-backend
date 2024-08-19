import Joi from "joi";

const fileSchemaValidator = Joi.object({
  attachmentRef: Joi.string().required(), // ObjectId validation could be more specific if needed
  userRef: Joi.string().required(), // ObjectId validation
  folderPath: Joi.string().required(),
});

export { fileSchemaValidator };