import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (!req.cookies.has("auth_token")) {
    console.log(req.nextUrl);
    const url = req.nextUrl.clone();
    const originalUrl = req.nextUrl.clone();

    if (process.env.BASE_URL && originalUrl.basePath != process.env.BASE_URL) {
      originalUrl.basePath = process.env.BASE_URL;
    }

    url.pathname = "/api/auth";
    url.searchParams.append("returnto", originalUrl.toString());

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ticket/:path*", "/admin/:path*"],
};
