import { SearchInput } from "@/components/search-input";
import { TicketItem } from "./ticket-item"
import { getTickets } from '@/features/tickets/queries/get-tickets';
import { ParsedSearchParams} from "../search-params";
import { Placeholder } from "@/components/placeholder";
import { SortSelect } from "@/components/sort-select";


type TicketListProps = {
    userId?: string;
    searchParams: ParsedSearchParams;
}

const TicketList = async ({userId, searchParams}:TicketListProps) =>{
      const tickets = await getTickets(searchParams, userId);

    return(
        <div className="flex flex-col gap-4 flex-1 items-center justify-center animate-fade-in-from-top">

       <div className="w-full flex max-w-105 gap-x-2">
        <div className="flex-1">
         <SearchInput placeholder="search ticket..." />
       </div>

      <div className="flex-1">
       <SortSelect defaultValue="Newest"
      options={[
        { label: "Newest", value: "newest" },
        { label: "Bounty", value: "bounty" }
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
        </div>
    
    )
}
export { TicketList }