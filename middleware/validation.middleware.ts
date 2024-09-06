import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      console.log(error)
      return res.status(400).json({ message: error.message });
    }
    next();
  };
};

export { validate };
