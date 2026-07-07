import { CardCompact } from "@/components/card-compact"
import { ForgotPasswordForm } from "@/features/password/components/forgot-password-form"

const ForgotPassword = () => {

  return (
     <div className="flex flex-1 flex-col gap-8 items-center justify-center">
         <CardCompact 
            title="Forgot Password"
            description="Enter your email address to reset your password."
            className="max-w-md w-full animate-fade-in-from-top "
            content={<ForgotPasswordForm />}
          />
      </div>
  )
}

export default ForgotPassword