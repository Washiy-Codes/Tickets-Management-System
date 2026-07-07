
"use client";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { useActionState} from "react";
import { FieldErrors } from "@/components/form/field-errors";
import { changePasswordAction } from "../actions/change-password";

const PasswordChangeForm =  () => {
  const [actionState, action] = useActionState(changePasswordAction, EMPTY_ACTION_STATE);

  return (
    <div className="flex flex-col gap-4">
      <Form action={action} actionState={actionState} >
        <Input name="password" type="password" placeholder="Current Password" defaultValue={actionState.payload?.get("password") as string}  />
        <FieldErrors name="password" actionState={actionState} />
        
        <SubmitButton label="Change Password" />
      </Form>
    </div>
  );
};

export { PasswordChangeForm };
