
"use client";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { useActionState} from "react";
import { FieldErrors } from "@/components/form/field-errors";
import { emailVerificationAction } from "@/features/password/actions/verify-email";


const EmailVerificationForm =  () => {
  const [actionState, action] = useActionState(emailVerificationAction, EMPTY_ACTION_STATE);

  return (
    <div className="flex flex-col gap-4">
      <Form action={action} actionState={actionState} >
        <Input name="code" type="text" placeholder="Verification Code" defaultValue={actionState.payload?.get("code") as string}  />
        <FieldErrors name="code" actionState={actionState} />
        
        <SubmitButton label="Verify Email" />
      </Form>
    </div>
  );
};

export { EmailVerificationForm };
