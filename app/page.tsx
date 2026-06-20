import Link from "next/link";
import { ticketsPath } from "@/paths";
import { Heading } from "@/components/heading";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="Homepage" description="Your homepage to start" />
      <div className="flex flex-col flex-1 items-center justify-center gap-4">
        <Link href={ticketsPath()} className="text-md underline">
          Go to Tickets Page
      </Link>
      </div>
      
    </div>
  );
};

export default HomePage;