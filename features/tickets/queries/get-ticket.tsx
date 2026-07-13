// // import { auth } from "@/auth";
// // import { isOwner } from "@/features/auth/utils/is-owner";
// // import { getActiveMembership } from "@/features/membership/querries/get-active-membership";
// // import prisma from "@/lib/prisma";

// // type ticketProps = {
// //   ticketId: string;
// // }

// // const getTicket = async({ticketId}: ticketProps) => {
// // const session = await auth();
// // const user = session?.user;
// //  const ActiveMembership = await getActiveMembership();
// //   const ticket = await prisma.ticket.findUnique({
// //     where: {
// //       id: ticketId
// //     },
// //     include: {
// //       user: {
// //         select: {
// //           username: true,
// //         }
// //       }
// //     } 
// //   });
// //     const isTicketOwner = await isOwner(user, ticket);

// //   return {...ticket,
// //     isOwner: isTicketOwner,
// //     // permission:{
// //     //   canDeleteTicket: await isOwner(user, ticket) && !!ActiveMembership?.canDeleteTicket
// //     // }
// //   };
// // }

// // export default getTicket















// import { auth } from "@/auth";
// import { isOwner } from "@/features/auth/utils/is-owner";
// import { getActiveMembership } from "@/features/membership/querries/get-active-membership";
// import prisma from "@/lib/prisma";
// import { Prisma } from "@prisma/client";

// type TicketProps = {
//   ticketId: string;
// };

// // 1. Capture the exact structural database payload with the included user relation
// type TicketWithUser = Prisma.TicketGetPayload<{
//   include: {
//     user: {
//       select: {
//         username: true;
//       };
//     };
//   };
// }>;

// // 2. Define the exact shape returned by this single ticket query
// export type SingleTransformedTicket = TicketWithUser & {
//   isOwner: boolean;
//    permission: {
//     canDeleteTicket: boolean;
//   };
// };

// // 3. Apply the explicit return type to the function signature
// const getTicket = async ({ ticketId }: TicketProps): Promise<SingleTransformedTicket | null> => {
//   const session = await auth();
//   const user = session?.user;
//   const activeMembership = await getActiveMembership();
  
//   const ticket = await prisma.ticket.findUnique({
//     where: {
//       id: ticketId
//     },
//     include: {
//       user: {
//         select: {
//           username: true,
//         }
//       }
//     } 
//   });

//   if (!ticket) {
//     return null;
//   }

//   const isTicketOwner = await isOwner(user, ticket);

//   return {
//     ...ticket,
//     isOwner: isTicketOwner,
//      permission: {
//           canDeleteTicket: isTicketOwner && !!activeMembership?.canDeleteTicket,
//         },
//   };
// };

// export default getTicket;



import { auth } from "@/auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getActiveMembership } from "@/features/membership/querries/get-active-membership";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getTicketPermissions } from "../components/permission/get-ticket-permission";

type TicketProps = {
  ticketId: string;
};

type TicketWithUser = Prisma.TicketGetPayload<{
  include: {
    user: {
      select: {
        username: true;
      };
    };
  };
}>;

export type SingleTransformedTicket = TicketWithUser & {
  isOwner: boolean;
  permission: {
    canDeleteTicket: boolean;
  };
};

const getTicket = async ({ ticketId }: TicketProps): Promise<SingleTransformedTicket | null> => {
  const session = await auth();
  const user = session?.user;
  const activeMembership = await getActiveMembership();
  
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId
    },
    include: {
      user: {
        select: {
          username: true,
        }
      }
    } 
  });

  if (!ticket) {
    return null;
  }

  const isTicketOwner = await isOwner(user, ticket);
  const permissions = await getTicketPermissions({
    organizationId: ticket.organizationId,
    userId: user?.id,
  });
  // Fix: Add "as SingleTransformedTicket" at the very end to bypass strict nested intersection tracking
  return {
    ...ticket,
    isOwner: isTicketOwner,
    permission: {
      canDeleteTicket: isTicketOwner && !!permissions?.canDeleteTicket,
    },
  } as SingleTransformedTicket;
};

export default getTicket;

