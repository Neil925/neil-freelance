import { SessionWithUser } from "@/types/prisma";

let status = "pending";
let result: SessionWithUser;

const suspender = fetch("./api/auth")
  .then((res) => res.json())
  .then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    },
  ).catch((e) => {
    status = "error";
    result = e;
  });
export function readSession() {
  if (status === "pending") throw suspender;
  if (status === "error") throw result;
  return result;
}
