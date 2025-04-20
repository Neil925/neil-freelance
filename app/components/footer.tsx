"use client";

import { Mail, Smartphone } from "@deemlol/next-icons";
import React, { useRef } from "react";

export default function Footer() {
  const emailRef: React.RefObject<HTMLDivElement | null> = useRef(null);
  const numRef: React.RefObject<HTMLDivElement | null> = useRef(null);

  const copyNumber = async () => {
    await navigator.clipboard.writeText("4073645700");

    const el = numRef.current;

    if (!el) {
      return;
    }

    el.classList.remove("text-blue-800");
    el.classList.add("text-green-700");

    setTimeout(() => {
      el.classList.remove("text-green-700");
      el.classList.add("text-blue-800");
    }, 1000);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("elkadineil@gmail.com");

    const el = emailRef.current;

    if (!el) {
      return;
    }

    el.classList.remove("text-blue-800");
    el.classList.add("text-green-700");

    setTimeout(() => {
      el.classList.remove("text-green-700");
      el.classList.add("text-blue-800");
    }, 1000);
  };

  return (
    <footer className="w-full text-center flex flex-col items-center justify-center space-y-7 p-5 bg-primary">
      <h2 className="lg:text-5xl text-4xl font-bold ">
        Contact Me Directly
      </h2>
      <p className="opacity-80 lg:text-xl text-md">
        If you are in a rush or just can’t submit a ticket, feel free to reach
        me through these means
      </p>
      <div className="flex w-full items-center justify-center flex-col text-xl">
        <div
          className="flex items-center space-x-1 hover:scale-110 duration-300 cursor-pointer text-blue-800 active:scale-90"
          onClick={copyNumber}
          ref={numRef}
        >
          <Smartphone size={24} />
          <span>(407) 364-5700</span>
        </div>
        <div
          className="flex items-center space-x-1 hover:scale-110 duration-300 cursor-pointer text-blue-800 active:scale-90"
          onClick={copyEmail}
          ref={emailRef}
        >
          <Mail size={24} />
          <span>elkadineil@gmail.com</span>
        </div>
      </div>
    </footer>
  );
}
