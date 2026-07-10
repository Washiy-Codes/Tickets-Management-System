import { generateRandomCode } from "@/components/utils/crypto";
import prisma  from "@/lib/prisma";

const EMAIL_VERIFICATION_TOKEN_LIFETIME_MS = 1000 * 60 * 15; // 15 minutes

export const generateVerificationCode = async (
  userId: string,
  email: string
) => {
  await prisma.emailVerificationToken.deleteMany({
    where: {
      userId,
    },
  });

  const code = generateRandomCode();

  await prisma.emailVerificationToken.create({
    data: {
      code,
      userId,
      email,
      expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TOKEN_LIFETIME_MS),
    },
  });

  return code;
};