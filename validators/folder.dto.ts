import Joi from "joi";

const folderSchemaValidator = Joi.object({
  path: Joi.string().required(),
  name: Joi.string().required(),  
});

export { folderSchemaValidator };