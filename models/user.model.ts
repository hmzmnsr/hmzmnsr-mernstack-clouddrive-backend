import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserDataProps, userSchema } from "../schemas/user.schema";
import { UserSchemaValidator } from "../validators/userSchema.dto";

userSchema.index({ _id: 1, email: 1, isActive: 1 });

userSchema.pre("validate", async function (next) {
  await UserSchemaValidator.validateAsync(this.toObject());
  next();
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

const UserModel = mongoose.model<UserDataProps>("users", userSchema);

export { UserModel, UserDataProps };