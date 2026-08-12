import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const email = String(body.email || "")
      .trim()
      .toLowerCase()

    const password = String(body.password || "")

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // ---------------------------------------------------------
    // EMAIL + PASSWORD ONLY
    // ---------------------------------------------------------

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error) {
      console.error("Email login error:", error)

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 401 }
      )
    }

    if (!data.user || !data.session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to create a login session.",
        },
        { status: 401 }
      )
    }

    // ---------------------------------------------------------
    // GET ROLE
    // ---------------------------------------------------------

    const role =
      data.user.user_metadata?.role || "student"

    // ---------------------------------------------------------
    // ROLE → DESTINATION
    // ---------------------------------------------------------

    let redirectTo = "/student/dashboard"

    switch (role.toLowerCase()) {
      case "student":
        redirectTo = "/student/dashboard"
        break

      case "admin":
        redirectTo = "/admin/dashboard"
        break

      case "teacher":
        redirectTo = "/teacher/dashboard"
        break

      case "parent":
        redirectTo = "/parent/dashboard"
        break

      default:
        redirectTo = "/student/dashboard"
        break
    }

    return NextResponse.json({
      success: true,
      message: "Login successful.",
      user: {
        id: data.user.id,
        email: data.user.email,
        role,
      },
      session: data.session,
      redirectTo,
    })
  } catch (error) {
    console.error("Unexpected login API error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while signing in.",
      },
      { status: 500 }
    )
  }
}