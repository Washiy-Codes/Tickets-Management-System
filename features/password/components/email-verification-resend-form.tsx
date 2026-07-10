
"use client";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { useActionState} from "react";
import { emailVerificationResendAction } from "@/features/password/actions/verify-email-resend";


const EmailVerificationResendForm =  () => {
  const [actionState, action] = useActionState(emailVerificationResendAction, EMPTY_ACTION_STATE);

  return (
    <div className="flex flex-col gap-4">
      <Form action={action} actionState={actionState} >
        <SubmitButton label="Resend Code" variant="outline" />
      </Form>
    </div>
  );
};

export { EmailVerificationResendForm };
