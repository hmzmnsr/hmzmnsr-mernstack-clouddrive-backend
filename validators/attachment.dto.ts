import Joi from "joi";

const attachmentSchemaValidator = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  size: Joi.number().required(),
});

export { attachmentSchemaValidator };
