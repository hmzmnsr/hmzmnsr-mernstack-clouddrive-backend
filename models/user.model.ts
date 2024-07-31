import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";
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

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  if (!process.env.SECRET_TOKEN) {
    throw new Error("SECRET_TOKEN is not defined");
  }

  return jsonwebtoken.sign({ _id: this._id }, process.env.SECRET_TOKEN, {
    expiresIn: "30d",
  });
};

const UserModel = mongoose.model<UserDataProps>("users", userSchema);

export { UserDataProps, UserModel };
