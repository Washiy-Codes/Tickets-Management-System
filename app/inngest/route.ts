import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { passwordResetEvent } from "@/features/password/event/event-password-reset";


export const {PUT, POST, GET} = serve({
    client: inngest,
    functions: [
        passwordResetEvent,
        passwordResetEvent,
        // invitationCreatedEvent

    ]

})