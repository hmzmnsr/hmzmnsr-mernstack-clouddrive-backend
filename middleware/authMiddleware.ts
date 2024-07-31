import { NextFunction, Request, Response } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader === process.env.SECRET_TOKEN) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
