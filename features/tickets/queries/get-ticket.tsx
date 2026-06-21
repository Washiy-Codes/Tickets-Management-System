import prisma from "@/lib/prisma";

type ticketProps = {
  ticketId: string;
}

const getTicket = async({ticketId}: ticketProps) => {
  return await prisma.ticket.findUnique({
    where: {
      id: ticketId
    }
  });
}

export default getTicket