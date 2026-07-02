"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { homePath } from "@/paths";
import { redirect } from "next/navigation";
import z from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth"; 


const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100).trim(),
});

const signInAction = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData)
    );

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return toActionState("ERROR", "Invalid email or password", formData);
    }

    if (!user.passwordHash) {
      return toActionState("ERROR", "User has not set a password", formData);
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return toActionState("ERROR", "Invalid email or password", formData);
    }
    
    
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,

      });
      if (result?.error) {
        return toActionState("ERROR", "Login failed", formData);
      }
  
    
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(homePath());
};

export { signInAction };