import { readSession } from "@/app/resources/authResource";

export default function useAuth() {
  return readSession();
}
