// lib/emails/send-welcome-email.ts
import { resend } from "../resend";

export async function sendWelcomeEmail(to: string, name: string) {
    try {
        const data = await resend.emails.send({
            from: "Dya <onboarding@ton-domaine.resend.dev>", // ou le domaine personnalisé
            to: [to],
            subject: "Bienvenue sur notre plateforme 🎉",
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2>Salut ${name || "👋"} !</h2>
                    <p>Merci de t’être inscrit(e) sur notre application.</p>
                    <p>On est ravi de t’avoir avec nous. ❤️</p>
                </div>
            `,
        });

        return data;
    } catch (error) {
        console.error("Erreur d'envoi d'e-mail", error);
        throw error;
    }
}
