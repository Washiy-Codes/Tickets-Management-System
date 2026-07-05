import {Prisma} from "@prisma/client";
import {clsx} from "clsx";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ticketEditPath, ticketPath } from "@/paths";
import Link from "next/link";
import { TICKETS_ICONS } from "../constants";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucideMoreVertical, LucideSquareArrowOutUpRight} from "lucide-react";
import { currencyFromCents } from "@/components/utils/currency";
import { TicketMoreMenu } from "./ticket-more-menu";
import { getAuthOrRedirect } from "@/features/auth/actions/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { Comments } from "@/features/comment/component/comment";
import { Suspense } from "react";

type  TicketItemProps ={
    ticket: Prisma.TicketGetPayload<{
        include: {
            user: {
                select: {
                    username: true;
                }
            };
        }
    }>;
    isDetail?: boolean
}


const TicketItem = async({ ticket, isDetail }: TicketItemProps) => {
    const user = await getAuthOrRedirect();

    const isTicketOwner = await isOwner(user, ticket);
    
    const detailButton = (
        <Button asChild variant="outline" size="icon">
            <Link prefetch href={ticketPath(ticket.id)} className="text-sm">
                <LucideSquareArrowOutUpRight />
            </Link>
        </Button>
    );

    const editButton = isTicketOwner ? (
        <Button asChild variant="outline" size="icon">
            <Link prefetch href={ticketEditPath(ticket.id)} className="text-sm">
                <LucideEdit />
            </Link>
        </Button>
    ) : null;

    const moreMebuButton = isTicketOwner ? (<TicketMoreMenu ticket={ticket} trigger={
        <Button variant="outline" size="icon">
            <LucideMoreVertical className="h-4 w-4" />
        </Button>
    } />) : null;


    return (
      <div className={clsx("w-full gap-y-2 flex flex-col",{
           "max-w-sm": !isDetail,
           "max-w-md": isDetail
        })}>
        <div className="flex  gap-x-2 w-full">
        <Card key={ticket.id} className="mb-4 w-full max-w-110">
            <CardHeader>
                <CardTitle className="flex items-center gap-x-2">
                <span>{TICKETS_ICONS[ticket.status]}</span>
                <span className="line-clamp-3 truncate">{ticket.title}</span>
                </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className={clsx(" truncate whitespace-break-spaces",{
                     "line-clamp-3": !isDetail,
                  })}>{ticket.content}</span>
                </CardContent>  
                <CardFooter className="flex justify-between">
                 <p className="text-sm text-muted-foreground">{ticket.deadline} by {ticket.user.username}</p>
                 <p className="text-md font-bold text-primary">
                    {currencyFromCents(ticket.bounty)}
                 </p>
                </CardFooter>
            </Card>
            <div className="flex flex-col gap-y-2">
            {isDetail ? (
                <>
                {editButton}
                {moreMebuButton}
                </>
            
        ) : (
                <>
                {detailButton}
                {editButton}
                </>
                )}
            </div>
            </div>
            <div className="w-full max-w-md">
            {isDetail && <Comments ticketId={ticket.id} />}
            </div>
        
        </div>
    )
}
export { TicketItem }