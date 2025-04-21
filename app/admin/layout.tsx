import { auth } from "@/lib/auth";
import { ReactNode } from "react";

export default async function RootLayout(
  { children }: { children: ReactNode },
) {
  const session = await auth();

  if (session?.user?.role != "admin") {
    return (
      <div className="min-w-full min-h-screen from-red-900 to-[#130100] text-white bg-radial flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-center  uppercase">
          No Auth
        </h1>
      </div>
    );
  }

  return (
    <div className="min-w-full min-h-screen from-red-900 to-[#130100] text-white bg-radial">
      {children}
    </div>
  );
}
