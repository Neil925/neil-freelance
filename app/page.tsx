import Section from "@/components/section";
import placeholder from "../resources/images/placeholder.png";
import profile from "../resources/images/profile.png";
import { Mail, Smartphone } from "@deemlol/next-icons";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className="flex space-x-5 p-10">
        <div className="space-y-10 w-fit h-fit lg:text-4xl/12 text-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold">
            Neil Freelancing
          </h1>
          <p className="">
            Here for web development and general IT support.
          </p>
          <p className="">
            My full name is Neil Elkadi. I am a Software and Computing
            Technologies student at Valencia College and I’m looking to build
            some experience and make a bit of money where I can. If you’re in
            need of technological support at a reasonable price then I am your
            guy!
          </p>
          <a href="ticket">
            <button className="md:p-5 md:text-4xl p-2 text-xl bg-primary rounded-md mt-5 cursor-pointer">
              Make a Ticket
            </button>
          </a>
        </div>
        <div className="flex justify-end align-top md:w-2/5 collapse h-0 w-0 md:h-fit md:visible object-top">
          <Image
            src={profile}
            alt="profile"
            className="w-full h-fit object-contain rounded-md"
          />
        </div>
      </div>
      <Section
        title="Need IT Support?"
        img={placeholder}
        order={0}
        buttonContent="Make an IT Support Ticket"
        buttonUrl="ticket?job-type=ITSupport"
        style="bg-bg-contrast"
      >
        Building a new desktop and need help? Worried about your system being
        slow? Got hardware you can’t figure out how to get working? Any
        technological problem you can think of, just get in touch and I’ll see
        what I can do!
      </Section>
      <Section
        title="Need Website Development?"
        img={placeholder}
        order={1}
        buttonContent="Make a Web Development Ticket"
        buttonUrl="ticket?job-type=WebDevelopment"
        style="bg-none"
      >
        I’ve been making websites for fun, academics, and work for about 6 years
        now. Whether you need a large scale panel to help your business with
        automation or a simple landing page to bring customers in like the one
        you see before you, I can do it no problem.
      </Section>
      <Section
        title="Need Software Development?"
        img={placeholder}
        order={0}
        buttonContent="Make a Software Ticket"
        buttonUrl="ticket?job-type=SoftwareDevelopment"
        style="bg-bg-contrast"
      >
        {"If it's general purpose software, I've got that covered as well! Whether\
        it's a bot for you favorite platform, a script to organize some data you\
        have around, or any sort of custom software tool to make your life\
        better. I have got you!"}
      </Section>
      <Section
        title="Something else?"
        img={placeholder}
        order={1}
        buttonContent="Make a Ticket"
        buttonUrl="ticket?job-type=Other"
        style="bg-none"
      >
        Don’t worry if you’re not sure whether your problem falls in my
        knowledge area or not. Simply reach out to me describing what you need
        and I’ll do my best to get you in the right direction.
      </Section>
      <footer className="w-full text-center flex flex-col items-center justify-center space-y-7 p-5 bg-bg-contrast-primary">
        <h2 className="lg:text-5xl text-4xl font-bold ">
          Contact Me Directly
        </h2>
        <p className="opacity-80 lg:text-xl text-md">
          If you are in a rush or just can’t submit a ticket, feel free to reach
          me through these means
        </p>
        <div className="flex w-full items-center justify-center flex-col text-xl">
          <div className="flex items-center space-x-1">
            <Smartphone size={24} color="#000000" />
            <span>(407) 364-5700</span>
          </div>
          <div className="flex items-center space-x-1">
            <Mail size={24} color="#000000" />
            <span>elkadineil@gmail.com</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
