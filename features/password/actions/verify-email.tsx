"use server";
import { ticketsPath } from "@/paths";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/actions/get-auth-or-redirect";
import z from "zod";
import { setCookieByKey } from "@/components/actions/cookies";
import { unstable_update } from "@/auth";
import { validateEmailVerificationCode } from "../utils/validate-email-verification-code";

const emailVerificationSchema = z.object({
  code: z.string().length(8),
});

const emailVerificationAction = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const user  = await getAuthOrRedirect({checkEmailVerified: false, checkOrganizations: false});

  try {
    const { code } = emailVerificationSchema.parse(
      Object.fromEntries(formData)
    );
   
//     if (!user?.id || !user?.email) {
//   // Handle the error state (e.g., return an error response, redirect, etc.)
//   throw new Error("User session is invalid or missing required details.");
// }


    const validCode = await validateEmailVerificationCode(
      user.id,
      user.email!,
      code
    );
    const verifiedDate = new Date();
    
    if (!validCode) {
      return toActionState("ERROR", "Invalid or expired code");
    }

    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: verifiedDate },
    });
    await unstable_update({
      user: {
        emailVerified: verifiedDate,
      },
    });
  
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  await setCookieByKey("toast", "Email verified")

  redirect(ticketsPath());
};

export {emailVerificationAction};