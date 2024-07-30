import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader === 'your-secret-token') {
    next(); // Authorization successful, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};

export default authMiddleware;
