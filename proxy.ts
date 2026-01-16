import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE_NAME = "portal_token";

export default function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME);
  const { pathname } = request.nextUrl;

  // If trying to access protected routes without token, redirect to login
  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If already logged in and trying to access login page, redirect to home
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
