import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function GET() {
  await signIn("credentials", {});
  redirect("ticket");
}
