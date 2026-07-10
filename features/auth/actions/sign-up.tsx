"use server";
import z from "zod";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { Prisma } from "@prisma/client";
import { generateVerificationCode } from "@/features/password/utils/generate-verification-code";
import { sendEmailVerification } from "../emails/send-email-verification";

const signUpSchema = z.object({
  username: z.string().min(3).max(20).trim().refine((value)=> !value.includes(" "),"Username cannot contain spaces"),
  email: z.string().email(),
  password: z.string().min(6).max(20).trim(),
  confirmPassword: z.string().min(6).max(20).trim(),
}).superRefine(({password, confirmPassword}, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
});

const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData)
    );
    
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: await bcrypt.hash(password, 10),
      },
    }); 
    
    const verificationCode = await generateVerificationCode(user.id, email);
    await sendEmailVerification(username, email, verificationCode);  
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    }); 
    
    if (result?.error) {
      return toActionState("ERROR", "Sign up failed", formData);
    } 

    // Return the SUCCESS action state directly to the client form
    return toActionState("SUCCESS", "Account created successfully.", formData);

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return toActionState("ERROR", 'An account with this email already exists.', formData);
      }
    }
    return fromErrorToActionState(error, formData);
  }
};

export { signUp };






















// "use server";
// import z from "zod";
// import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
// import prisma from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import { redirect } from "next/navigation";
// import { homePath} from "@/paths";
// import { signIn } from "@/auth";
// import { Prisma } from "@prisma/client";
// import { generateVerificationCode } from "@/features/password/utils/generate-verification-code";
// import { sendEmailVerification } from "../emails/send-email-verification";

// const signUpSchema = z.object({
//   username: z.string().min(3).max(20).trim().refine((value)=> !value.includes(" "),"Username cannot contain spaces"),
//   email: z.string().email(),
//   password: z.string().min(6).max(20).trim(),
//   confirmPassword: z.string().min(6).max(20).trim(),
// }).superRefine(({password, confirmPassword}, ctx) => {
//   if (password !== confirmPassword) {
//     ctx.addIssue({
//       code: "custom",
//       message: "Passwords do not match",
//       path: ["confirmPassword"],
//     }
//     );
//   }
// });

// const signUp = async (_actionState:ActionState,formData: FormData) => {
//   try{
//   const { username, email, password } = signUpSchema.parse(
//     Object.fromEntries(formData)
//   );
//   const user = await prisma.user.create({
//     data: {
//       username,
//       email,
//       passwordHash: await bcrypt.hash(password, 10),
//     },
//   }); 
  
//   const verificationCode = await generateVerificationCode(user.id, email);

// await sendEmailVerification(username, email, verificationCode);  
  
//   const result = await signIn("credentials", {
//     email,
//     password,
//     redirect: false,
//   }); 
//   if (result?.error) {
//     return toActionState("ERROR", "Sign up failed", formData);
//   } 
// }catch(error){
//   if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       if (error.code === 'P2002') {
//         return toActionState("ERROR", 'An account with this email already exists.', formData);}
//     }
//    return fromErrorToActionState(error, formData);
// }
// toActionState("SUCCESS", "Account created successfully.");
// return redirect(homePath());
// };

// export {signUp}