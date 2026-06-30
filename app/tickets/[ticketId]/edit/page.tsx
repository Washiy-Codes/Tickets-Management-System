import { CardCompact } from "@/components/card-compact";
import { UpsertTicketForm } from "@/features/tickets/components/upsert-ticket-form";
import getTicket from "@/features/tickets/queries/get-ticket";
import { notFound } from "next/navigation";
import {isOwner} from "@/features/auth/utils/is-owner";
import { auth } from "@/auth";

type EditPageProps = {
    params: Promise<{
        ticketId: string;
    }>;
}

const EditPage = async ({params} : EditPageProps) => {
    const {ticketId} = await params;
    const ticket = await getTicket({ ticketId });
    
    const isTicketFound = !!ticket;
    const session = await auth();
    const user = session?.user;
    
    const isTicketOwner = await isOwner(user, ticket);

    if(!isTicketFound || !isTicketOwner){
         notFound();
    }
    return (
        <div className="flex flex-1 flex-col gap-8 items-center justify-center min-h-screen">
         <CardCompact 
            title="Edit Ticket"
            description="Edit your ticket here."
            className="max-w-125 w-full animate-fade-in-from-top"
            content={<UpsertTicketForm ticket={ticket} />}
            />
        </div>
    )
}

export default EditPage;
