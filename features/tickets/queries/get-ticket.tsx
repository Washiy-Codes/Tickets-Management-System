import prisma from "@/lib/prisma";

type ticketProps = {
  ticketId: string;
}

const getTicket = async({ticketId}: ticketProps) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return await prisma.ticket.findUnique({
    where: {
      id: ticketId
    },
    include: {
      user: {
        select: {
          username: true,
        }
      }
    } 
  });
}

export default getTicket