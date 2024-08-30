import bcrypt from "bcrypt";

const bcryptHash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const bcryptCompare = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export { bcryptCompare, bcryptHash };
