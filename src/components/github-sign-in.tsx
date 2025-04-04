"use client"

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import { Github } from "lucide-react";


export default function GithubSignIn() {
    return <Button onClick={() => signIn("github")} className="cursor-pointer">
        <Github size={24} color="#D3D3D3" />
        Continuer avec Github
    </Button>
}