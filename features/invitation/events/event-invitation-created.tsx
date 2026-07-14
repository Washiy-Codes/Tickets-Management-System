// import { inngest } from "@/lib/inngest";
// import prisma from "@/lib/prisma";
// import { sendEmailInvitation } from "@/lib/mailer";

// export type InvitationCreateEventArgs = {
//   data: {
//     userId: string;
//     organizationId: string;
//     email: string;
//     emailInvitationLink: string;
//   };
// };

// export const invitationCreatedEvent = inngest.createFunction(
//   { id: "invitation-created", event: "app/invitation.created" },
//   // Fix 1: Destructure 'step' from the handler arguments
//   async ({ event, step }: { event: any; step: any }) => {
//     const { userId, organizationId, email, emailInvitationLink } = event.data;

//     // Fix 2: Wrap the User query inside a step
//     const user = await step.run("fetch-user", async () => {
//       return await prisma.user.findUniqueOrThrow({
//         where: {
//           id: userId,
//         },
//       });
//     });

//     // Fix 3: Wrap the Organization query inside a step
//     const organization = await step.run("fetch-organization", async () => {
//       return await prisma.organization.findUniqueOrThrow({
//         where: {
//           id: organizationId,
//         },
//       });
//     });

//     // Fix 4: Wrap the side-effect (sending email) inside a step
//     const result = await step.run("send-email", async () => {
//       return await sendEmailInvitation(
//         user.username || "Someone", // Fallback in case username is null/optional
//         organization.name,
//         email,
//         emailInvitationLink
//       );
//     });

//     if (result.error) {
//       throw new Error(`${result.error.name}: ${result.error.message}`);
//     }

//     return { event, body: true };
//   }
// );