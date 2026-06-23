import { Heading } from '@/components/heading';
import { TicketItem } from '@/features/tickets/components/ticket-item';
import getTicket from '@/features/tickets/queries/get-ticket';
import { notFound } from 'next/navigation';
type TicketPageProps = {
  params: Promise<{
    ticketId: string;}>;
};
const TicketPage= async({params}: TicketPageProps) => {
      const {ticketId} = await params;  

    const ticket = await getTicket({ticketId});
    if(!ticket) {
        return (
             notFound()
        )
    }
  return (
    <div className="flex flex-col gap-8">
        <Heading title="Ticket Page" />
        <div className="flex justify-center animate-fade-in-from-top mt-4">
            <TicketItem ticket={ticket} isDetail={true} />
        </div>
    </div>
    
  )
}

export default TicketPage
