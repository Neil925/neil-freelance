import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import prisma from "./prisma";

const expiary = 30;
const inDays = (days: number) =>
  new Date(Date.now() + (1000 * 60 * 60 * 24 * days));
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

  const exp = inDays(expiary);
  console.log(exp);

  const session = await prisma.session.create({
    data: {
      sessionId: sessionId,
      userId: userId ?? null,
      expires: exp,
    },
    include: { user: true },
  });

  return session;
};

export const validateSession = async (token: string) => {
  const sessionId = encodeToken(token);

  let session = await prisma.session.findUnique({
    where: { sessionId: sessionId },
    include: { user: true },
  });

  if (!session || !session.expires) {
    throw new Error("No session found.");
  }

  if (session.expires && session?.expires >= inDays(expiary)) {
    await prisma.session.delete({ where: { sessionId: sessionId } });
    return null;
  }

  session = await prisma.session.update({
    where: { sessionId: sessionId },
    data: { expires: inDays(expiary) },
    include: { user: true },
  });

  return session;
};

export const invalidateSession = async (token: string) => {
  const sessionId = encodeToken(token);
  await prisma.session.delete({ where: { sessionId: sessionId } });
};

export const invalidateAllSessions = async (userId: number) => {
  await prisma.session.deleteMany({ where: { userId: userId } });
};
