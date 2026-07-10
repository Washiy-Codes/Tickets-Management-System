"use client";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { signUp } from "../actions/sign-up";
import { Form } from "@/components/form/form";
import { FieldErrors } from "@/components/form/field-errors";
import { homePath } from "@/paths";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  useEffect(() => {
    if (actionState?.status === "SUCCESS") {
      window.location.href = homePath();
    }
  }, [actionState]);

  return (
    <Form action={action} actionState={actionState}>
      <Input type="text" placeholder="Username" name="username" defaultValue={actionState.payload?.get("username") as string} />
      <FieldErrors name="username" actionState={actionState} />
      
      <Input type="email" placeholder="Email" name="email" defaultValue={actionState.payload?.get("email") as string} />
      <FieldErrors name="email" actionState={actionState} />
      
      <Input type="password" placeholder="Password" name="password" defaultValue={actionState.payload?.get("password") as string} />
      <FieldErrors name="password" actionState={actionState} />
      
      <Input type="password" placeholder="Confirm Password" name="confirmPassword" defaultValue={actionState.payload?.get("confirmPassword") as string} />
      <FieldErrors name="confirmPassword" actionState={actionState} />
      
      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export { SignUpForm };

























// "use client";
// import { SubmitButton } from "@/components/form/submit-button";
// import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
// import { Input } from "@/components/ui/input";
// import { useActionState, useEffect } from "react"; // Added useEffect
// import { signUp } from "../actions/sign-up";
// import { Form } from "@/components/form/form";
// import { FieldErrors } from "@/components/form/field-errors";
// import { useRouter } from "next/navigation"; // Added useRouter
// import { useSession } from "next-auth/react"; // Added useSession

// const SignUpForm = () => {
//   const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);
//   const router = useRouter();
//   const { update } = useSession();

//   // Fix: Force sidebar update if the user is automatically logged in
//   useEffect(() => {
//     if (actionState.status === "SUCCESS") {
//       update().then(() => {
//         router.refresh();
//       });
//     }
//   }, [actionState.status, router, update]);

//   return (
//     <Form action={action} actionState={actionState} >
//       <Input type="text" placeholder="Username" name="username" defaultValue={actionState.payload?.get("username") as string} />
//       <FieldErrors name="username" actionState={actionState} />
      
//       <Input type="email" placeholder="Email" name="email" defaultValue={actionState.payload?.get("email") as string} />
//       <FieldErrors name="email" actionState={actionState} />
      
//       <Input type="password" placeholder="Password" name="password" defaultValue={actionState.payload?.get("password") as string} />
//       <FieldErrors name="password" actionState={actionState} />
      
//       <Input type="password" placeholder="Confirm Password" name="confirmPassword" defaultValue={actionState.payload?.get("confirmPassword") as string} />
//       <FieldErrors name="confirmPassword" actionState={actionState} />
      
//       <SubmitButton label="Sign Up" />
//     </Form>
//   );
// };

// export { SignUpForm };









// // "use client";
// // import { SubmitButton } from "@/components/form/submit-button"
// // import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
// // import { Input } from "@/components/ui/input"
// // import { useActionState } from "react";
// // import { signUp } from "../actions/sign-up";
// // import { Form } from "@/components/form/form";
// // import { FieldErrors } from "@/components/form/field-errors";

// // const SignUpForm = () => {
// //   const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);
 
// //   return (
// //     <Form action={action} actionState={actionState} >
// //       <Input type="text" placeholder="Username" name="username" defaultValue={actionState.payload?.get("username") as string} />
// //       <FieldErrors name="username" actionState={actionState} />
// //       <Input type="email" placeholder="Email" name="email" defaultValue={actionState.payload?.get("email") as string} />
// //       <FieldErrors name="email" actionState={actionState} />
// //       <Input type="password" placeholder="Password" name="password" defaultValue={actionState.payload?.get("password") as string} />
// //       <FieldErrors name="password" actionState={actionState} />
// //       <Input type="password" placeholder="Confirm Password" name="confirmPassword" defaultValue={actionState.payload?.get("confirmPassword") as string} />
// //       <FieldErrors name="confirmPassword" actionState={actionState} />
// //       <SubmitButton label="Sign Up" />
// //     </Form>
    
// //   )
// // }

// // export {SignUpForm}







