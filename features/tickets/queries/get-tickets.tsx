// import prisma from "@/lib/prisma";
// import { searchParams } from "../search-params";
// import { ParsedSearchParams } from "../search-params";

// const getTickets = async (searchParams: ParsedSearchParams, userId?: string) => {
//   return await prisma.ticket.findMany({
//     where:{
//       userId: userId,
//         title:{
//           contains: searchParams.search,
//           mode: "insensitive"
//         }
//     },
//     orderBy: {
//       ...(searchParams.sort === "newest" && { createdAt: "desc" }),
//       ...(searchParams.sort ==="bounty" && { bounty: "desc" })
//     },
//     include:{
//       user: {
//         select: {
//           username: true,
//         }
//       }
//     }
//   });
// };

// export {getTickets};





import prisma from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";

const getTickets = async (searchParams: ParsedSearchParams, userId?: string) => {
  // 1. Build the orderBy array dynamically to satisfy Prisma's strict type system
  const orderBy: Record<string, "asc" | "desc">[] = [];

  if (searchParams.sort === "bounty") {
    orderBy.push({ bounty: "desc" });
  } else {
    // Default to newest if sort is "newest" or unspecified
    orderBy.push({ createdAt: "desc" });
  }

  return await prisma.ticket.findMany({
    where: {
      userId: userId,
      // 2. Prevent crashes by ensuring contains only runs if a search string actually exists
      title: searchParams.search
        ? {
            contains: searchParams.search,
            mode: "insensitive",
          }
        : undefined,
    },
    orderBy: orderBy, // Pass the dynamically formed array
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};

export { getTickets };




