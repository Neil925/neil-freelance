import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

import wifi from "../resources/images/icons/wifi.png";
import code from "../resources/images/icons/code.png";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const sansMono = Noto_Sans_Mono({
  variable: "--font-sans-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neil Freelance",
  description:
    "Get in touch with me for web development or general IT support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${sansMono.variable} bg-gradient-to-br from-bg-start to-bg-end antialiased relative min-h-screen`}
      >
        <div className="absolute top-0 left-0 z-[-5] h-full w-full overflow-clip">
          <svg
            className="absolute right-0 w-1/3 sm:w-[50%] z-[-1] opacity-50"
            viewBox="0 0 100 100"
          >
            <polygon
              points="100,64 100,0 0,0"
              style={{ fill: "var(--primary)" }}
            />
          </svg>
          <Image
            src={wifi}
            alt=""
            className="absolute opacity-40 top-[100px] -left-20 md:left-50 z-[-2] -rotate-45"
          />
          <Image
            src={code}
            alt=""
            className="absolute opacity-40 -right-30 md:right-30 top-[500px] z-[-2]"
          />
          <Image
            src={wifi}
            alt=""
            className="absolute opacity-30 md:top-[1000px] top-[1300] -left-20 md:left-50 z-[-2] rotate-45"
          />
          <Image
            src={code}
            alt=""
            className="absolute opacity-30 top-[1900px] md:top-[1500px] -right-30 md:right-30 z-[-2]"
          />
        </div>
        {children}
      </body>
    </html>
  );
}
