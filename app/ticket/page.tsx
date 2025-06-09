import TicketForm from "./components/ticketForm";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Edit, Trash2 } from "@deemlol/next-icons";

export default async function Ticket() {
  const session = await auth(true, true);

  if (!session) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center space-y-3 text-xl">
        <h1 className="font-bold text-red-700 text-7xl">Warning</h1>
        <p className="">
          No session data found. Please reload or reach out to me directly.
        </p>
        <a href="/">
          <button className="p-2 bg-primary rounded-md cursor-pointer">
            <b>Go Back</b>
          </button>
        </a>
      </div>
    );
  }

  const tickets = await prisma.ticket.findMany({
    where: { sessionId: session.sessionId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      <TicketForm />
      <div className="w-full lg:w-2/3 flex flex-col p-2">
        <h2 className="font-bold text-2xl md:text-4xl">
          Tickets
        </h2>
        <table className="bg-primary border-collapse rounded-md drop-shadow-black drop-shadow-sm">
          <thead className="font-bold">
            <tr className="border-b-2 border-black rounded-t-md">
              <td className="border-r-2 border-black p-2 rounded-tl-md">ID</td>
              <td className="border-r-2 border-black p-2">Name</td>
              <td className="border-r-2 border-black p-2">Email</td>
              <td className="border-r-2 border-black p-2">Phone</td>
              <td className="border-r-2 border-black p-2">Job Type</td>
              <td className="border-r-2 border-black p-2">Description</td>
              <td className="border-r-2 border-black p-2">Created At</td>
              <td className="border-r-2 border-black p-2">Status</td>
              <td className="p-2">Actions</td>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-t-2 border-black">
                <td className="border-r-2 border-black p-2">{ticket.id}</td>
                <td className="border-r-2 border-black p-2">{ticket.name}</td>
                <td className="border-r-2 border-black p-2">{ticket.email}</td>
                <td className="border-r-2 border-black p-2">{ticket.phone}</td>
                <td className="border-r-2 border-black p-2">
                  {ticket.jobType}
                </td>
                <td className="border-r-2 border-black p-2">
                  {ticket.description}
                </td>
                <td className="border-r-2 border-black p-2">
                  {ticket.createdAt.toLocaleDateString()}
                </td>
                <td className="border-r-2 border-black p-2">
                  {/* {ticket.status} */}
                </td>
                <td className="p-2 flex space-x-2 justify-center font-bold">
                  <button className="cursor-pointer font-bold">
                    <Edit />
                  </button>
                  <button>
                    <Trash2 className="cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
