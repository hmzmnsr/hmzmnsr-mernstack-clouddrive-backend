import Joi from "joi";

const fileSchemaValidator = Joi.object({
  attachmentRef: Joi.string().required(),
  folderRef: Joi.string().required(),
  name: Joi.string().required(),
});

const favoriteSchemaValidator = Joi.object({
  isFavorite: Joi.boolean().required(),
});

export { favoriteSchemaValidator, fileSchemaValidator };
