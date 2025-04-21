import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";
import logger from "@/utils/logger";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string | null;
  }
}

export const { signIn, signOut, handlers, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.username || !credentials.password) {
          logger.info(
            { user: "Guest", action: "creation" },
            "New guest account being created.",
          );
          return { id: "TestID", name: "Test Name", role: "Test role" };
        }

        if (
          typeof credentials.username !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Invalid password or email.");
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user || !user.password) {
          throw new Error("No user found.");
        }

        const isValid = compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid user or password.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (token) {
        token.role = user?.role;
      }
      return token;
    },
    session({ session, user }) {
      logger.debug("Session is: ");
      logger.debug(session);
      if (session.user) {
        session.user.role = user?.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
