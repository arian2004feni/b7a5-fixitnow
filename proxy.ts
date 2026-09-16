import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "./types/user";
import { jwtUtils } from "./utils/jwt";
import { getNewAccessToken } from "./services/refreshToken";
import { cookies } from "next/headers";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/services", "/technicians"];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  let accessToken = request.cookies.get("accessToken")?.value || null;
  const refreshToken = request.cookies.get("refreshToken")?.value || null;

  const decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.data.accessToken;
      NextResponse.next().cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      accessToken = newAccessToken;
    }
  }

  // set user role

  let userRole = null;
  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  // protecting auth routes and role based redirect

  if (decodedAccessToken?.success && AUTH_ROUTES.includes(pathname)) {
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

  if (!decodedAccessToken?.success && !isPublicRoute && !isAuthRoute) {
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
