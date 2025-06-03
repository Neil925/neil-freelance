import { auth } from "@/lib/auth";
import { SessionWithUser } from "@/types/prisma";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [session, setSession] = useState<SessionWithUser | null>(null);

  const auth = async () => {
    const res = await fetch("./api/auth");
    setSession(await res.json());
  };

  useEffect(() => {
    auth();
  }, []);

  return session;
}
