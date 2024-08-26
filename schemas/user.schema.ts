import { Schema, Document } from "mongoose";

interface UserDataProps extends Document {
  _id: object;
  email: string;
  password: string;
  name: string;
  phone: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  favoriteFiles: Array<object>; // Array of file references
  comparePassword(password: string): Promise<boolean>;
  generateToken(): string;
}

const userSchema = new Schema<UserDataProps>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  favoriteFiles: [{ type: Schema.Types.ObjectId, ref: 'File' }], // Favorite files field
});

export { UserDataProps, userSchema };
