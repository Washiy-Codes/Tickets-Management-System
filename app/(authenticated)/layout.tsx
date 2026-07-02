import { getAuthOrRedirect } from "@/features/auth/actions/get-auth-or-redirect";

const LayoutAuthentication = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  await getAuthOrRedirect(); 

  return <>{children}</>;
};

export default LayoutAuthentication;