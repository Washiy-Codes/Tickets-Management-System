import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { emailVerificationPath, onboardingPath, signInPath } from "@/paths";
import { getOrganizationsForUser } from "@/features/organization/querries/get-user-organizations";


type GetAuthOrRedirectProps = {
  checkEmailVerified?: boolean;
  checkOrganizations?: boolean;
};
const getAuthOrRedirect = async (options?: GetAuthOrRedirectProps) => {
    const {checkEmailVerified = true, checkOrganizations = true} = options ?? {};
    const session = await auth();
    const user = session?.user;
    if(!user){
        redirect(signInPath());
    }
    if(checkEmailVerified && !user.emailVerified){
        redirect(emailVerificationPath());
    }
    
    if(checkOrganizations){
       const organizations = await getOrganizationsForUser();
       if(organizations.length === 0){
        redirect(onboardingPath());
       }
    }
    return user;
}

export {getAuthOrRedirect}