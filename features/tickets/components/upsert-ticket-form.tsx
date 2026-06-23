"use client"
import { useActionState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Ticket } from "@/app/generated/prisma/client"
import { upsertTicket } from "../actions/upsert-ticket"
import { SubmitButton } from "@/components/form/submit-button"
import { FieldErrors } from "@/components/form/field-errors"
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state"
import { Form } from "@/components/form/form"
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
      <div className="flex gap-x-2">
        <div className="flex-1">
         <label htmlFor="deadline">Deadline</label>
         <Input type="datetime-local" id="deadline" name="deadline" defaultValue={(actionState.payload?.get("deadline") as string) ?? ticket?.deadline} />
        </div>
        <div className="flex-1">
          <label>Bounty(USD)</label>
          <Input type="number" id="bounty" name="bounty" defaultValue={actionState.payload?.get("bounty") as string ?? ticket?.bounty?.toString()} />
        </div>
      </div>
      <SubmitButton label={ticket ? "Update" : "Create"} ticket={ticket} />
    </Form>
  )
}

export { UpsertTicketForm }


