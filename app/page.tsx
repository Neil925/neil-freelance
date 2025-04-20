import profile from "../resources/images/profile.png";
import Image from "next/image";

import itsupport from "../resources/images/sections/itsupport.png";
import webdev from "../resources/images/sections/webdev.png";
import software from "../resources/images/sections/software.png";
import other from "../resources/images/sections/other.png";
import Section from "./components/section";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="">
      <div className="flex space-x-5 p-10">
        <div className="space-y-10 w-fit h-fit lg:text-4xl/12 text-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold">
            Neil Elkadi
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-text-dark">
            Tech Freelancing
          </h2>
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
        img={itsupport}
        order={0}
        buttonContent="Make an IT Support Ticket"
        buttonUrl="ticket?job-type=ITSupport"
        style="bg-primary-tr"
      >
        Building a new desktop and need help? Worried about your system being
        slow? Got hardware you can’t figure out how to get working? Any
        technological problem you can think of, just get in touch and I’ll see
        what I can do!
      </Section>
      <Section
        title="Need Website Development?"
        img={webdev}
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
        img={software}
        order={0}
        buttonContent="Make a Software Ticket"
        buttonUrl="ticket?job-type=SoftwareDevelopment"
        style="bg-primary-tr"
      >
        {"If it's general purpose software, I've got that covered as well! Whether\
        it's a bot for you favorite platform, a script to organize some data you\
        have around, or any sort of custom software tool to make your life\
        better. I have got you!"}
      </Section>
      <Section
        title="Something else?"
        img={other}
        order={1}
        buttonContent="Make a Ticket"
        buttonUrl="ticket?job-type=Other"
        style="bg-none"
      >
        Don’t worry if you’re not sure whether your problem falls in my
        knowledge area or not. Simply reach out to me describing what you need
        and I’ll do my best to get you in the right direction.
      </Section>
      <Footer />
    </main>
  );
}
