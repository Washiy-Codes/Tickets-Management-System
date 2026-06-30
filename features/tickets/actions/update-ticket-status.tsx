"use server";

import { TicketStatus } from "@prisma/client";
import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import prisma from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

const updateTicketStatus = async (ticketId: string, status: TicketStatus) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try{
     await prisma.ticket.update({
        where: { 
            id: ticketId 
        },
        data: { 
            status
         }
    });
}catch(error){
    return fromErrorToActionState(error);
}
 revalidatePath(ticketsPath());
    
 return toActionState("SUCCESS", "Ticket status updated");
}

export { updateTicketStatus }