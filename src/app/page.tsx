import GithubSignIn from "@/components/github-sign-in";
import GoogleSignIn from "@/components/google-sign-in";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { Globe } from "lucide-react";

export default function Home() {
    return (
        <main className="max-w-2xl mx-auto min-h-screen flex items-center justify-center">
            <Card className="p-6">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum praesentium asperiores pariatur necessitatibus at. Laboriosam amet assumenda ducimus quia id dolores cum. Aut accusantium praesentium ipsum labore ut. Esse, eius.
                <GithubSignIn/>
                <GoogleSignIn/>
                {/* <Github size={24} color="black" />;
                <FaGithub size={24} color="black" />;
                <FaGoogle size={24} color="#4285F4" />;
                <Globe size={24} color="#4285F4" />; */}
            </Card>
        </main>
    );
}
