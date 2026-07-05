"use server";
import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/actions/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import prisma from "@/lib/prisma";
import { ticketPath } from "@/paths";
import { revalidatePath } from "next/cache";

const deleteComment = async (id: string) => {
    const user = await getAuthOrRedirect();
   const comment = await prisma.comment.findUnique({
        where: {
            id: id
        }
    });
    
    if(!comment || await !isOwner(user, comment)){
        return toActionState("ERROR", "You are not authorized to delete this comment");
    }
   try{
    await prisma.comment.delete({
        where: {
            id: id
        }
    });
    }catch(error){
        return fromErrorToActionState(error);
    }
    revalidatePath(ticketPath(comment.ticketId));
    return toActionState("SUCCESS", "Comment deleted successfully");
}

export { deleteComment };