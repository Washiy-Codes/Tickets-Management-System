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
import { LucideEdit, LucideSquareArrowOutUpRight, LucideTrash2} from "lucide-react";
import { Ticket } from "@/app/generated/prisma/client";
import { deleteTicket} from "../actions/delete-ticket";


interface TicketItemProps {
    ticket: Ticket;
    isDetail?: boolean;
}


const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
    const detailButton = (
        <Button asChild variant="outline" size="icon">
            <Link prefetch href={ticketPath(ticket.id)} className="text-sm">
                <LucideSquareArrowOutUpRight />
            </Link>
        </Button>
    );

    const deleteButton = 
    <form action={deleteTicket.bind(null, ticket.id)}>
     <Button variant="destructive" size="icon" className="h-7 w-7">
    <LucideTrash2 />
    </Button>      
    </form>

    const editButton = (
        <Button asChild variant="outline" size="icon">
            <Link prefetch href={ticketEditPath(ticket.id)} className="text-sm">
                <LucideEdit />
            </Link>
        </Button>
    );


    return (
        <div className={clsx("w-full gap-x-1 flex",{
           "max-w-105": !isDetail,
           "max-w-125": isDetail
        })}>
        <Card key={ticket.id} className="mb-4 max-w-105 w-full">
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
                 <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
                 <p className="text-lg font-bold">${(ticket.bounty / 100).toFixed(2)}</p>
                </CardFooter>
            </Card>
            <div className="flex flex-col gap-y-2">
            {isDetail ? (
                <>
                {editButton}
                {deleteButton}
                </>
            
        ) : (
                <>
                {detailButton}
                {editButton}
                </>
                )}
            </div>
        </div>
    )
}
export { TicketItem }