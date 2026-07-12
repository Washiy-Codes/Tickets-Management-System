
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import prisma from "@/lib/prisma";
import { organizationPath, selectActiveOrganizationPath } from "@/paths";
import { getOrganizationsForUser } from "../querries/get-user-organizations";
import { getAdminOrRedirect } from "@/features/membership/querries/get-admin-or-redirect";

const deleteOrganization = async (organizationId: string) => {
  await getAdminOrRedirect(organizationId);
  
  let shouldRedirectToSelection = false;

  try {
    const organizations = await getOrganizationsForUser();
    const targetOrg = organizations.find(
      (organization) => organization.id === organizationId
    );

    if (!targetOrg) {
      return toActionState("ERROR", "Not a member of this organization");
    }
    if (targetOrg.membershipByUser?.isActive) {
      shouldRedirectToSelection = true;
    }
    await prisma.organization.delete({
      where: {
        id: organizationId,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  if (shouldRedirectToSelection) {
    revalidatePath("/", "layout");
    redirect(selectActiveOrganizationPath());
  } else {
    revalidatePath(organizationPath());
    return toActionState("SUCCESS", "Organization deleted successfully");
  }
};

export { deleteOrganization };
