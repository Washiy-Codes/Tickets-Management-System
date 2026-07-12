
"use server";
import { revalidatePath } from "next/cache";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import prisma from "@/lib/prisma";
import { organizationPath } from "@/paths";
import { getAuthOrRedirect } from "@/features/auth/actions/get-auth-or-redirect";
import { getOrganizationsForUser } from "../querries/get-user-organizations";
 const switchOrganization = async (organizationId: string) => {
  const user  = await getAuthOrRedirect({checkActiveOrganization: false});
  
  try {
  const organizations = await getOrganizationsForUser();
  const canSwitch = organizations.some((organization) => organization.id === organizationId);
  if (!canSwitch) {
    return toActionState("ERROR", "You are not a member of this organization");
  }
  
  await prisma.$transaction([
    prisma.membership.updateMany({
      where: {
        userId: user.id,
        organizationId: {
          not: organizationId,
        },
      },
      data: {
        isActive: false,
      },
    }),
     prisma.membership.update({
      where: {
        organizationId_userId: {
          organizationId,
          userId: user.id,
        },
      },
      data: {
        isActive: true,
      },
    })
  ])} catch (error) {
    return fromErrorToActionState(error);
  }
  

  revalidatePath(organizationPath());

  return toActionState("SUCCESS", "Active organization has been switched");
};

export { switchOrganization };
