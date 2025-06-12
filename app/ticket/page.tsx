import TicketForm from "./components/ticketForm";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Edit, Trash2 } from "@deemlol/next-icons";
import Link from "next/link";
import { Ticket } from "@prisma/client";

export default async function TicketPage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center space-y-3 text-xl">
        <h1 className="font-bold text-red-700 text-7xl">Warning</h1>
        <p className="">
          No session data found. Please reload or reach out to me directly.
        </p>
        <Link href="/">
          <button className="p-2 bg-primary rounded-md cursor-pointer">
            <b>Go Back</b>
          </button>
        </Link>
      </div>
    );
  }

  const tickets = await prisma.ticket.findMany({
    where: { sessionId: session.sessionId },
    orderBy: { createdAt: "desc" },
  });

  const moreNeeded = 10 - tickets.length;
  for (let i = 0; i < moreNeeded; i++) {
    tickets.push({} as Ticket);
  }

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      <TicketForm />
      <div className="w-full lg:w-2/3 flex flex-col p-2">
        <div className="md:w-[80%] w-full mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl">
            Tickets
          </h2>
        </div>
      </div>
    </div>
  );
}
