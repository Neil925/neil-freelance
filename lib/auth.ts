import bcrypt from "bcryptjs";
import {
  createSession,
  generateSessionToken,
  invalidateSession,
  validateSession,
} from "./session";
import prisma from "./prisma";

import {
  deleteSessionTokenCookie,
  getSessionTokenFromCookie as getTokenFromCookie,
  setSessionTokenCookie,
} from "./cookies";
import { SessionWithUser } from "@/types/prisma";

export const auth = async (
  canWriteCookie?: boolean,
): Promise<SessionWithUser | null> => {
  const cookieToken = await getTokenFromCookie();

  if (!cookieToken && !canWriteCookie) {
    return null;
  } else if (!cookieToken) {
    const { token, session } = await signin();
    await setSessionTokenCookie(token, session.expires);
    return session;
  }

  const session = await validateSession(cookieToken);

  if (!session) {
    return null;
  }

  if (canWriteCookie) {
    await setSessionTokenCookie(cookieToken, session.expires);
  }

  return session;
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
