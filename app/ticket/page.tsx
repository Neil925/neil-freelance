"use server";
import TicketForm from "./components/ticketForm";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { auth } from "@/lib/auth";
import TicketTable from "./components/ticketTable";
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

  const getStatusColor = (ticket: Ticket) => {
    switch (ticket.status) {
      case "Sent":
        return "blue-300";
      case "Contacted":
        return "yellow-600";
      case "Accepted":
        return "green-400";
      case "Completed":
        return "green-600";
      case "Cancelled":
      case "Rejected":
        return "red-500";
      default:
        return "white";
    }
  };

  const data = tickets.map((x) => (
    {
      id: x.id,
      jobType: x.jobType,
      createdAt: x.createdAt.toLocaleDateString(),
      description: x.description,
      status: (
        <div
          className={`p-2 rounded-lg bg-${getStatusColor(x)} font-bold w-fit`}
        >
          {x.status}
        </div>
      ),
    }
  ));

  const fieldHeaders = [
    "ID",
    "Job Type",
    "Created At",
    "Description",
    "Status",
    "Actions",
  ];

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      <TicketForm />
      <TicketTable data={data} fieldHeaders={fieldHeaders} />
    </div>
  );
}
