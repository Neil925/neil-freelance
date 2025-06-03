import { Prisma } from "@prisma/client";

export type SessionWithUser = Prisma.SessionGetPayload<{
  include: { user: true };
}>;
