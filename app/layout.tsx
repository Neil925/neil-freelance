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
        className={`${notoSans.variable} ${sansMono.variable} bg-gradient-to-br from-bg-start to-bg-end antialiased min-h-screen overflow-x-clip`}
      >
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
          className="absolute opacity-40 top-20 -left-20 md:left-50 z-[-2] -rotate-45"
        />
        <Image
          src={code}
          alt=""
          className="absolute opacity-40 -right-30 md:right-30 -bottom-50 z-[-2]"
        />
        <Image
          src={wifi}
          alt=""
          className="absolute opacity-30 translate-y-[1200px] md:translate-y-[900px] top-20 -left-20 md:left-50 z-[-2] rotate-45"
        />
        <Image
          src={code}
          alt=""
          className="absolute opacity-30 translate-y-[1400px] md:translate-y-[1000px] -right-30 md:right-30 -bottom-50 z-[-2]"
        />
        {children}
      </body>
    </html>
  );
}
