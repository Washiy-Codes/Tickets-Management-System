import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const getActiveOrganization = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  const activeOrganization = await prisma.organization.findFirst({
    where: {
      memberships: {
        some: {
          userId: user.id,
          isActive: true,
        },
      },
    },
  });

  return activeOrganization;
};