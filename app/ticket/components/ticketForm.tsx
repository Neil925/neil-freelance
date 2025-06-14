"use client";
import { useState } from "react";
import { submitForm } from "../actions";
import { useSearchParams } from "next/navigation";

export default function TicketForm() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (x: FormData) => {
    const res = await submitForm(x);

    setMessage(res.message);
    setSuccess(res.success);

    if (res.success) {
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <form
      className="lg:w-1/3 w-full flex flex-col bg-primary lg:bg-primary-tr p-2 space-y-5 h-full"
      action={handleSubmit}
    >
      {message !== "" &&
        (
          <p
            className={`${success ? "text-green-700" : "text-red-700"
              } font-bold text-center text-2xl`}
          >
            {success ? "" : "Error: "}
            {message}
          </p>
        )}

      <div className="space-y-5">
        <h1 className="text-5xl font-bold">Submit a Ticket</h1>
        <p>
          Give me some details on the job and I will reach out to you as soon as
          I am available!
        </p>
      </div>

      <div className="flex flex-col">
        <label className="text-lg font-bold">Name</label>
        <input
          className="border-1 rounded-sm bg-white p-[3px]"
          type="text"
          name="name"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-lg font-bold">Email</label>
        <input
          className="border-1 rounded-sm bg-white p-[3px]"
          type="email"
          name="email"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-lg font-bold">Phone</label>
        <input
          className="border-1 rounded-sm bg-white p-[3px]"
          type="text"
          name="phone"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-lg font-bold">Job Type</label>
        <select
          className="border-1 rounded-sm bg-white p-[3px]"
          name="job-type"
          id="job-type"
          defaultValue={searchParams.get("job-type") ?? ""}
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
  );
}
