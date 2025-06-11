import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (!req.cookies.has("auth_token")) {
    const url = req.nextUrl.clone();
    url.pathname = "/api/auth";
    url.searchParams.append("returnto", req.nextUrl.toString());

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ticket/:path*", "/admin/:path*"],
};
