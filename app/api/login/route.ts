import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const email = String(body.email || "")
      .trim()
      .toLowerCase()

    const password = String(body.password || "")

    // ---------------------------------------------------------
    // VALIDATION
    // ---------------------------------------------------------

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      )
    }

    // ---------------------------------------------------------
    // SUPABASE CLIENT
    // ---------------------------------------------------------

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // ---------------------------------------------------------
    // EMAIL + PASSWORD LOGIN
    // ---------------------------------------------------------

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error) {
      console.error(
        "Email login error:",
        error
      )

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
          message:
            "Unable to create a login session.",
        },
        { status: 401 }
      )
    }

    // ---------------------------------------------------------
    // GET ROLE FROM public.profiles
    // ---------------------------------------------------------
    //
    // IMPORTANT:
    // The role is NOT taken from:
    //
    // data.user.user_metadata.role
    //
    // Instead, public.profiles.role is the source of truth.
    // ---------------------------------------------------------

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle()

    if (profileError) {
      console.error(
        "Profile lookup error:",
        profileError
      )

      return NextResponse.json(
        {
          success: false,
          message:
            "We could not retrieve your account role. Please try again.",
        },
        { status: 500 }
      )
    }

    // ---------------------------------------------------------
    // PROFILE DOES NOT EXIST
    // ---------------------------------------------------------

    if (!profile) {
      console.error(
        "No profile found for authenticated user:",
        data.user.id
      )

      return NextResponse.json(
        {
          success: false,
          message:
            "Your account profile could not be found. Please contact the administrator.",
        },
        { status: 403 }
      )
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
    // ROLE VALIDATION
    // ---------------------------------------------------------

    if (!role) {
      console.error(
        "Profile has no role:",
        data.user.id
      )

      return NextResponse.json(
        {
          success: false,
          message:
            "Your account does not have a valid role. Please contact the administrator.",
        },
        { status: 403 }
      )
    }

    // ---------------------------------------------------------
    // ROLE → DESTINATION
    // ---------------------------------------------------------

    let redirectTo: string

    switch (role) {
      case "student":
        redirectTo = "/student/dashboard"
        break

      case "admin":
        redirectTo = "/admin/dashboard"
        break

      case "tutor":
        redirectTo = "/tutor/dashboard"
        break

      case "teacher":
        redirectTo = "/teacher/dashboard"
        break

      case "parent":
        redirectTo = "/parent/dashboard"
        break

      default:
        console.error(
          "Unknown profile role:",
          role
        )

        return NextResponse.json(
          {
            success: false,
            message:
              "Your account has an invalid role. Please contact the administrator.",
          },
          { status: 403 }
        )
    }

    // ---------------------------------------------------------
    // SUCCESS
    // ---------------------------------------------------------

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
    console.error(
      "Unexpected login API error:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while signing in.",
      },
      { status: 500 }
    )
  }
}