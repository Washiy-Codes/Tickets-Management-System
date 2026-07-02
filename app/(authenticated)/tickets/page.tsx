
import { CardCompact } from '@/components/card-compact';
import { Heading } from '@/components/heading';
import Spinner from '@/components/spinner';
import { getAuthOrRedirect } from '@/features/auth/actions/get-auth-or-redirect';
import { TicketList } from '@/features/tickets/components/ticket-list';
import { UpsertTicketForm } from '@/features/tickets/components/upsert-ticket-form';
import { Suspense } from 'react';
import { searchParamsCache } from '@/features/tickets/search-params';

type TicketPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const TicketsPage = async ({ searchParams }: TicketPageProps) => {
  const user = await getAuthOrRedirect();
  
  const resolvedSearchParams = await searchParams;
  
  const params = searchParamsCache.parse(resolvedSearchParams);
  
  return (
    <div className="flex flex-col gap-8">
      <Heading title="My Tickets" description="All your tickets in one place" />
      <CardCompact 
        title="Create Ticket"
        description="Create a new ticket"
        content={<UpsertTicketForm />}
        className="w-full max-w-105 self-center"
      />
      <Suspense fallback={<Spinner />}>
        <TicketList userId={user?.id} searchParams={params} />
      </Suspense>
    </div>
  )
}

export default TicketsPage;















// import { CardCompact } from '@/components/card-compact';
// import {Heading} from '@/components/heading';
// import Spinner from '@/components/spinner';
// import { getAuthOrRedirect } from '@/features/auth/actions/get-auth-or-redirect';
// import { TicketList } from '@/features/tickets/components/ticket-list';
// import { UpsertTicketForm } from '@/features/tickets/components/upsert-ticket-form';
// import { Suspense } from 'react';
// import { searchParamsCache } from '@/features/tickets/search-params';
// import { SearchParams } from 'next/dist/server/request/search-params';

// type TicketPageProps = {
//   searchParams: SearchParams;
// }

// const TicketsPage = async({searchParams}:TicketPageProps) => {
//   const user = await getAuthOrRedirect();
//   const params = await searchParamsCache.parse(searchParams);
//   return (
//     <div className="flex flex-col gap-8">
//       <Heading title="My Tickets" description="All yuor tickets at one place" />
//       <CardCompact 
//         title="Create Ticket"
//         description="Create a new ticket"
//         content={<UpsertTicketForm />}
//         className="w-full max-w-105 self-center"
//       />
//       <Suspense fallback={<Spinner />}>
//         <TicketList userId= {user?.id} searchParams={params} />
//       </Suspense>
//     </div>
    
//   )
// }

// export default TicketsPage










