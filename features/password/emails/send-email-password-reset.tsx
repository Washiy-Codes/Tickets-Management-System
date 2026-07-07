import EmailPasswordReset from "@/app/email/password/email-password-reset";
import { resend } from "@/lib/resend";

export const sendEmailPasswordReset = async (
  username: string,
  email: string,
  passwordResetLink: string
) => {
  return await resend.emails.send({
    // ✅ FIX: Use Resend's free sandbox domain instead of a custom domain
    from: "onboarding@resend.dev",
    to: email, // ⚠️ REMEMBER: For free testing, this must be YOUR Resend account email!
    subject: "Password Reset from TicketBounty",
    react: <EmailPasswordReset toName={username} url={passwordResetLink} />,
  });
};
