import { CardCompact } from "@/components/card-compact";
import { UpsertTicketForm } from "@/features/tickets/components/upsert-ticket-form";
import getTicket from "@/features/tickets/queries/get-ticket";
import { notFound } from "next/navigation";

type EditPageProps = {
    params: Promise<{
        ticketId: string;
    }>;
}

const EditPage = async ({params} : EditPageProps) => {
    const {ticketId} = await params;
    const ticket = await getTicket({ ticketId });
    if(!ticket) {
        notFound();
    }
    return (
        <div className="flex flex-col gap-8 items-center justify-center">
         <CardCompact 
            title="Edit Ticket"
            description="Edit your ticket here."
            className="max-w-125 w-full"
            content={<UpsertTicketForm ticket={ticket} />}
            />
        </div>
    )
}

export default EditPage;
