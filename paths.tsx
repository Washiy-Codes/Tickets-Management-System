const ticketsPath = () => "/tickets";
const ticketPath = (ticketId: string) => `/tickets/${ticketId}`;
const homePath = () => "/";
const ticketEditPath = (ticketId: string) => `/tickets/${ticketId}/edit`;
const signUpPath = () => "/sign-up";
const signInPath = () => "/sign-in";
const forgotPasswordPath = () => "/forgot-password";
const resetPasswordPath = () => "/reset-password";
const emailVerificationPath = () => "/email-verification";
const organizationPath = () => "/organization";
const onboardingPath = () => "/onboarding";
const organizationCreatePath = () => "/organization/create";


const accountProfilePath = ()=> "/account/profile";
const accountPasswordPath = ()=> "/account/password";

export { 
    ticketsPath, 
    ticketPath, 
    homePath, ticketEditPath, 
    signUpPath, 
    signInPath, 
    forgotPasswordPath, 
    accountProfilePath, 
    accountPasswordPath,
    resetPasswordPath,
    emailVerificationPath,
    organizationPath,
    onboardingPath,
    organizationCreatePath
};