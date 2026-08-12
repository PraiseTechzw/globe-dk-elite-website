import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value, options }) => {
              req.cookies.set(name, value)
              response.cookies.set(
                name,
                value,
                options
              )
            }
          )
        },
      },
    }
  )

  // ---------------------------------------------------------
  // GET AUTHENTICATED USER
  // ---------------------------------------------------------

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ---------------------------------------------------------
  // NOT LOGGED IN
  // ---------------------------------------------------------

  if (!user) {
    const loginUrl = req.nextUrl.clone()

    loginUrl.pathname = "/login"
    loginUrl.searchParams.set(
      "redirect",
      req.nextUrl.pathname
    )

    return NextResponse.redirect(loginUrl)
  }

  // ---------------------------------------------------------
  // GET ROLE FROM public.profiles
  // ---------------------------------------------------------

  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()

  if (profileError) {
    console.error(
      "Middleware profile lookup error:",
      profileError
    )

    const loginUrl = req.nextUrl.clone()

    loginUrl.pathname = "/login"

    return NextResponse.redirect(loginUrl)
  }

  // ---------------------------------------------------------
  // NO PROFILE
  // ---------------------------------------------------------

  if (!profile) {
    console.error(
      "No profile found for user:",
      user.id
    )

    const loginUrl = req.nextUrl.clone()

    loginUrl.pathname = "/login"

    return NextResponse.redirect(loginUrl)
  }

  // ---------------------------------------------------------
  // NORMALIZE ROLE
  // ---------------------------------------------------------

  const role = String(
    profile.role || ""
  )
    .trim()
    .toLowerCase()

  // ---------------------------------------------------------
  // ADMIN ROUTES
  // ---------------------------------------------------------

  if (
    req.nextUrl.pathname.startsWith("/admin")
  ) {
    if (role !== "admin") {
      const dashboardUrl =
        req.nextUrl.clone()

      switch (role) {
        case "student":
          dashboardUrl.pathname =
            "/student/dashboard"
          break

        case "tutor":
          dashboardUrl.pathname =
            "/tutor/dashboard"
          break

        case "teacher":
          dashboardUrl.pathname =
            "/teacher/dashboard"
          break

        case "parent":
          dashboardUrl.pathname =
            "/parent/dashboard"
          break

        default:
          dashboardUrl.pathname = "/login"
          break
      }

      return NextResponse.redirect(
        dashboardUrl
      )
    }
  }

  // ---------------------------------------------------------
  // TUTOR ROUTES
  // ---------------------------------------------------------

  if (
    req.nextUrl.pathname.startsWith("/tutor")
  ) {
    if (
      role !== "tutor" &&
      role !== "admin"
    ) {
      const dashboardUrl =
        req.nextUrl.clone()

      if (role === "student") {
        dashboardUrl.pathname =
          "/student/dashboard"
      } else if (role === "parent") {
        dashboardUrl.pathname =
          "/parent/dashboard"
      } else {
        dashboardUrl.pathname = "/login"
      }

      return NextResponse.redirect(
        dashboardUrl
      )
    }
  }

  // ---------------------------------------------------------
  // STUDENT ROUTES
  // ---------------------------------------------------------

  if (
    req.nextUrl.pathname.startsWith("/student")
  ) {
    if (
      role !== "student" &&
      role !== "admin"
    ) {
      const dashboardUrl =
        req.nextUrl.clone()

      if (role === "tutor") {
        dashboardUrl.pathname =
          "/tutor/dashboard"
      } else if (role === "parent") {
        dashboardUrl.pathname =
          "/parent/dashboard"
      } else {
        dashboardUrl.pathname = "/login"
      }

      return NextResponse.redirect(
        dashboardUrl
      )
    }
  }

  // ---------------------------------------------------------
  // CONTINUE
  // ---------------------------------------------------------

  return response
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/tutor/:path*",
    "/student/:path*",
  ],
}