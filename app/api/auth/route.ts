import { auth } from "@/lib/auth";

export async function GET() {
  const res = await auth(true);

  return Response.json(res);
}
