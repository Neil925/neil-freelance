import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-full min-h-screen bg-gradient-to-tr from-red-900 to-[#130100] text-white bg-radial">
      {children}
    </div>
  );
}
