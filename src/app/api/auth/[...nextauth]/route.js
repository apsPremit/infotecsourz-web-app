
import { baseUrl } from "@/utils/functions/baseUrl";
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
// import JWT from 'jsonwebtoken'

export const nextOption = {

    pages: {
        signIn: '/login',
        error: '/login'
    },



    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email,', type: 'email', placeholder: 'email' },
                password: { label: 'password,', type: 'password', placeholder: 'password' }
            },

            async authorize(credentials, req) {
                const { email, password } = credentials;

                if (credentials) {

                    return {
                        name: credentials?.name,
                        email: credentials?.email,
                        image: credentials?.image
                    }
                }
                return null

            }



        })
    ],

    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    jwt: {
        maxAge: 24 * 60 * 60,

    },
    // cookies: {
    //     sessionToken: {
    //         name: `session-token`,
    //         options: {
    //             httpOnly: true,
    //             sameSite: "lax",
    //             path: "/",
    //             secure: true,
    //             maxAge: 1 * 60,
    //         },
    //     },

    //     callbackUrl: {
    //         name: `callback-url`,
    //         options: {
    //             sameSite: "lax",
    //             path: "/",
    //             secure: true,
    //             maxAge: 1 * 60,
    //         },
    //     },

    //     csrfToken: {
    //         name: `csrf-token`,
    //         options: {
    //             httpOnly: true,
    //             sameSite: "lax",
    //             path: "/",
    //             secure: true,
    //             maxAge: 1 * 60,
    //         }
    //     },
    // }





}

export const handler = NextAuth(nextOption)

export { handler as GET, handler as POST }