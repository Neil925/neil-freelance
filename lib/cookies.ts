import { cookies } from "next/headers";

export async function setSessionTokenCookie(token: string, expireAt: Date) {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    path: "/",
    expires: expireAt,
    secure: process.env.ENVIRONMENT !== "dev",
  });
}

export async function deleteSessionTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}

export async function getSessionTokenFromCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value;
}
