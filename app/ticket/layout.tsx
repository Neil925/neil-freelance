import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Neil Freelance - Ticket",
  description: "Fill out some information and I'll get in touch with you.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </SessionProvider>
  );
}
