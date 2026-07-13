import { redirect } from "next/navigation";
import { signInPath } from "@/paths";
import getMembership from "./get-membership";
import { getAuthOrRedirect } from "@/features/auth/actions/get-auth-or-redirect";

export const getAdminOrRedirect = async (organizationId: string) => {
  const {user} = await getAuthOrRedirect();

  const membership = await getMembership({
    organizationId,
    userId: user.id,
  });

  if (!membership) {
    redirect(signInPath());
  }

  if (membership.membershipRole !== "ADMIN") {
    redirect(signInPath());
  }

  return { ...user, membership };
};