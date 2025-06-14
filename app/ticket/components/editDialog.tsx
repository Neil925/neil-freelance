import Dialog from "@/app/components/dialog";
import { Ticket } from "@prisma/client";
import { RefObject } from "react";

export default function EditDialog(
  props: { modalRef: RefObject<HTMLDialogElement | null>; ticket: Ticket },
) {
  const submitUpdate = (formData: FormData) => {
  };

  return (
    <Dialog modalRef={props.modalRef}>
      <form action={submitUpdate}>
        <div className="space-y-5">
          <h1 className="text-5xl font-bold">Edit Ticket</h1>
          <p>
            Give me some details on the job and I will reach out to you as soon
            as I am available!
          </p>
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-bold">Name</label>
          <input
            defaultValue={props.ticket.name}
            className="border-1 rounded-sm bg-white p-[3px]"
            type="text"
            name="name"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-bold">Email</label>
          <input
            defaultValue={props.ticket.email}
            className="border-1 rounded-sm bg-white p-[3px]"
            type="email"
            name="email"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-bold">Phone</label>
          <input
            defaultValue={props.ticket.phone}
            className="border-1 rounded-sm bg-white p-[3px]"
            type="text"
            name="phone"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-bold">Job Type</label>
          <select
            defaultValue={props.ticket.jobType}
            className="border-1 rounded-sm bg-white p-[3px]"
            name="job-type"
            id="job-type"
            required
          >
            <option value="" disabled>--</option>
            <option value={"ITSupport"}>IT Support</option>
            <option value={"WebDevelopment"}>Web Development</option>
            <option value={"SoftwareDevelopment"}>Software Development</option>
            <option value={"Other"}>Other</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-bold">Description</label>
          <textarea
            defaultValue={props.ticket.description}
            className="border-1 rounded-sm bg-white h-24 p-[3px]"
            name="description"
            required
          />
        </div>

        <div className="w-full flex justify-end ">
          <button className="w-fit p-2 border-1 bg-primary rounded text-lg font-bold cursor-pointer">
            Submit Ticket
          </button>
        </div>
      </form>
    </Dialog>
  );
}
