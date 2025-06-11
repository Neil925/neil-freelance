import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await auth(true);
  const url = req.nextUrl;
  const originalRoute = url.searchParams.get("returnto");
  redirect(originalRoute ?? url.basePath);
}
