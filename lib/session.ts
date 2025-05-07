import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import prisma from "./prisma";

const expiary = 30;
const inDays = (days: number) =>
  new Date(Date.now() * 1000 * 60 * 60 * 24 * days);
const encodeToken = (token: string) =>
  encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

export const generateSessionToken = () => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
};

export const createSession = async (token: string, userId?: number) => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session = await prisma.sessions.create({
    data: {
      session_id: sessionId,
      user_id: userId,
      expires: inDays(expiary),
    },
  });

  return session;
};

export const validateSession = async (token: string) => {
  const sessionId = encodeToken(token);

  let session = await prisma.sessions.findUnique({
    where: { session_id: sessionId },
  });

  if (!session || !session.expires) {
    throw new Error("No session found.");
  }

  if (session.expires && session?.expires >= inDays(expiary)) {
    await prisma.sessions.delete({ where: { session_id: sessionId } });
    return null;
  }

  session = await prisma.sessions.update({
    where: { session_id: sessionId },
    data: { expires: inDays(expiary) },
  });

  let user;

  if (session.user_id) {
    user = await prisma.users.findUnique({ where: { id: session.user_id } });
  }

  return { session, user };
};

export const invalidateSession = async (token: string) => {
  const sessionId = encodeToken(token);
  await prisma.sessions.delete({ where: { session_id: sessionId } });
};

export const invalidateAllSessions = async (userId: number) => {
  await prisma.sessions.deleteMany({ where: { user_id: userId } });
};
