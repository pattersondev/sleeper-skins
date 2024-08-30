import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        // async signIn({ user, account, profile }) {
        //     if (user.email) {
        //         // Call your API to create or update the user account
        //         const response = await fetch('YOUR_API_ENDPOINT', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({ email: user.email }),
        //         });

        //         if (!response.ok) {
        //             console.error('Failed to create/update user account');
        //             return false; // Optionally prevent sign in if API call fails
        //         }
        //     }
        //     return true;
        // },
        async session({ session, token }) {
            if (session.user) {
                console.log("User signed in with email:", session.user.email);
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
