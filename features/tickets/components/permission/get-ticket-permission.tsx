import prisma  from "@/lib/prisma";

type GetTicketPermissions = {
  organizationId: string | undefined;
  userId: string | undefined;
};

export const getTicketPermissions = async ({
  organizationId,
  userId,
}: GetTicketPermissions) => {
  if (!organizationId || !userId) {
    return {
      canDeleteTicket: false,
    };
  }

  const membership = await prisma.membership.findUnique({
    where: {
      organizationId_userId: {
        userId,
        organizationId,
      },
    },
  });

  if (!membership) {
    return {
      canDeleteTicket: false,
    };
  }

  return {
    canDeleteTicket: membership.canDeleteTicket,
  };
};