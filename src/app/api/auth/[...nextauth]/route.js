
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
// import JWT from 'jsonwebtoken'

export const nextOption = {

    pages: {
        signIn: '/login',
        // error: '/login'
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



                // const res = await fetch('http://localhost:5000/login', {
                //     method: 'POST',
                //     headers: {
                //         'Content-type': 'application/json'
                //     },
                //     body: JSON.stringify({ email, password })
                // })
                // const { data } = await res.json()
                // console.log('d', data)
                const data = { name: 'habibur rahman', email: 'va.habibur@gmail.com', image: 'https://www.youtube.com/', password: '1234' }

                const isMatch = email === data.email;
                console.log(isMatch)


                if (isMatch) {
                    console.log(data)
                    return data
                }
                return null

            }



        })
    ],

    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 1 * 60,
    },
    jwt: {
        maxAge: 1 * 60,

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