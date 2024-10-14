import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_PAGE } from "./lib/constants";

export default function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  //拿到當下的searchParams進行檢查
  const url = new URL(request.url);
  //url只包含url字串，用以建構新的URL方便操作

  let shouldRedirect = false;

  if (!searchParams.has("type")) {
    url.searchParams.set("type", "release");
    shouldRedirect = true;
  }
  if (!searchParams.has("page")) {
    url.searchParams.set("page", String(DEFAULT_PAGE));
    shouldRedirect = true;
  }
  if (shouldRedirect) {
    return NextResponse.redirect(url.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/search/:path*",
};
