import Joi from "joi";

const UserSchemaValidator = Joi.object({
  _id: Joi.object(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  isActive: Joi.boolean(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

const createUserBodyValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
});

const loginSchemaValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { UserSchemaValidator, createUserBodyValidator, loginSchemaValidator }; 

const updatePasswordValidator = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
}).options({ allowUnknown: true }); 

export { updatePasswordValidator };