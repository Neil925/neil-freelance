import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

import pattern_bg from "../resources/images/pattern-bg.png";

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
        className={`${notoSans.variable} ${sansMono.variable} bg-background antialiased`}
      >
        <Image src={pattern_bg} alt="" className="fixed h-screen z-[-2]" />
        <svg
          className="absolute right-0 w-1/3 sm:w-[50%] z-[-1]"
          viewBox="0 0 100 100"
        >
          <polygon points="100,64 100,0 0,0" fill="#60A5FA" />
        </svg>
        {children}
      </body>
    </html>
  );
}
