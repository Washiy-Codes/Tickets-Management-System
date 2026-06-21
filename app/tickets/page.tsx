
import { CardCompact } from '@/components/card-compact';
import {Heading} from '@/components/heading';
import Spinner from '@/components/spinner';
import { TicketList } from '@/features/tickets/components/ticket-list';
import { UpsertTicketForm } from '@/features/tickets/components/upsert-ticket-form';
import { Suspense } from 'react';


const TicketsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="Tickets Page" description="Your tickets page to view all tickets" />
      <CardCompact 
        title="Create Ticket"
        description="Create a new ticket"
        content={<UpsertTicketForm />}
        className="w-full max-w-105 self-center"
      />
      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  )
}

export default TicketsPage