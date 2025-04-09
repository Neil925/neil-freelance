import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";

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
        <svg
          className="absolute right-0 h-32 md:h-[92%] z-[-1]"
          viewBox="0 0 100 100"
        >
          <polygon points="100,100 100,0 0,0" fill="#60A5FA" />
        </svg>
        {children}
      </body>
    </html>
  );
}
