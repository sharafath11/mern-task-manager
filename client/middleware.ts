import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GiConsoleController } from "react-icons/gi";

const protectedRoutes = ["/tasks"];
const authPages = ["/login", "/signup"];

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("token")?.value || null;
  const refreshToken = req.cookies.get("refreshToken")?.value || null;
  console.log("fffdvjbfdvbdfjkbvdkjlfbvdlfkjbvf", accessToken)
  console.log("Middleware running", accessToken);

  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthPage = authPages.some((route) => pathname.startsWith(route));

  if (!accessToken && !refreshToken && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if ((accessToken || refreshToken) && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:path*", "/login", "/signup"],
};
