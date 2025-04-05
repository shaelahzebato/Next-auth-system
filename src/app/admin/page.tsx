"use client"
import SignOutBtn from "@/components/sign-out";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
        <div className="max-w-xl mx-auto min-h-screen flex justify-center items-center">
            <Card className='w-full flex flex-col justify-center items-center'>
                <CardHeader className='w-full flex items-center justify-center'>
                    <CardTitle>Bienvenue dans l’espace admin 👑</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col space-y-2 items-center justify-center'>
                    <p>Bonjour {session?.user?.name} !</p>
                    <p>Bienvenue cher admin.</p>
                    <p>{session?.user?.email}</p>
                </CardContent>
                <CardFooter>
                    <SignOutBtn/>
                </CardFooter>
            </Card>
        </div>
    );
}



/*AUTRE FACON DE FAIRE...

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