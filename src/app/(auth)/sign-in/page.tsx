"use client";

import GithubSignIn from '@/components/github-sign-in'; 
import GoogleSignIn from '@/components/google-sign-in';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

function SignInPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Email ou mot de passe incorrect");
        } else if (result?.ok) {
            // Obtenir les infos de session pour connaître le rôle
            const sessionRes = await fetch("/api/auth/session");
            const session = await sessionRes.json();
          
            if (session?.user?.role === "admin") {
                window.location.href = "/admin";
            } else {
                window.location.href = "/dashboard";
            }
        }

        setLoading(false);
    };

    return (
        <section className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm mx-auto space-y-6 bg-white p-10">
                <h1 className="text-2xl font-black text-center mb-6">Se connecter</h1>
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
                    <Input type="text" placeholder='Email' name="email" id='credentials-email' required autoComplete="email" />
                    <Input type="password" placeholder='Mot de passe' name="password" id="credentials-password" required autoComplete="current-password" />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button className='w-full cursor-pointer' type='submit' disabled={loading}>
                        {loading ? "Connexion..." : "Se connecter"}
                    </Button>
                </form>
                <div className="text-center">
                    <Button asChild variant="link">
                        <a href="/sign-up">Vous n'avez pas encore de compte ? S'inscrire</a>
                    </Button>
                </div>
            </Card>
        </section>
    );
}

export default SignInPage;