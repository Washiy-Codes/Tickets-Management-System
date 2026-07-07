import bcrypt from "bcryptjs";

export const verifyPasswordHash = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
}