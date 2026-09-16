// import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "./types/user";

const AUTH_ROUTES = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // const cookieStore = await cookies();
  // const accessToken = cookieStore.get("accessToken")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;

  const decodedToken = accessToken
    ? (jwt.decode(accessToken) as JwtPayload)
    : null;

  let userRole = null;

  if (decodedToken) {
    userRole = decodedToken.role;
  }
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === Role.CUSTOMER) {
      return NextResponse.redirect(new URL("/customer-dashboard", request.url));
    } else if (userRole === Role.TECHNICIAN) {
      return NextResponse.redirect(new URL("/technician-dashboard", request.url));
    } else if (userRole === Role.ADMIN) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};