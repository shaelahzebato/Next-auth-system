"use client"
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import AdminPage from "./admin/page";
import DashboardPage from "./dashboard/page";
import { auth } from "@/lib/auth";

export default function Home() {

    const { data: session } = useSession()
    // const session = await auth();

    return (
        <main className="max-w-2xl mx-auto min-h-screen flex items-center justify-center">
            <Card className="p-6">
                {session?.user?.role === "ADMIN" ? <AdminPage /> : <DashboardPage />}
            </Card>
        </main>
    );
}


{/*
import { Github } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { Globe } from "lucide-react";
<Github size={24} color="black" />;
<FaGithub size={24} color="black" />;
<FaGoogle size={24} color="#4285F4" />;
<Globe size={24} color="#4285F4" />; */}