import { NextFunction, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { UserModel } from "../models/user.model";

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    const data: any = jsonwebtoken.verify(
      token as string,
      process.env.SECRET_TOKEN as string
    );

    if (!data?._id) {
      throw new Error("Invalid token");
    }

    const user = await UserModel.findOne({ _id: data._id, isActive: true });

    if (!user) {
      throw new Error("User not found");
    }

    req["user"] = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
