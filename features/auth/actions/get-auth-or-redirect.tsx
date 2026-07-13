import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { emailVerificationPath, onboardingPath, selectActiveOrganizationPath, signInPath } from "@/paths";
import { getOrganizationsForUser } from "@/features/organization/querries/get-user-organizations";


type GetAuthOrRedirectProps = {
  checkEmailVerified?: boolean;
  checkOrganizations?: boolean;
  checkActiveOrganization?: boolean;
};
const getAuthOrRedirect = async (options?: GetAuthOrRedirectProps) => {
    const {checkEmailVerified = true, checkOrganizations = true, checkActiveOrganization = true} = options ?? {};
    const session = await auth();
    const user = session?.user;
    if(!user){
        redirect(signInPath());
    }
    if(checkEmailVerified && !user.emailVerified){
        redirect(emailVerificationPath());
    }
    let activeOrganization
    
    if(checkOrganizations || checkActiveOrganization){
        const organizations = await getOrganizationsForUser();
        if(checkOrganizations && organizations.length === 0){
            redirect(onboardingPath());
        }

      activeOrganization = organizations.find((organization) => organization.membershipByUser.isActive);

        const hasActiveOrganization = !!activeOrganization;
       
        if(checkActiveOrganization && !hasActiveOrganization){
            redirect(selectActiveOrganizationPath());
        }
    
    }
    return {user, activeOrganization};
}

export {getAuthOrRedirect}