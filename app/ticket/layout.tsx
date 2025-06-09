import { Metadata } from "next";

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
    <div>
      {children}
    </div>
  );
}
