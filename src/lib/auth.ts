import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },   
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Mot de passe", type: "password" },
            },
            authorize: async ( credentials: Partial<Record<"email" | "password", unknown>>,req: Request) => 
            {
                if (!credentials || typeof credentials.email !== "string" || typeof credentials.password !== "string") {
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
                    role: user.role ?? "CLIENT",
                };
            },
        }),        
        // pages: {
        //     signOut: "/sign-in", // Redirection par défaut après déconnexion
        // },   
    ],
    callbacks: {
        // Ajoute les données du user au JWT
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = (user as any).role;
            }
            return token;
        },

        // Injecte les infos dans la session côté client
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    trustHost: true,
}satisfies NextAuthConfig) 


/*authorize: async (credentials) => {
    if (!credentials?.email || !credentials?.password) {
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
}*/