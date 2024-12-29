import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const verifiedToken = token && (await verifyAuth(token).catch(() => null));

  if (req.nextUrl.pathname.startsWith("/auth/signin") && !verifiedToken) {
    return;
  }

  if (!verifiedToken) {
    if (!req.nextUrl.pathname.startsWith("/auth")) {
      //   return new NextResponse(
      //     JSON.stringify({ error: { message: "authentication required" } }),
      //     { status: 401 },
      //   );
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (req.url.includes("/auth/signin") && verifiedToken) {
    return NextResponse.redirect(new URL("/"));
  }
}

export const config = {
  matcher: ["/", "/chart", "/addmanager", "/addemployee"],
};
