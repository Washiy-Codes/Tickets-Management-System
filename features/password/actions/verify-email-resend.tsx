"use server";
import { ticketsPath } from "@/paths";
import { redirect } from "next/navigation";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/actions/get-auth-or-redirect";
import { unstable_update } from "@/auth";
import { generateVerificationCode } from "../utils/generate-verification-code";
import { sendEmailVerification } from "@/features/auth/emails/send-email-verification";



const emailVerificationResendAction = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const user  = await getAuthOrRedirect({checkEmailVerified: false, checkOrganizations: false});

  try {
   
    const verificationCode = await generateVerificationCode(user.id, user.email!);
    
    const resend = await sendEmailVerification(user.username!, user.email!, verificationCode);

    if(!resend){
        return toActionState("ERROR", "Failed to resend verification code");
    }
    
  
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

   return toActionState("SUCCESS", "Verification code resent successfully");

};

export {emailVerificationResendAction};