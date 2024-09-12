import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_PAGE } from "./lib/constants";

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const url = new URL(request.url);

  if (!searchParams.has("page")) {
    url.searchParams.set("page", String(DEFAULT_PAGE));
    return NextResponse.redirect(url.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/search/:path*",
};
