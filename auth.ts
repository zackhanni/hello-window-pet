import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/",
    newUser: "/account",
  },
  callbacks: {
    async redirect({ baseUrl }) {
      // Redirect to account page after successful sign in
      return `${baseUrl}/account`;
    },
  },
});
