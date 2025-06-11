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
        <div className="w-[80%] mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl">
            Tickets
          </h2>
          <div className="rounded-md overflow-auto drop-shadow-sm drop-shadow-black">
            <table className="w-full table-auto">
              <thead className="bg-primary font-bold border-b-3 border-b-gray-300">
                <tr className="">
                  <td className="p-2 rounded-md">ID</td>
                  <td className="p-2 rounded-md">Name</td>
                  <td className="p-2 rounded-md">Email</td>
                  <td className="p-2 rounded-md">Phone</td>
                  <td className="p-2 rounded-md">Job Type</td>
                  <td className="p-2 rounded-md">Description</td>
                  <td className="p-2 rounded-md">Created At</td>
                  <td className="p-2 rounded-md">Status</td>
                  <td className="p-2 rounded-md">Actions</td>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, key) => (
                  <tr
                    key={key}
                    className={`p-2 h-12 ${(key % 2 == 1
                      ? "bg-gray-300"
                      : "bg-gray-100")}`}
                  >
                    <td className="p-2">{ticket.id}</td>
                    <td className="p-2">{ticket.name}</td>
                    <td className="p-2">{ticket.email}</td>
                    <td className="p-2">{ticket.phone}</td>
                    <td className="p-2">{ticket.jobType}</td>
                    <td className="p-2">{ticket.description}</td>
                    <td className="p-2">
                      {ticket.createdAt?.toLocaleDateString()}
                    </td>
                    <td className="p-2">{/* {ticket.status} */}</td>
                    <td className="">
                      {ticket.id &&
                        (
                          <div className="p-2 flex justify-around w-full">
                            <button className="cursor-pointer font-bold">
                              <Edit />
                            </button>
                            <button>
                              <Trash2 className="cursor-pointer" />
                            </button>
                          </div>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
