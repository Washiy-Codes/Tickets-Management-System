"use server";

import { setCookieByKey } from "@/components/actions/cookies";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { toCents } from "@/components/utils/currency";
import prisma from "@/lib/prisma";
import { signInPath,ticketPath, ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAuthOrRedirect } from "@/features/auth/actions/get-auth-or-redirect";


const upsertTicketSchema = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1).max(1024),
    deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is Required"),
    bounty: z.coerce.number().positive()
});

const upsertTicket = async (
    id: string | undefined, 
    _actionState: ActionState,
    formData: FormData) => {
        // const session = await auth();
        // const user = session?.user;
        // if(!user || !user.id){
        //     redirect(signInPath());
        // }
    const user = await getAuthOrRedirect();
    if (!user.id) {
        redirect(signInPath());
    }

    try{
           
    const data = upsertTicketSchema.parse({
        title: formData.get("title"),
        content: formData.get("content"),
        deadline: formData.get("deadline"),
        bounty: formData.get("bounty")
    }) 

    const dbData = {
        ...data,
        userId: user.id,
        bounty: toCents(data.bounty)
    }

    await prisma.ticket.upsert({
        where:{
            id: id || "",
        } ,
        update: dbData,
        create: dbData,
    });
}catch(error) {
    return fromErrorToActionState(error, formData);

}
    revalidatePath(ticketsPath());
    
    if(id){
      await setCookieByKey("toast", "Ticket updated");
      redirect(ticketPath(id));

    }
    return toActionState("SUCCESS", "Ticket created");
 };

 export {upsertTicket}
