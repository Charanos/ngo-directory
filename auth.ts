import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/query";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          // Request additional GitHub scopes
          scope: "read:user user:email bio",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile, user }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: profile?.id,
          name: user?.name,
          email: user?.email,
          image: user?.image,
          bio: profile?.bio || "",
          username: profile?.login,
        });
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const user = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
              id: profile.id,
            });
          // Only set the token.id if user exists
          if (user?._id) {
            token.id = user._id;
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Make sure token.id exists before assigning
      if (token?.id) {
        return {
          ...session,
          id: token.id,
        };
      }
      return session;
    },
  },
});
