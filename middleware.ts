import { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { verifyToken } from "@/lib/jwt"

export async function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get("session")
      ?.value

  const path =
    request.nextUrl.pathname

  const protectedRoutes = [
    "/student",
    "/teacher",
    "/parent",
    "/admin",
  ]

  const requiresAuth =
    protectedRoutes.some((route) =>
      path.startsWith(route)
    )

  if (!requiresAuth) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    )
  }

  try {
    const payload =
      await verifyToken(token)

    if (
      path.startsWith("/admin") &&
      payload.role !== "admin"
    ) {
      return NextResponse.redirect(
        new URL(
          "/unauthorized",
          request.url
        )
      )
    }

    if (
      path.startsWith("/teacher") &&
      payload.role !== "teacher"
    ) {
      return NextResponse.redirect(
        new URL(
          "/unauthorized",
          request.url
        )
      )
    }

    if (
      path.startsWith("/parent") &&
      payload.role !== "parent"
    ) {
      return NextResponse.redirect(
        new URL(
          "/unauthorized",
          request.url
        )
      )
    }

    if (
      path.startsWith("/student") &&
      payload.role !== "student"
    ) {
      return NextResponse.redirect(
        new URL(
          "/unauthorized",
          request.url
        )
      )
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    )
  }
}

export const config = {
  matcher: [
    "/student/:path*",
    "/teacher/:path*",
    "/parent/:path*",
    "/admin/:path*",
  ],
}