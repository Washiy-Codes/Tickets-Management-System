// import { PrismaClient } from "@prisma/client"; 
// import { PrismaPg } from "@prisma/adapter-pg";
// import bcrypt from "bcryptjs";
// import "dotenv/config";

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL,
// });

// const prisma = new PrismaClient({
//   adapter,
// });


// const users = [
//     { username: "admin", 
//       email: "admin@example.com",
//       password: "admin123",
//       emailVerified: new Date(), 
//     },
//     { username: "user1", 
//       email: "wachirajosep613@gmail.com",
//       emailVerified: new Date(),
//     },
//     {
//       username: "user2", 
//       email: "example4@gmail.com",
//       emailVerified: new Date(),  
//     }

// ]
// const comment = [
//     { content: 'First comment from DB.' },
//     { content: 'Second comment from DB.' },
//     { content: 'Third comment from DB.' }
// ];

// const tickets = [
//     { title: 'Sample Ticket 1', content: 'This is the first ticket from the database.', status:"OPEN" as const }, 
//     { title: 'Sample Ticket 2', content: 'This is the second ticket from the database.', status:"DONE" as const },
//     { title: 'Sample Ticket 3', content: 'This is the third ticket from the database.', status:"IN_PROGRESS" as const },
// ]; 


// const seed = async () => {
//     const t0 = performance.now();
//     console.log("DB seed: Starting...");
        
//     await prisma.comment.deleteMany();
//     await prisma.ticket.deleteMany();
//     await prisma.user.deleteMany();
//     await prisma.organization.deleteMany();
//     await prisma.membership.deleteMany();


//     const passwordHash = await bcrypt.hash("password", 10);

//     const dbOrganization = await prisma.organization.create({
//         data: {
//             name: "Organization 1",
//         },
//     });
    
//     const dbUser = await prisma.user.createManyAndReturn({
//         data: users.map((user) => ({ ...user, passwordHash })),
//     });

//     await prisma.membership.createMany({
//         data: [{
//             userId: dbUser[0].id,
//             organizationId: dbOrganization.id,
//             isActive: true,
//             membershipRole: "ADMIN",
//         },
//        {
//         userId: dbUser[1].id,
//         organizationId: dbOrganization.id,
//         isActive: false,
//         membershipRole: "MEMBER",
//     }],
//     })

//     const dbTicket = await prisma.ticket.createManyAndReturn({
//         data: tickets.map((ticket) => ({
//              ...ticket,
//               userId: dbUser[0].id,
//               organizationId: dbOrganization.id,
//              })), // Associate all tickets with the first user
//     });

//     await prisma.comment.createMany({
//         data: comment.map((comment) => ({ 
//           ...comment,
//           userId: dbUser[0].id, // Associate all comments with the first user 
//           ticketId: dbTicket[0].id })), // Associate all comments with the first ticket
//     });

//     const t1 = performance.now();
//     console.log(`DB seed: Finished in ${(t1 - t0).toFixed(2)} ms`);
// }


// seed()




















import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

const users = [
  {
    username: "admin",
    email: "admin@example.com",
    password: "admin123",
    emailVerified: new Date(),
  },
  {
    username: "user1",
    email: "wachirajosep613@gmail.com",
    password: "User123!ChangeMe",
    emailVerified: new Date(),
  },
  {
    username: "user2",
    email: "example4@gmail.com",
    password: "User456!ChangeMe",
    emailVerified: new Date(),
  },
];

const comments = [
  { content: "First comment from DB." },
  { content: "Second comment from DB." },
  { content: "Third comment from DB." },
];

const tickets = [
  {
    title: "Sample Ticket 1",
    content: "This is the first ticket from the database.",
    status: "OPEN" as const,
  },
  {
    title: "Sample Ticket 2",
    content: "This is the second ticket from the database.",
    status: "DONE" as const,
  },
  {
    title: "Sample Ticket 3",
    content: "This is the third ticket from the database.",
    status: "IN_PROGRESS" as const,
  },
];

async function seed() {
  const t0 = performance.now();

  console.log("DB seed: Starting...");

  // WARNING: This clears existing development data.
  // Delete dependent records before their parent records.
 // Delete dependent records first.
await prisma.comment.deleteMany();
await prisma.ticket.deleteMany();
await prisma.membership.deleteMany();

// Delete organizations after their memberships.
await prisma.organization.deleteMany();

// Delete users after their dependent records.
await prisma.user.deleteMany();

  const dbOrganization = await prisma.organization.create({
    data: {
      name: "Organization 1",
    },
  });

  // Hash each user's individual password.
  const dbUser = await prisma.user.createManyAndReturn({
    data: await Promise.all(
      users.map(async ({ password, ...user }) => ({
        ...user,
        passwordHash: await bcrypt.hash(password, 10),
      }))
    ),
  });

  await prisma.membership.createMany({
    data: [
      {
        userId: dbUser[0].id,
        organizationId: dbOrganization.id,
        isActive: true,
        membershipRole: "ADMIN",
      },
      {
        userId: dbUser[1].id,
        organizationId: dbOrganization.id,
        isActive: false,
        membershipRole: "MEMBER",
      },
    ],
  });

  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUser[0].id,
      organizationId: dbOrganization.id,
    })),
  });

  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      ...comment,
      userId: dbUser[0].id,
      ticketId: dbTickets[0].id,
    })),
  });

  const t1 = performance.now();

  console.log(
    `DB seed: Finished in ${(t1 - t0).toFixed(2)} ms`
  );

  console.log("Development login credentials:");
  console.log("Admin: admin@example.com / admin123");
  console.log(
    "User 1: wachirajosep613@gmail.com / User123!ChangeMe"
  );
  console.log(
    "User 2: example4@gmail.com / User456!ChangeMe"
  );
}

seed()
  .catch((error) => {
    console.error("DB seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
