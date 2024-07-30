import Joi from "joi";

const UserSchemaValidator = Joi.object({
  _id: Joi.object().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  createdAt: Joi.date(),
});

export { UserSchemaValidator };