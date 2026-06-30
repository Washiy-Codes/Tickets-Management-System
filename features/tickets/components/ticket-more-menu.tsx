"use client"
import { Ticket, TicketStatus } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LucideTrash2 } from "lucide-react";
import {TICKETS_STATUS_LABELS} from "../constants";
import { toast } from "sonner";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { deleteTicket } from "../actions/delete-ticket";
import { useConfirmDialog } from "@/components/confirm-dialog";

type TicketMoreMenuProps = {
    ticket: Ticket;
    trigger: React.ReactNode;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {

    const [deleteButton, deleteDialog] = useConfirmDialog({
        action: deleteTicket.bind(null, ticket.id),
        trigger: <DropdownMenuItem>
            <LucideTrash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
        </DropdownMenuItem>
    });

    const handleUpdateTicketStatus = async(value: string) => {
        const promise =  updateTicketStatus(ticket.id, value as TicketStatus);
        toast.promise(promise, {
            loading: "Updating ticket status....",
        });
        const result = await promise;
        if(result.status === "ERROR") {
            toast.error(result.message);
        }else if(result.status === "SUCCESS") {
            toast.success(result.message);
        }
    }

    const ticketStatusGroupItems =  <DropdownMenuRadioGroup value={ticket.status} onValueChange={handleUpdateTicketStatus}>
        {(Object.keys(TICKETS_STATUS_LABELS)as Array<TicketStatus>).map((status) => (
            <DropdownMenuRadioItem key={status} value={status}>
                {TICKETS_STATUS_LABELS[status]}
            </DropdownMenuRadioItem>
        ))}
     </DropdownMenuRadioGroup>

    return (
    <>
    {deleteDialog}
    <DropdownMenu>
     <DropdownMenuTrigger asChild>
      {trigger}
    </DropdownMenuTrigger>
    <DropdownMenuContent side={"right"} className="w-56">
    {ticketStatusGroupItems}
    {deleteButton}
  </DropdownMenuContent>
</DropdownMenu>
</>
    )
}

export {TicketMoreMenu}