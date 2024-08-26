import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";
import { UserDataProps, userSchema } from "../schemas/user.schema";
import { UserSchemaValidator } from "../validators/userSchema.dto";

// Add indexes for optimized querying
userSchema.index({ _id: 1, email: 1, isActive: 1 });

// Validate schema before saving
userSchema.pre("validate", async function (next) {
  await UserSchemaValidator.validateAsync(this.toObject());
  next();
});

// Hash password before saving if it has been modified
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate JWT token
userSchema.methods.generateToken = function () {
  if (!process.env.SECRET_TOKEN) {
    throw new Error("SECRET_TOKEN is not defined");
  }

  return jsonwebtoken.sign({ _id: this._id }, process.env.SECRET_TOKEN, {
    expiresIn: "30d",
  });
};

// Create and export the UserModel
const UserModel = mongoose.model<UserDataProps>("Users", userSchema);

export { UserDataProps, UserModel };
