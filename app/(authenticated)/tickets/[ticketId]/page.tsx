import Breadcrumbs from '@/components/breadcramps';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { TicketItem } from '@/features/tickets/components/ticket-item';
import getTicket from '@/features/tickets/queries/get-ticket';
import { homePath } from '@/paths';
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
    <div className="flex flex-col gap-y-4 flex-1 ">
    <Breadcrumbs breadcrumbs={[
        { title: 'Tickets', href: homePath()},
        { title: ticket.title },
    ]} />
    <Separator className="my-4" />
    <div className="flex  flex-col gap-8">
        <div className="flex justify-center animate-fade-in-from-top mt-4">
            <TicketItem ticket={ticket} isDetail={true} />
        </div>
    </div>
    </div>
  )
}

export default TicketPage
