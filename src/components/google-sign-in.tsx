"use client"

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import { FaGoogle } from "react-icons/fa"

 
export default function GoogleSignIn() {
    return <Button onClick={() => signIn("google")} className="cursor-pointer">
        <FaGoogle size={24} color="#D3D3D3" />
        Continuer avec Google
    </Button>
}