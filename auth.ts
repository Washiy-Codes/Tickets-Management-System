
import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma" 

// Fix 2: Extend the built-in NextAuth Session types so TypeScript accepts .id
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      emailVerified: Date | null; 
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const { 
 handlers,
 signIn, 
 signOut, 
 auth,
 unstable_update 
} = NextAuth({
  adapter: PrismaAdapter(prisma), // Fix 1: Replaced 'db' with 'prisma'
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
      }
       // If unstable_update was triggered, push the live value into the JWT token
      if (trigger === "update" && session?.user) {
        token.emailVerified = session.user.emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      // Fetch live state from database to ensure client is updated instantly
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { emailVerified: true },
        });

      session.user.emailVerified = dbUser?.emailVerified ?? null;
      
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.passwordHash) return null

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        )

        if (!valid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.username,
        }
      },
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
})
