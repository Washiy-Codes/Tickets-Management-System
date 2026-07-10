// next-auth.d.ts or types/auth.d.ts
import "@auth/core/types";

declare module "@auth/core/types" {
  interface User {
    emailVerified?: Date | null;
    username?: string;
  }

  interface Session {
    user: {
      id: string;
      emailVerified?: Date | null;
      username?: string;
    } & import("@auth/core/types").DefaultSession["user"];
  }
}
