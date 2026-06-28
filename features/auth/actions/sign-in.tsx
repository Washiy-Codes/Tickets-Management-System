"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { ticketsPath } from "@/paths";
import { redirect } from "next/navigation";
import z from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20).trim(),
});


const signIn = async (_actionState:ActionState,formData: FormData) => {
  try{
  const { email, password } = signInSchema.parse(
    Object.fromEntries(formData)

  );
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!user) {
    return toActionState("ERROR", "Invalid email or password");
  }
  if (!user.passwordHash) {
    return toActionState("ERROR", "User has not set a password");
  }
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return toActionState("ERROR", "Invalid email or password");
  }
}catch(error){
   return fromErrorToActionState(error);
}
redirect(ticketsPath());
};

export {signIn}