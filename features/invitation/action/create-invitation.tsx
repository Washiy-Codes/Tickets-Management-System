"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { invitationsPath } from "@/paths";
import { getAdminOrRedirect } from "@/features/membership/querries/get-admin-or-redirect";
import { auth } from "@/auth";
import { generateInvitationLink } from "../utils/generate-invitation-link";

const createInvitationSchema = z.object({
  email: z.string().min(1, { message: "Is required" }).max(191).email(),
});

export const createInvitation = async (
  organizationId: string,
  _actionState: ActionState,
  formData: FormData
) => {
const session = await auth();
  const user = session?.user;
  await getAdminOrRedirect(organizationId);
  

  try {
    const { email } = createInvitationSchema.parse({
      email: formData.get("email"),
    });

      const targetMembership = await prisma.membership.findFirst({
    where: {
      organizationId,
      user: {
        email,
      },
    },
  });

  if (targetMembership) {
    return toActionState(
      "ERROR",
      "User is already a member of this organization"
    );
  }

  const emailInvitationLink = await generateInvitationLink(
    user!.id,
    organizationId,
    email
  );
    // TODO: invite by email link to join organization
    console.log("emailInvitationLink", emailInvitationLink);
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(invitationsPath(organizationId));

  return toActionState("SUCCESS", "User invited to organization");
};