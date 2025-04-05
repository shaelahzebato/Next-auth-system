"use client"
import SignOutBtn from "@/components/sign-out";
import { useSession } from 'next-auth/react'
import { redirect } from "next/navigation";

export default async function AdminPage() {

    const { data: session } = useSession();

    if (!session) {
        redirect("/sign-in");
    }

    if (session.user.role !== "admin") {
        redirect("/dashboard"); // redirige un client qui tente d'accéder à /admin
    }

    return (
        <div>
            <h1>Bienvenue dans l’espace admin 👑</h1>
            <p>Bonjour {session?.user?.name}</p>
            <SignOutBtn/>
        </div>
    );
}



/*AUTRE FACONS DE FAIRE...

"use client"
import SignOutBtn from "@/components/sign-out";
import { auth } from "@/lib/auth";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
    
    // const session = await auth();
     const { data: session, status } = useSession()
        const router = useRouter()
    
        useEffect(() => {
            if (status === "unauthenticated") {
                router.push('/sign-in')
            }
        }, [status, router])
    

    if (!session || session?.user?.role !== "ADMIN") {
        return <p>Accès refusé</p>;
    }

    return <div className="">
        <h2>Bienvenue dans l'espace admin</h2>;
        <p>Bonjour {session?.user?.name}</p>
        <SignOutBtn/>
    </div>
}*/