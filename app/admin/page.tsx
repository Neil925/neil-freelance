import React from "react";
import { Edit, Trash2 } from "@deemlol/next-icons";
import { prisma } from "@/lib/prisma";

export default async function Admin() {
  const tickets = await prisma.tickets.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl md:text-5xl w-full text-center font-bold p-2">
        Admin Panel
      </h1>
      <div className="w-full flex justify-center flex-col items-center">
        <h2 className="text-left font-bold text-2xl md:text-4xl w-2/3">
          Tickets
        </h2>
        <table className="bg-[#0000007a] border-collapse w-2/3 rounded-xl">
          <thead>
            <tr className="border-b-4 border-black rounded-t-xl">
              <td className="border-r-4  border-black p-2 rounded-tl-xl">ID</td>
              <td className="border-r-4  border-black p-2">Name</td>
              <td className="border-r-4  border-black p-2">Email</td>
              <td className="border-r-4  border-black p-2">Phone</td>
              <td className="border-r-4  border-black p-2">Job Type</td>
              <td className="border-r-4  border-black  p-2">Description</td>
              <td className="border-r-4  border-black  p-2">Created At</td>
              <td className="border-r-4  border-black p-2">Status</td>
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
                  {ticket.job_type}
                </td>
                <td className="border-r-2 border-black p-2">
                  {ticket.description}
                </td>
                <td className="border-r-2 border-black p-2">
                  {ticket.created_at.toLocaleDateString()}
                </td>
                <td className="border-r-2 border-black p-2">
                  {ticket.status}
                </td>
                <td className="p-2 flex space-x-2 justify-center">
                  <button className="cursor-pointer">
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
