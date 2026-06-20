import {InitialData} from '@/data';
import { Ticket } from '../types';

type ticketProps = {
  ticketId: string;
}

const getTicket = async({ticketId}: ticketProps): Promise<Ticket | null> => {
  const ticket = InitialData.find((ticket) => ticket.id === ticketId);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return new Promise((resolve) => {
    resolve(ticket || null);
  });
}

export default getTicket