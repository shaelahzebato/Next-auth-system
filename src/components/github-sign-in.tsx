"use client";

import { signIn, useSession } from "next-auth/react";
import { Github } from "lucide-react";
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GithubSignIn() {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
        const role = (session?.user as any)?.role;
        if (role === "ADMIN") {
            router.push("/admin");
        } else {
            router.push("/dashboard");
        }
        }
    }, [status, session, router]);

    return (
        <Button onClick={() => signIn("github")} className="cursor-pointer">
            <Github size={24} color="#D3D3D3" />
            Continuer avec Github
        </Button>
    )
}