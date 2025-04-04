import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth";
import { compare } from 'bcryptjs';
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
 
const prisma = new PrismaClient()
 
 
export const { handlers, auth, signIn, signOut } = NextAuth({
     adapter: PrismaAdapter(prisma),
     session: {
         strategy: "jwt",
     },
     providers: [
         GitHub({
             clientId: process.env.AUTH_GITHUB_ID,
             clientSecret: process.env.AUTH_GITHUB_SECRET
         }),
         Google({
             clientId: process.env.AUTH_GOOGLE_ID,
             clientSecret: process.env.AUTH_GOOGLE_SECRET
         }),
         Credentials({
             credentials: {
                 email: { label: "Email", type: "text", required: true },
                 password: { label: "Mot de passe", type: "password", required: true },
             },
             authorize: async (
                 credentials: Partial<Record<"email" | "password", unknown>>,
                     req: Request
                 ) => {
                 if (
                     !credentials ||
                     typeof credentials.email !== "string" ||
                     typeof credentials.password !== "string"
                 ) {
                     throw new Error("Email et mot de passe requis");
                 }
               
                 const user = await prisma.user.findUnique({
                      where: { email: credentials.email },
                 });
               
                 if (!user || !user.password) {
                     throw new Error("Utilisateur non trouvé");
                 }
               
                 const isValidPassword = await compare(credentials.password, user.password);
                 if (!isValidPassword) {
                     throw new Error("Mot de passe incorrect");
                 }
               
                 return {
                     id: user.id,
                     name: user.name,
                     email: user.email,
                     role: user.role, // s’il est bien défini dans ton modèle Prisma
                 };
             }              
         })
     ],
     trustHost: true,
}satisfies NextAuthConfig)


// import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"
// import Google from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
// import bcrypt from "bcryptjs"

// const prisma = new PrismaClient()

// export const { handlers, auth, signIn, signOut } = NextAuth({
//     adapter: PrismaAdapter(prisma),
//     session: { strategy: "jwt" },
//     providers: [
//         GitHub({
//             clientId: process.env.AUTH_GITHUB_ID,
//             clientSecret: process.env.AUTH_GITHUB_SECRET
//         }),
//         Google({
//             clientId: process.env.AUTH_GOOGLE_ID,
//             clientSecret: process.env.AUTH_GOOGLE_SECRET
//         }),
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Mot de passe", type: "password" },
//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) {
//                     throw new Error("Email et mot de passe requis")
//                 }

//                 const user = await prisma.user.findUnique({
//                     where: { email: credentials.email },
//                 })

//                 if (!user || !user.password) {
//                     throw new Error("Utilisateur non trouvé")
//                 }

//                 const isValidPassword = await bcrypt.compare(credentials.password, user.password)
//                 if (!isValidPassword) {
//                     throw new Error("Mot de passe incorrect")
//                 }

//                 return { id: user.id, name: user.name, email: user.email, role: user.role }
//             },
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) token.role = user.role
//             return token
//         },
//         async session({ session, token }) {
//             if (session.user) session.user.role = token.role
//             return session
//         },
//     },
// })



// bold, winstar

/**
 * import NextAuth from "next-auth"
 import Credentials from "next-auth/providers/credentials"
 import GitHub from "next-auth/providers/github"
 import Google from "next-auth/providers/google"
 import type { NextAuthConfig } from "next-auth";
 import { compare } from 'bcryptjs';
 import { PrismaAdapter } from "@auth/prisma-adapter"
 import { PrismaClient } from "@prisma/client"
 
 const prisma = new PrismaClient()
 
 
 export const { handlers, auth, signIn, signOut } = NextAuth({
     adapter: PrismaAdapter(prisma),
     session: {
         strategy: "jwt",
     },
     providers: [
         GitHub({
             clientId: process.env.AUTH_GITHUB_ID,
             clientSecret: process.env.AUTH_GITHUB_SECRET
         }),
         Google({
             clientId: process.env.AUTH_GOOGLE_ID,
             clientSecret: process.env.AUTH_GOOGLE_SECRET
         }),
         Credentials({
             credentials: {
                 email: { label: "Email", type: "text", required: true },
                 password: { label: "Mot de passe", type: "password", required: true },
             },
             authorize: async (
                 credentials: Partial<Record<"email" | "password", unknown>>,
                     req: Request
                 ) => {
                 if (
                     !credentials ||
                     typeof credentials.email !== "string" ||
                     typeof credentials.password !== "string"
                 ) {
                     throw new Error("Email et mot de passe requis");
                 }
               
                 const user = await prisma.user.findUnique({
                      where: { email: credentials.email },
                 });
               
                 if (!user || !user.password) {
                     throw new Error("Utilisateur non trouvé");
                 }
               
                 const isValidPassword = await compare(credentials.password, user.password);
                 if (!isValidPassword) {
                     throw new Error("Mot de passe incorrect");
                 }
               
                 return {
                     id: user.id,
                     name: user.name,
                     email: user.email,
                     role: user.role, // s’il est bien défini dans ton modèle Prisma
                 };
             }              
         })
     ],
     trustHost: true,
 }satisfies NextAuthConfig)
 */