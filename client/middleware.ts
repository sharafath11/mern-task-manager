import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/tasks"];
const authPages = ["/login", "/signup"];

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("token")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  console.log("Middleware running. Access token:", accessToken);

  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthPage = authPages.some((route) =>
    pathname.startsWith(route)
  );

  if (!accessToken && !refreshToken && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if ((accessToken || refreshToken) && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/tasks/:path*", "/login", "/signup"],
};
