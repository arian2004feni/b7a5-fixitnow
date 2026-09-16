import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "./types/user";
import { jwtUtils } from "./utils/jwt";
import { isAccessTokenExist } from "./services/refreshToken";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/services", "/technicians"];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = await isAccessTokenExist();

  // check your accessToken
  const decodedToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET!)
    : null;

  // set user role

  let userRole = null;
  if (decodedToken?.success && decodedToken.data) {
    userRole = (decodedToken.data as JwtPayload).role;
  }

  // protecting auth routes and role based redirect

  if (decodedToken?.success && AUTH_ROUTES.includes(pathname)) {
    if (userRole === Role.CUSTOMER) {
      return NextResponse.redirect(new URL("/customer-dashboard", request.url));
    } else if (userRole === Role.TECHNICIAN) {
      return NextResponse.redirect(
        new URL("/technician-dashboard", request.url),
      );
    } else if (userRole === Role.ADMIN) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  if (!decodedToken?.success && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    pathname.startsWith("/customer-dashboard") &&
    userRole !== Role.CUSTOMER
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/technician-dashboard") &&
    userRole !== Role.TECHNICIAN
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/admin-dashboard") &&
    userRole !== Role.ADMIN
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  // return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
