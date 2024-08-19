import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export { comparePassword, hashPassword };