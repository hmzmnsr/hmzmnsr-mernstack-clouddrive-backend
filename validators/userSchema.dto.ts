import Joi from "joi";

const UserSchemaValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  createdAt: Joi.date().optional(),
});

export { UserSchemaValidator };
