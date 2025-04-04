import { auth } from "@/lib/auth";

export default async function AdminPage() {
    
    const session = await auth();

    if (!session || session?.user?.role !== "ADMIN") {
        return <p>Accès refusé</p>;
    }

    return <p>Bienvenue dans l'espace admin</p>;
}