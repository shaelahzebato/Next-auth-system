'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import SignOutBtn from '@/components/sign-out'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/sign-in')
        }
    }, [status, router])

    return (
        <div className="max-w-xl mx-auto min-h-screen flex justify-center items-center">
            <Card className='w-full flex flex-col justify-center items-center'>
                <CardHeader className='w-full flex items-center justify-center'>
                    <CardTitle>Bienvenue dans l'espace client</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col space-y-2 items-center justify-center'>
                    <p>Bonjour {session?.user?.name} !</p>
                    <p>Bienvenue cher client.</p>
                    <p>{session?.user?.email}</p>
                </CardContent>
                <CardFooter>
                    <SignOutBtn/>
                </CardFooter>
            </Card>
        </div>
    )
}



// "use client"
// import SignOutBtn from '@/components/sign-out';
// import { useSession } from 'next-auth/react';
// // import { auth } from '@/lib/auth';
// import React from 'react'

// function DashboardPage() {

//     // const session = await auth();
//     const { data: session } = useSession();

//     return (
//         <div>
//             <h2>Bienvenue dans l'espace client</h2>
//             <div className="">
//                 <p>Bonjour {session?.user?.name}</p>
//                 <p>{session?.user?.email}</p>
//             </div>
//             <SignOutBtn/>
//         </div>
//     )
// }

// export default DashboardPage