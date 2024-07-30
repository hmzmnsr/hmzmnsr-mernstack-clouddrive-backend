// src/schemas/user.schema.ts

import { Schema } from 'mongoose';

interface UserDataProps {
  _id: object;
  email: string;
  password: string;
  name: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<UserDataProps>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Fix typo from `trpe` to `type`
  password: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export { userSchema, UserDataProps };
