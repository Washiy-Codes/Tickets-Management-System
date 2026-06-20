import { TicketItem } from "./ticket-item"
import { getTickets } from '@/features/tickets/queries/get-tickets';


const TicketList = async ()=>{
      const tickets = await getTickets();

    return(
        <div className="flex flex-col gap-4 flex-1 items-center justify-center animate-fade-in-from-top">
        {tickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} />
        ))}
        </div>
    
    )
}
export { TicketList }