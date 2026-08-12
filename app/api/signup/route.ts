import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables.")
}

/*
 * Server-side Supabase client.
 *
 * IMPORTANT:
 * We intentionally use the ANON key here.
 * We do NOT use the service-role key for normal signup.
 */
const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      level,
      school,
      guardianName,
      guardianPhone,
    } = body

    // ============================================================
    // VALIDATION
    // ============================================================

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !level ||
      !school
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please complete all required fields.",
        },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must be at least 8 characters long.",
        },
        { status: 400 }
      )
    }

    const normalizedEmail =
      String(email).trim().toLowerCase()

    const cleanFirstName =
      String(firstName).trim()

    const cleanLastName =
      String(lastName).trim()

    const cleanPhone =
      String(phone || "").trim()

    const cleanLevel =
      String(level).trim()

    const cleanSchool =
      String(school).trim()

    const cleanGuardianName =
      String(guardianName || "").trim()

    const cleanGuardianPhone =
      String(guardianPhone || "").trim()

    // ============================================================
    // CREATE SUPABASE AUTH USER
    // ============================================================

    const { data, error } =
      await supabase.auth.signUp({
        email: normalizedEmail,
        password,

        options: {
          emailRedirectTo:
            `${process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin}/auth/callback`,

          /*
           * These values are stored in auth.users.user_metadata.
           *
           * Your database trigger can then use these values
           * to populate profiles and students.
           */
          data: {
            first_name: cleanFirstName,
            last_name: cleanLastName,

            full_name:
              `${cleanFirstName} ${cleanLastName}`.trim(),

            phone: cleanPhone,

            level: cleanLevel,

            school: cleanSchool,

            guardian_name:
              cleanGuardianName,

            guardian_phone:
              cleanGuardianPhone,

            role: "student",
          },
        },
      })

    // ============================================================
    // SUPABASE ERROR
    // ============================================================

    if (error) {
      console.error(
        "Supabase signup error:",
        error
      )

      return NextResponse.json(
        {
          success: false,
          message:
            error.message ||
            "Unable to create your account.",
        },
        { status: 400 }
      )
    }

    // ============================================================
    // NO USER CREATED
    // ============================================================

    if (!data.user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The account could not be created.",
        },
        { status: 400 }
      )
    }

    // ============================================================
    // EMAIL CONFIRMATION REQUIRED
    // ============================================================

    if (!data.session) {
      return NextResponse.json(
        {
          success: true,
          requiresEmailConfirmation: true,
          message:
            "Your account has been created successfully. Please check your email and confirm your account before signing in.",
        },
        { status: 201 }
      )
    }

    // ============================================================
    // EMAIL CONFIRMATION DISABLED
    // ============================================================

    return NextResponse.json(
      {
        success: true,
        requiresEmailConfirmation: false,
        message:
          "Your account has been created successfully.",
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(
      "Unexpected signup API error:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while creating your account. Please try again.",
      },
      { status: 500 }
    )
  }
}