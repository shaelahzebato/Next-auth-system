import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Email et mot de passe requis !" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
                return NextResponse.json({ error: "Email déjà utilisé !" }, { status: 400 });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await prisma.user.create({
                data: { name, email, password: hashedPassword, role: "CLIENT" },
            });

        return NextResponse.json(newUser, { status: 201 });
    } 
    catch (error) {
        console.error("Erreur inscription :", error);
        return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
    }
}
    // import { NextResponse } from "next/server";
    // import { PrismaClient } from "@prisma/client";
    // import bcrypt from "bcryptjs";
    
    // const prisma = new PrismaClient();
    
    // export async function POST(request: Request) {
    //     try {
    //         const body = await request.json();
    //         const { name, email, password } = body;
    
    //         if (!name || !email || !password) {
    //             return NextResponse.json({ message: "Champs manquants" }, { status: 400 });
    //         }
    
    //         const hashedPassword = await bcrypt.hash(password, 10);
    
    //         const user = await prisma.user.create({
    //             data: {
    //                 name,
    //                 email,
    //                 password: hashedPassword,
    //                 role: "CLIENT",
    //             },
    //         });
    
    //         return NextResponse.json(user, { status: 201 });
    //     } catch (error) {
    //         console.error("Erreur inscription :", error);
    //         return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    //     }
    // }
// }