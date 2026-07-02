import { Heading } from "@/components/heading";
import AccountTabs from "../_navigation/account-tabs";

const ProfilePage = () => {
  return (
    <div>
        <Heading title="Profile" description="Update your profile information here." tabs={
            <AccountTabs />
        } />
    </div>
  );
}

export default ProfilePage ;