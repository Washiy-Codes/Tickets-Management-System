"use server";
import z from "zod";
import { redirect } from "next/navigation";
import { signInPath } from "@/paths";
import { setCookieByKey } from "@/components/actions/cookies";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { hashToken } from "@/components/utils/crypto";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";



const resetPasswordSchema = z.object({
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

const resetPasswordAction = async (tokenId: string, _actionState: ActionState, formData: FormData) => {
  try {
    const { password } = resetPasswordSchema.parse({
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
  });
 
 
  const tokenHash =  hashToken(tokenId);  
 const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: {
      tokenHash: tokenHash,
    },
  });  

  if(passwordResetToken){
    await prisma.passwordResetToken.delete({
      where: {
        tokenHash: tokenHash,
      },
    });
  }
  if(!passwordResetToken || Date.now() > passwordResetToken.expiresAt.getTime()) {
    return toActionState("ERROR", "Invalid or expired reset token", formData);
  }

  await prisma.session.deleteMany({
    where: {
      user: {
        id: passwordResetToken.userId,
      },
    },
  });

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.update({
    where: {
      id: passwordResetToken.userId,
    },
    data: {
         passwordHash,
    },
  });


} catch (error) {
    return fromErrorToActionState(error, formData);
  }
await setCookieByKey("toast", "Password reset successful. Please sign in with your new password.");
redirect(signInPath())

}  
export { resetPasswordAction };
