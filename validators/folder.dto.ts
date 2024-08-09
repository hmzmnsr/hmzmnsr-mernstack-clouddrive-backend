import Joi from "joi";

const folderSchemaValidator = Joi.object({
  userRef: Joi.string().required(), // ObjectId validation
  path: Joi.string().required(),
});

export { folderSchemaValidator };
