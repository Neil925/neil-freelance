"use client";
import { Table } from "@/app/components/table";
import { Edit, Slash } from "@deemlol/next-icons";
import CancelDialogue from "./cancelDialogue";
import { useRef, useState } from "react";
import { Ticket } from "@prisma/client";
import EditDialog from "./editDialog";

interface TicketTableProps {
  data: any[];
  fieldHeaders: string[];
}

export default function TicketTable(props: TicketTableProps) {
  const [ticket, setTicket] = useState<Ticket>({} as Ticket);
  const cancelModalRef = useRef<HTMLDialogElement>(null);
  const editModalRef = useRef<HTMLDialogElement>(null);

  const startCancelDialogue = (t: Ticket) => {
    setTicket(t);
    cancelModalRef.current?.showModal();
  };

  const startEditDialog = (t: Ticket) => {
    setTicket(t);
    editModalRef.current?.showModal();
  };

  const data = props.data.map((x) => ({
    ...x,
    actions: (
      <div className="space-x-4">
        <button
          className="cursor-pointer font-bold"
          onClick={() => startEditDialog(x)}
        >
          <Edit />
        </button>
        <button
          className="cursor-pointer font-bold"
          onClick={() => startCancelDialogue(x)}
        >
          <Slash />
        </button>
      </div>
    ),
  }));

  return (
    <div className="w-full lg:w-2/3 flex flex-col p-2">
      <CancelDialogue
        ticket={ticket}
        modalRef={cancelModalRef}
      />
      <EditDialog
        ticket={ticket}
        modalRef={editModalRef}
      />
      <div className="md:w-[80%] w-full mx-auto">
        <h2 className="font-bold text-2xl md:text-4xl mb-2">
          Previous Tickets
        </h2>
        <Table
          data={data}
          fieldHeaders={props.fieldHeaders}
          headerColor="bg-primary"
          primaryColor="bg-gray-100"
          secondaryColor="bg-gray-300"
          minLength={10}
        />
      </div>
    </div>
  );
}
