"use server";
import z from "zod";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ticketsPath } from "@/paths";

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
    }
    );
  }
});

const signUp = async (_actionState:ActionState,formData: FormData) => {
  try{
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
}catch(error){
   return fromErrorToActionState(error, formData);
}
toActionState("SUCCESS", "Account created successfully.");
redirect(ticketsPath());
};

export {signUp}