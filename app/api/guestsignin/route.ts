import { signIn } from "@/lib/auth";
import logger from "@/utils/logger";
import { redirect } from "next/navigation";

export async function GET() {
  logger.info("New user signng in.");
  await signIn("credentials", {});
  redirect("ticket");
}
