"use server";
import prisma  from "@/lib/prisma";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/actions/get-auth-or-redirect";
import { z } from "zod";
import { ticketPath } from "@/paths";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

const commentSchema = z.object({
    comment: z.string().min(1, "Comment is required").max(1024, "Comment must be less than 1025 characters"),
}).transform((val) => ({
    content: val.comment,
}));

const createComment = async (ticketId: string, 
    _actionState: ActionState, 
    formData: FormData) => {


    const user = await getAuthOrRedirect();
    try{
        const data = commentSchema.parse(Object.fromEntries(formData))
        await prisma.comment.create({
          data:{
            userId: user.id,
            ticketId,
            ...data
        }
    })
    
    }catch(error){
        return fromErrorToActionState(error);
    }
    revalidatePath(ticketPath(ticketId));
return toActionState("SUCCESS", "Comment created successfully.")
}

export { createComment }
