"use client"
import { useActionState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Ticket } from "@prisma/client"
import { upsertTicket } from "../actions/upsert-ticket"
import { SubmitButton } from "@/components/form/submit-button"
import { FieldErrors } from "@/components/form/field-errors"
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state"
import { Form } from "@/components/form/form"
import { fromCents } from "@/components/utils/currency"
import { DatePicker } from "@/components/date-picker"
type UpsertTicketFormProps = {
    ticket?: Ticket;
}


const UpsertTicketForm = ({ ticket }: UpsertTicketFormProps) => {
    const [actionState, action] = useActionState(upsertTicket.bind(null, ticket?.id), EMPTY_ACTION_STATE);
    
    return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="title">Title</Label>
      <Input type="text" id="title" name="title" defaultValue={actionState.payload?.get("title") as string ?? ticket?.title} />
      <FieldErrors actionState={actionState} name="title" />
      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={(actionState.payload?.get("content") as string) ?? ticket?.content} ></Textarea>
      <FieldErrors actionState={actionState} name="content" />
      <div className="flex gap-x-2 nb-2">
        <div className="w-1/2">
         <label htmlFor="deadline">Deadline</label>
         <DatePicker key={actionState.timestamp} name="deadline" id="deadline" defaultValue={(actionState.payload?.get("deadline") as string) ?? ticket?.deadline} />
        <FieldErrors actionState={actionState} name="deadline" />
        </div>
        <div className="w-1/2">
          <label htmlFor="bounty">Bounty(USD)</label>
          <Input type="number" id="bounty" step=".01" name="bounty" defaultValue={(actionState.payload?.get("bounty") as string) ?? 
            (ticket?.bounty ? fromCents(ticket.bounty) : "")
            } />
            <FieldErrors actionState={actionState} name="bounty" />
        </div>
      </div>
      <SubmitButton label={ticket ? "Update" : "Create"} />
    </Form>
  )
}

export { UpsertTicketForm }


