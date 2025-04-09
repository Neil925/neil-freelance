import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Neil Freelance - Ticket",
  description: "Fill out some information and I'll get in touch with you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
}
