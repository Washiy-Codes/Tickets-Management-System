import prisma from "@/lib/prisma";


const getTickets = async () => {
  return await prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include:{
      user: {
        select: {
          username: true,
        }
      }
    }
  });
};

export {getTickets};