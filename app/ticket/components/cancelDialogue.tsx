import { Ticket } from "@prisma/client";
import { cancelTicket } from "../actions";
import { EventHandler, MouseEventHandler, RefObject } from "react";
import Dialog from "@/app/components/dialog";

export default function CancelDialogue(
  props: { modalRef: RefObject<HTMLDialogElement | null>; ticket: Ticket },
) {
  const hideModal = () => {
    props.modalRef.current?.close();
  };

  const submit = () => {
    cancelTicket(props.ticket);
    hideModal();
  };

  return (
    <Dialog modalRef={props.modalRef}>
      <h2 className="font-bold text-3xl mb-4">
        Are you sure you want to cancel your ticket?
      </h2>
      <div className="space-x-4 text-xl">
        <button
          onClick={submit}
          className="p-2 font-bold rounded-lg bg-primary cursor-pointer w-16"
        >
          Yes
        </button>
        <button
          onClick={hideModal}
          className="p-2 font-bold rounded-lg bg-primary cursor-pointer w-16"
        >
          No
        </button>
      </div>
    </Dialog>
  );
}
