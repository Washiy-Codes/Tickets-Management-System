
"use client";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { useActionState} from "react";
import { FieldErrors } from "@/components/form/field-errors";
import { resetPasswordAction } from "../actions/reset-password";

type ResetPasswordFormProps = {
  tokenId: string;
};


const ResetPasswordForm =  ({ tokenId }: ResetPasswordFormProps) => {
  const [actionState, action] = useActionState(resetPasswordAction.bind(null, tokenId), EMPTY_ACTION_STATE);

  return (
    <div className="flex flex-col gap-4">
      <Form action={action} actionState={actionState} >
        <Input name="password" type="password" placeholder="Enter Password" defaultValue={actionState.payload?.get("password") as string}  />
        <FieldErrors name="password" actionState={actionState} />

        <Input name="confirmPassword" type="password" placeholder="Confirm Password" defaultValue={actionState.payload?.get("confirmPassword") as string}  />
        <FieldErrors name="confirmPassword" actionState={actionState} />
        
        <SubmitButton label="Reset Password" />
      </Form>
    </div>
  );
};

export { ResetPasswordForm };
