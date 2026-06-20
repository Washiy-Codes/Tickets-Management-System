
import {Heading} from '@/components/heading';
import Spinner from '@/components/spinner';
import { TicketList } from '@/features/tickets/components/ticket-list';
import { Suspense } from 'react';


const TicketsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="Tickets Page" description="Your tickets page to view all tickets" />
      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  )
}

export default TicketsPage