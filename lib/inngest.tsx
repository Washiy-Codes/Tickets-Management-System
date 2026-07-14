
import { Inngest, eventType, staticSchema } from "inngest"
import { passwordResetEvent } from "@/features/password/event/event-password-reset"

export const inngest = new Inngest({ id: "create-tickets-app" })


export const passwordResetPayload = eventType("app/password.reset-password", {
    schema: staticSchema<passwordResetEvent>()
})
