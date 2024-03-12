import config from '@/config';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          console.log(config.api_base_url);
          const response = await fetch(
            `${config.api_base_url}/auth/web/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );
          if (response.ok) {
            const result = await response.json();
            console.log({ credentials });
            return result.data;
          }
          return null;
        } catch (error) {
          console.log({ error });
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, profile, isNewUser, session }) {
      if (user) {
        token.accessToken = user.access_token;
        token.name = user.name;
        token.email = user.email;
        token.userId = user.id;
        token.role = user.role;
        token.subscription = user.subscription;
        // token.id = profile.id;
      }
      if (trigger === 'update') {
        token.subscription = session.user.subscription;
        return token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      //   console.log({ token });
      if (token) {
        session.user = token;
        // session.user.id = token.id;
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
