import { CardCompact } from "@/components/card-compact"
import { EmailVerificationForm } from "@/features/password/components/email-verification-form"
import { EmailVerificationResendForm } from "@/features/password/components/email-verification-resend-form"

const EmailVerification = () => {

  return (
     <div className="flex flex-1 flex-col gap-8 items-center justify-center">
         <CardCompact 
            title="Verify Email"
            description="Enter the verification code sent to your email."
            className="max-w-md w-full animate-fade-in-from-top "
            content={
            <div className="flex flex-col gap-2">
            <EmailVerificationForm />
            <EmailVerificationResendForm  />
            </div>
          }
          />
      </div>
  )
}

export default EmailVerification