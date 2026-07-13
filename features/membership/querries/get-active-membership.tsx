import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getActiveMembership = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  const activeMembership = await prisma.membership.findFirst({
    where: {
      userId: user.id,
      isActive: true,
    },
  });

  return activeMembership;
};