import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "./db"
import prisma from "@/lib/prisma"

export const { 
 handlers,
 signIn, 
 signOut, 
 auth 
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
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



//  import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"
// import Google from "next-auth/providers/google"
// import Credentials from "next-auth/providers/credentials"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
// import bcrypt from "bcryptjs"

// const prisma = new PrismaClient()

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   session: { strategy: "jwt" }, // Required to support Credentials alongside OAuth
//   providers: [
//     Google,
//     GitHub,
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null

//         // Find the user in the database
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email as string }
//         })

//         // Ensure user exists and has a password (prevents OAuth users from bypassing via blank password)
//         if (!user || !user.passwordHash) return null

//         // Verify password
//         const isValid = await bcrypt.compare(credentials.password as string, user.passwordHash)
        
//         if (!isValid) return null

//         return { id: user.id, name: user.username, email: user.email }
//       }
//     })
//   ]
// })



















