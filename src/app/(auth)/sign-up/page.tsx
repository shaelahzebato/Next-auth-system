"use client";

import GithubSignIn from '@/components/github-sign-in';
import GoogleSignIn from '@/components/google-sign-in';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

function SignUpPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log("event ::: ", event);
        
        event.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        console.log("name email password ::: ", name, email, password);
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Échec de l'inscription");

            setSuccess("Inscription réussie ! Redirection...");
            setTimeout(() => {
                window.location.href = "/sign-in"; // Redirige vers la connexion
            }, 2000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm mx-auto space-y-6 bg-white p-10">
                <h1 className="text-2xl font-black text-center mb-6">Créer un compte</h1>
                <div className="flex flex-col justify-center items-center space-y-2">
                    <GoogleSignIn />
                    <GithubSignIn />
                </div>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-background px-2 text-muted-foreground">
                            Ou continuer avec email...
                        </span>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
                    <Input type="text" placeholder='Name' name="name" required autoComplete="name" />
                    <Input type="text" placeholder='Email' name="email" required autoComplete="email" />
                    <Input type="password" placeholder='Mot de passe' name="password" required autoComplete="new-password" />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}
                    <Button className='w-full cursor-pointer' type='submit' disabled={loading}>
                        {loading ? "Inscription..." : "S'inscrire"}
                    </Button>
                </form>
                <div className="text-center">
                    <Button asChild variant="link">
                        <a href="/sign-in">Vous avez déjà un compte ? Se connecter</a>
                    </Button>
                </div>
            </Card>
        </section>
    );
}

export default SignUpPage;