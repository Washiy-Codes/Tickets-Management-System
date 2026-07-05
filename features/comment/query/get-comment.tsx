"use server"

import prisma from "@/lib/prisma";

type getCommentProps = {
    ticketId: string;
    
}

const getComment = async ({ ticketId}: getCommentProps) => {
   return await prisma.comment.findMany({
        where: {
            ticketId
        },
        include: {
            user: {
                select: {
                    username: true
                }
            }
        },
        orderBy: {
            createdAt: "asc"
        }
    });
}


export { getComment }