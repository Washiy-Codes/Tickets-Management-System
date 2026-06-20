import {InitialData} from '@/data';
import { Ticket } from '../types';


const getTickets = async (): Promise<Ticket[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(InitialData);
    }, 2000);
  });
};

export {getTickets};