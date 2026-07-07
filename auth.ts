import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [Google],
  session: { strategy: 'jwt' },
  callbacks: {
    // Persist a stable user id on the token at sign-in time
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    // Expose the id to the session so server code can authorize by owner
    async session({ session, token }) {
      if (session.user && token.uid) {
        session.user.id = token.uid as string;
      }
      return session;
    },
  },
});
