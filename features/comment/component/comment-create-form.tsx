"use client"

import { SubmitButton } from "@/components/form/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../action/create-comment";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { FieldErrors } from "@/components/form/field-errors";

type CommentCreateFormProp = {
    ticketId: string;
}

const CommentCreateForm = ({ticketId}:CommentCreateFormProp) => {

    const [actionState, formAction] = useActionState(createComment.bind(null, ticketId), EMPTY_ACTION_STATE);
    return (
        <Form action={formAction} actionState={actionState} >
            <Textarea placeholder="Add a comment..." name="comment" />
            <FieldErrors name="comment" actionState={actionState} />
            <SubmitButton label="Add Comment" />
        </Form>
    )
}

export {CommentCreateForm}  