import { TicketItem } from "./ticket-item"
import { getTickets } from '@/features/tickets/queries/get-tickets';
import { ParsedSearchParams} from "../search-params";
import { Placeholder } from "@/components/placeholder";
import { TicketSearchInput } from "./ticket-search-input";
import { TicketSortSelect } from "./ticket-sort-select";
import { TicketPagination } from "./ticket-pagination";


type TicketListProps = {
    userId?: string;
    searchParams: ParsedSearchParams;
}

const TicketList = async ({userId, searchParams}:TicketListProps) =>{
      const { list: tickets, metadata: ticketMetadata } = await getTickets(userId, searchParams);



    return(
        <div className="flex flex-col gap-4 flex-1 items-center justify-center animate-fade-in-from-top">

       <div className="w-full flex max-w-105 gap-x-2">
        <div className="flex-1">
         <TicketSearchInput placeholder="search ticket..." />
       </div>

      <div className="flex-1">
      <TicketSortSelect
        options={[
          {
            sortKey: "createdAt",
            sortValue: "desc",
            label: "Newest",
          },
          {
            sortKey: "createdAt",
            sortValue: "asc",
            label: "Oldest",
          },
          {
            sortKey: "bounty",
            sortValue: "desc",
            label: "Bounty",
          },
          
        ]}
      />
        </div>
         </div>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <TicketItem key={ticket.id} ticket={ticket} />
            ))
          ) : (
            <Placeholder label="No tickets found" />
          )}
          <div className="w-full max-w-105">
            <TicketPagination paginatedTicketMetadata={ticketMetadata} />
          </div>
        </div>
    
    )
}
export { TicketList }