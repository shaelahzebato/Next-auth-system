"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button"
import { FaGoogle } from "react-icons/fa"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleSignIn() {
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
        <Button onClick={() => signIn("google")} className="cursor-pointer">
            <FaGoogle size={24} color="#D3D3D3" />
            Continuer avec Google
        </Button>
    );
}