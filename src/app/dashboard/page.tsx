'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import SignOutBtn from '@/components/sign-out'

export default function DashboardPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/sign-in')
        }
    }, [status, router])

    return (
        <div>
            <h2>Bienvenue dans l'espace client</h2>
            <div>
                <p>Bonjour {session?.user?.name}</p>
                <p>{session?.user?.email}</p>
            </div>
            <SignOutBtn />
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