import { Request, Response, NextFunction } from 'express';
import { UserSchemaValidator } from '../validators/userSchema.dto';
import Joi from 'joi';

const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details.map(detail => detail.message) });
    }
    next();
  };
};

export { validate };
