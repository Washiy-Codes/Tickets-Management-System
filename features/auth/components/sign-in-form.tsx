

"use client";

import { useEffect } from "react";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { signInAction } from "../actions/sign-in";
import { FieldErrors } from "@/components/form/field-errors";
import { LogInWithSocials } from "@/app/socials/socials-login";
import { homePath } from "@/paths";

const SignInForm = () => {
  const [actionState, action] = useActionState(signInAction, EMPTY_ACTION_STATE);

  useEffect(() => {
    // Intercept successful login state and force a hard window redirect
    if (actionState?.status === "SUCCESS") {
      window.location.href = homePath();
    }
  }, [actionState]);

  return (
    <div className="flex flex-col gap-4">
      <Form action={action} actionState={actionState}>
        <Input name="email" type="email" placeholder="Email" defaultValue={actionState.payload?.get("email") as string} />
        <FieldErrors name="email" actionState={actionState} />
        
        <Input name="password" type="password" placeholder="Password" defaultValue={actionState.payload?.get("password") as string} />
        <FieldErrors name="password" actionState={actionState} />
        
        <SubmitButton label="Sign In" />
      </Form>
      <LogInWithSocials />
    </div>
  );
};

export { SignInForm };












// "use client";
// import { Form } from "@/components/form/form";
// import { SubmitButton } from "@/components/form/submit-button";
// import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
// import { Input } from "@/components/ui/input";
// import { useActionState} from "react";
// import { signInAction } from "../actions/sign-in";
// import { FieldErrors } from "@/components/form/field-errors";
// import { LogInWithSocials } from "@/app/socials/socials-login";

// const SignInForm =  () => {
//   const [actionState, action] = useActionState(signInAction, EMPTY_ACTION_STATE);
   
//   return (
//     <div className="flex flex-col gap-4">
//       <Form action={action} actionState={actionState} >
//         <Input name="email" type="email" placeholder="Email" defaultValue={actionState.payload?.get("email") as string}  />
//         <FieldErrors name="email" actionState={actionState} />
        
//         <Input name="password" type="password" placeholder="Password" defaultValue={actionState.payload?.get("password") as string}  />
//         <FieldErrors name="password" actionState={actionState} />
        
//         <SubmitButton label="Sign In" />
//       </Form>
//       <LogInWithSocials />
//     </div>
//   );
// };

// export { SignInForm };










