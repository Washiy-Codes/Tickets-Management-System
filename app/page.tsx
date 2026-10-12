import { Heading } from "@/components/heading";
import Spinner from "@/components/spinner";
import { TicketList } from "@/features/tickets/components/ticket-list";
import { Suspense } from "react";
import { searchParamsCache } from "@/features/tickets/search-params";
type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const HomePage = async ({ searchParams }: HomePageProps) => {
    const resolvedSearchParams = await searchParams;
    const params = searchParamsCache.parse(resolvedSearchParams);
  
  return (
    <>
      <div className="flex flex-col gap-8">
        <Heading title="All Tickets" description="All Tickets by everyone at one place" />
        <Suspense fallback={<Spinner />}>
          <TicketList searchParams={params} />
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;



















// import { Heading } from "@/components/heading";
// import Spinner from "@/components/spinner";
// import { TicketList } from "@/features/tickets/components/ticket-list";
// import { Suspense } from "react";
// import { SearchParams } from "nuqs/server";  
// import { searchParamsCache } from "@/features/tickets/search-params";


// const HomePage = async (searchParams: SearchParams) => {
//   console.log(searchParams)
//   const params = await searchParamsCache.parse(searchParams);
// return (
//   <>
    
//       <div className="flex flex-col gap-8">
//         <Heading title="All Tickets" description="All Tickets by everyone at one place" />
//         <Suspense fallback={<Spinner />}>
//             <TicketList searchParams={params} />
//           </Suspense>
//       </div>
    
//   </>
// )
// }

// export default HomePage;








