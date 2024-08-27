import Joi from "joi";

const fileSchemaValidator = Joi.object({
  attachmentRef: Joi.string().required(),
  userRef: Joi.string().required(),
  folderRef: Joi.string().required(),  // Ensure folderRef is validated
  folderPath: Joi.string().required(),
});

export { fileSchemaValidator };
