"use server";

import { revalidatePath } from "next/cache";
import { toActionState } from "@/components/form/utils/to-action-state";
import prisma from "@/lib/prisma";
import { membershipsPath } from "@/paths";
import { getAuthOrRedirect } from "@/features/auth/actions/get-auth-or-redirect";
import getMemberships from "../querries/get-memberships";

export const deleteMembership = async ({
  userId,
  organizationId,
}: {
  userId: string;
  organizationId: string;
}) => {
 const {user} = await getAuthOrRedirect();

  const memberships = await getMemberships(organizationId);
const isAdmin = memberships.some((membership) => membership.userId === user.id && membership.membershipRole === "ADMIN");

const isLastMembership = (memberships ?? []).length === 1;
const myMembership = (memberships ?? []).find((membership) => membership.userId === user.id);
const isMyself = myMembership?.userId === user.id;

if (!isMyself && !isAdmin) {
  return toActionState(
    "ERROR",
    "Sorry, only admins can delete other members from an organization"
  );
}

if (isLastMembership) {
  return toActionState(
    "ERROR",
    "Sorry, you can't delete the last membership of an organization"
  );
}

  await prisma.membership.delete({
    where: {
      organizationId_userId: {
        userId,
        organizationId,
      },
    },
  });

  revalidatePath(membershipsPath(organizationId));

  return toActionState("SUCCESS", 
    isMyself
      ? "You have left the organization"
      :
    "The membership has been deleted");
};