import bcrypt from "bcryptjs";
import {
  createSession,
  generateSessionToken,
  invalidateSession,
  validateSession,
} from "./session";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import {
  deleteSessionTokenCookie,
  getSessionTokenFromCookie as getTokenFromCookie,
  setSessionTokenCookie,
} from "./cookies";
import { SessionWithUser } from "@/types/prisma";

export const auth = async (
  guest?: boolean,
): Promise<SessionWithUser | null> => {
  const token = await getTokenFromCookie();

  if (token) {
    const session = await validateSession(token);

    if (!session) {
      return null;
    }

    await setSessionTokenCookie(token, session.expires);
    return session;
  } else if (guest) {
    const { token, session } = await signin();
    await setSessionTokenCookie(token, session.expires);
    return session;
  }

  redirect("/signin");
};

export const signin = async (
  credentials?: { username: string; password: string },
) => {
  let userId;

  if (credentials) {
    const { username, password } = credentials;

    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (user == null) {
      throw new Error("Wrong username or password");
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new Error("Wrong username or password");
    }

    userId = user.id;
  }

  const token = generateSessionToken();
  const session = await createSession(token, userId);

  return { session, token };
};

export const signout = async () => {
  const token = await getTokenFromCookie();

  if (token) {
    invalidateSession(token);
  }

  deleteSessionTokenCookie();
};
