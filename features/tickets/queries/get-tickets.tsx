
import prisma from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";
import { getActiveOrganization } from "@/features/organization/querries/get-active-organization";
import { getActiveMembership } from "@/features/membership/querries/get-active-membership";
import { isOwner } from "@/features/auth/utils/is-owner";
import { auth } from "@/auth";

export const getTickets = async (
  userId: string | undefined,
  byOrganization: boolean | undefined,
  searchParams: ParsedSearchParams
) => {
  const activeOrganization = await getActiveOrganization();
  const activeMembership = await getActiveMembership();
  const session = await auth();
  const user = session?.user;
//TODO
  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
    ...(byOrganization && activeOrganization
      ? {
          organizationId: activeOrganization.id,
        }
      : {}),
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    }),
    prisma.ticket.count({
      where,
    }),
  ], {
    maxWait: 10000, 
    timeout: 15000, 
  });

  // Map over database items to transform the shape asynchronously
  const list = await Promise.all(
    tickets.map(async (ticket) => {      
      const ticketIsOwner = await isOwner(user, ticket);
      
      return {
        ...ticket,
        isOwner: ticketIsOwner,
        permission: {
          canDeleteTicket: ticketIsOwner && !!activeMembership?.canDeleteTicket,
        },
      };
    })
  );

  return {
    list, // Returns the transformed array with permissions included
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};


// const organizationsByUser = await getOrganizationsByUser();

// const activeMembership = await getActiveMembership();

// return {
//   list: tickets.map(async (ticket) => {
//     // const permissions = await getTicketPermissions({
//     //   organizationId: ticket.organizationId,
//     //   userId: user?.id,
//     // });

//     const organization = organizationsByUser.find(
//       (organization) => organization.id === ticket.organizationId
//     );

//     return {
//       ...ticket,
//       isOwner: isOwner(user, ticket),
//       permissions: {
//         canDeleteTicket:
//           isOwner(user, ticket) &&
//           !!organization?.membershipByUser.canDeleteTicket,
//         // isOwner(user, ticket) && !!activeMembership?.canDeleteTicket,
//         // isOwner(user, ticket) && !!permissions.canDeleteTicket,
//       },
//     };
//   }),
// };
















// import  prisma  from "@/lib/prisma";
// import { ParsedSearchParams } from "../search-params";
// import { getActiveOrganization } from "@/features/organization/querries/get-active-organization";

// export const getTickets = async (
//   userId: string | undefined,
//   byOrganization: boolean | undefined,
//   searchParams: ParsedSearchParams
// ) => {
//   const activeOrganization = await getActiveOrganization();
//   const where = {
//     userId,
//     title: {
//       contains: searchParams.search,
//       mode: "insensitive" as const,
//     },
//     ...(byOrganization && activeOrganization
//   ? {
//       organizationId: activeOrganization.id,
//     }
//   : {}),
//   };

//   const skip = searchParams.page * searchParams.size;
//   const take = searchParams.size;

//  const [tickets, count] = await prisma.$transaction([
//    prisma.ticket.findMany({
//     where,
//     skip,
//     take,
//     orderBy: {
//       [searchParams.sortKey]: searchParams.sortValue,
//     },
//     include: {
//       user: {
//         select: {
//           username: true,
//         },
//       },
//     },
//   }),
//   prisma.ticket.count({
//     where,
//   }),
//  ], {
//   maxWait: 10000, // Time to wait for a connection slot (10s)
//   timeout: 15000, // Maximum execution lifetime duration (15s)
//  }
//   )
//   return {
//     list: tickets,
//     metadata: {
//       count,
//       hasNextPage: count > skip + take,
//     },
//   };
// };
