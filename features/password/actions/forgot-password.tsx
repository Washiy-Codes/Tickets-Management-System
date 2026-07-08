"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import z from "zod";
import prisma from "@/lib/prisma";
// import { generatePasswordResetLink } from "../utils/generate-password-reset-link";
// import { sendEmailPasswordReset } from "../emails/send-email-password-reset";
import { inngest } from "@/lib/inngest";
import { generatePasswordResetLink } from "../utils/generate-password-reset-link";
import { sendEmailPasswordReset } from "../emails/send-email-password-reset";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const forgotPasswordAction = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email } = forgotPasswordSchema.parse(
      Object.fromEntries(formData)
    );

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return toActionState("ERROR", "Invalid email", formData);
    }
    const passwordResetLink = await generatePasswordResetLink(user.id);

    await sendEmailPasswordReset(user.username, email, passwordResetLink);

    // await inngest.send({
    //   name: "app/password.reset-password",
    //   data: {
    //     userId: user.id,
    //   },
    // })
    
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "check your email for the password reset instructions", formData);};

export { forgotPasswordAction };