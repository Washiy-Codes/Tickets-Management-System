"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import z from "zod";
import { generatePasswordResetLink } from "../utils/generate-password-reset-link";
import { getAuthOrRedirect } from "@/features/auth/actions/get-auth-or-redirect";
import { verifyPasswordHash } from "../utils/hash-and-verify";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation"; 
import { inngest } from "@/lib/inngest"; 

const changePasswordSchema = z.object({
  password: z.string().min(6).max(100),
});

const changePasswordAction = async (_actionState: ActionState | undefined, formData: FormData) => {
  const {user} = await getAuthOrRedirect();
  let targetRedirectUrl = "";

  try {
    const { password } = changePasswordSchema.parse(
      Object.fromEntries(formData)
    );

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        passwordHash: true,
      },
    });

    if (!dbUser || !dbUser.passwordHash) {
      return toActionState("ERROR", "User account not found.", formData);
    }
    const validPassword = await verifyPasswordHash(password, dbUser.passwordHash);

    if(!validPassword) {
      return toActionState("ERROR", "Invalid password", formData);
    }
    
    await inngest.send({
      name: "app/password.reset-password",
      data: {
        userId: user.id,
      },
    });

    const fullResetLink = await generatePasswordResetLink(user.id);
    targetRedirectUrl = fullResetLink;
    
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
  if (targetRedirectUrl) {
    redirect(targetRedirectUrl);
  }
};

export { changePasswordAction };





















// "use server";

// import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
// import z from "zod";
// import { generatePasswordResetLink } from "../utils/generate-password-reset-link";
// import { getAuthOrRedirect } from "@/features/auth/actions/get-auth-or-redirect";
// import { verifyPasswordHash } from "../utils/hash-and-verify";
// import prisma from "@/lib/prisma";
// import { redirect } from "next/navigation"; 
// import { inngest } from "@/lib/inngest"

// const changePasswordSchema = z.object({
//   password: z.string().min(6).max(100),
// });

// const changePasswordAction = async (_actionState: ActionState, formData: FormData) => {
//   const user = await getAuthOrRedirect();
//   let targetRedirectUrl = "";

//   try {
//     const { password } = changePasswordSchema.parse(
//       Object.fromEntries(formData)
//     );

//     const dbUser = await prisma.user.findUnique({
//       where: {
//         id: user.id,
//       },
//       select: {
//         passwordHash: true,
//       },
//     });

//     if (!dbUser || !dbUser.passwordHash) {
//       return toActionState("ERROR", "User account not found.", formData);
//     }
//     const validPassword = await verifyPasswordHash(password, dbUser.passwordHash);

//     if(!validPassword) {
//       return toActionState("ERROR", "Invalid password", formData);
//     }

//     await inngest.send({
//       name: "app/password.reset-password",
//       data: {
//         userId: user.id,
//       },
//     });

//     const fullResetLink = await generatePasswordResetLink(user.id);
//     targetRedirectUrl = fullResetLink;
    
//   } catch (error) {
//     return fromErrorToActionState(error, formData);
//   }
//   if (targetRedirectUrl) {
//     redirect(targetRedirectUrl);
//   }
// };

// export { changePasswordAction };
