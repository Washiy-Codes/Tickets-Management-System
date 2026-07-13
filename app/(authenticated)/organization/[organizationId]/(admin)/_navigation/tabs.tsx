"use client";

import Breadcrumbs from "@/components/breadcramps";
import { invitationsPath, membershipsPath, organizationPath } from "@/paths";
import { useParams, usePathname } from "next/navigation";

const OrganizationBreadcrumbs = () => {
  const params = useParams<{ organizationId: string }>();
  const pathname = usePathname();

  const title = {
    memberships: "Memberships" as const,
    invitations: "Invitations" as const,
  }[pathname.split("/").at(-1) as "memberships" | "invitations"];

  return (
    <Breadcrumbs
      breadcrumbs={[
        { title: "Organizations", href: organizationPath() },
        {
          title,
          dropdown: [
            {
              title: "Memberships",
              href: membershipsPath(params.organizationId),
            },
            {
              title: "Invitations",
              href: invitationsPath(params.organizationId),
            },
          ],
        },
      ]}
    />
  );
};

export { OrganizationBreadcrumbs };