import {clsx} from "clsx";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ticketPath } from "@/paths";
import Link from "next/link";
import { TICKETS_ICONS } from "../constants";
import { Ticket } from "../types";
import { Button } from "@/components/ui/button";
import { LucideSquareArrowOutUpRight } from "lucide-react";

interface TicketItemProps {
    ticket: Ticket;
    isDetail?: boolean;
}


const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
    const detailButton = (
        <Button asChild variant="outline" size="icon">
            <Link href={ticketPath(ticket.id)} className="text-sm">
                <LucideSquareArrowOutUpRight />
            </Link>
        </Button>
    );

    return (
        <div className={clsx("w-full gap-x-1 flex",{
           "max-w-105": !isDetail,
           "max-w-[500px]": isDetail
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
            </Card>
            <div className="flex flex-col gap-y-2">
            {isDetail ? null : detailButton}
            </div>
        </div>
    )
}
export { TicketItem }