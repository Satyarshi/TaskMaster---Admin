// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  const publicPaths = ["/auth/signin", "/auth/signup"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);
  const token = request.cookies.get("token")?.value;

  // For public paths (login, signup)
  if (isPublicPath) {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // If token is valid and not expired, redirect to home
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          return NextResponse.redirect(new URL("/", request.url));
        }
      } catch {
        // If token is invalid, allow access to public paths
        return NextResponse.next();
      }
    }
    // No token, allow access to public paths
    return NextResponse.next();
  }

  // For protected routes
  if (!token) {
    // No token, redirect to login
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      // Token expired, redirect to login
      const url = new URL("/auth/signin", request.url);
      url.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    // Valid token, allow access
    return NextResponse.next();
  } catch {
    // Invalid token, redirect to login
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/", "/addmanager", "/addemployee", "/auth/signin", "/auth/signup"],
};
