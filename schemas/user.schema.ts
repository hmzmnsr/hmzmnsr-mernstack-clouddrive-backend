import { Schema, Document } from "mongoose";

export interface UserDataProps extends Document {
  _id: object;
  email: string;
  password: string;
  name: string;
  phone: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  comparePassword(password: string): Promise<boolean>;
  generateToken(): string;
  updatePassword(newPassword: string): Promise<void>;
}

export const userSchema = new Schema<UserDataProps>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

});
