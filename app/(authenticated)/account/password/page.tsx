import { Heading } from "@/components/heading";
import AccountTabs from "../_navigation/account-tabs";
import { CardCompact } from "@/components/card-compact";
import { PasswordChangeForm } from "@/features/password/components/password-change-form";

const PasswordPage = () => {
    return (
        <>
        <Heading title="Change Password"
            description="keep your account secure."
            tabs={<AccountTabs />} />        
        <div className="flex flex-1 flex-col gap-8 items-center justify-center">
        <CardCompact
          title="Change Password"
         description="Enter your current password"
         className="max-w-md w-full animate-fade-in-from-top "
          content={<PasswordChangeForm />} />
        
      </div>
      </>   
        
    );
};

export default PasswordPage ;
