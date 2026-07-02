import { Heading } from "@/components/heading";
import AccountTabs from "../_navigation/account-tabs";

const PasswordPage = () => {
    return (
        <div>
            <Heading title="Change Password" description="Update your password here." tabs={<AccountTabs />} />
        </div>
    );
};

export default PasswordPage ;
