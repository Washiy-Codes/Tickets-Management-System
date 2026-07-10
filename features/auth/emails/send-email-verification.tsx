import EmailVerificationCode from "@/app/email/auth/email-verification-code";
import { resend } from "@/lib/resend";

export const sendEmailVerification = async (
  username: string,
  email: string,
  verificationCode: string
) => {
  return await resend.emails.send({
    // ✅ FIX: Use Resend's free sandbox domain instead of a custom domain
    from: "onboarding@resend.dev",
    to: email, // ⚠️ REMEMBER: For free testing, this must be YOUR Resend account email!
    subject: "Email Verification from TicketBounty",
    react: <EmailVerificationCode toName={username} code={verificationCode} />,
  });
};
