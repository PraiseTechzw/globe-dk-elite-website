import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { createToken } from "@/lib/auth"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(request: NextRequest) {
  try {
    // ============================================================
    // READ REQUEST
    // ============================================================

    const body = await request.json()

    const email = String(body.email || "")
      .trim()
      .toLowerCase()

    const password = String(body.password || "")

    console.log("LOGIN REQUEST:", {
      email,
      hasPassword: Boolean(password),
    })

    // ============================================================
    // VALIDATION
    // ============================================================

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      )
    }

    // ============================================================
    // FIND USER
    // ============================================================

    const {
      data: user,
      error: userError,
    } = await supabaseAdmin
      .from("users")
      .select(`
        id,
        email,
        password_hash,
        first_name,
        last_name,
        role,
        email_verified
      `)
      .eq("email", email)
      .maybeSingle()

    // ============================================================
    // DATABASE ERROR
    // ============================================================

    if (userError) {
      console.error("Login user lookup error:", userError)

      return NextResponse.json(
        {
          success: false,
          message: "Unable to login. Please try again.",
        },
        { status: 500 }
      )
    }

    // ============================================================
    // USER NOT FOUND
    // ============================================================

    if (!user) {
      console.log("LOGIN: user not found:", email)

      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      )
    }

    console.log("LOGIN: user found:", {
      id: user.id,
      email: user.email,
      role: user.role,
      emailVerified: user.email_verified,
      hasPasswordHash: Boolean(user.password_hash),
    })

    // ============================================================
    // PASSWORD HASH CHECK
    // ============================================================

    if (!user.password_hash) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This account does not have a password login configured.",
        },
        { status: 401 }
      )
    }

    // ============================================================
    // VERIFY PASSWORD
    // ============================================================

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    )

    if (!validPassword) {
      console.log("LOGIN: invalid password for:", email)

      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      )
    }

    console.log("LOGIN: password verified")

    // ============================================================
    // EMAIL VERIFICATION
    // ============================================================

    if (!user.email_verified) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please verify your email address before signing in.",
        },
        { status: 401 }
      )
    }

    // ============================================================
    // CHECK TOKEN SECRET BEFORE CREATING TOKEN
    // ============================================================

    if (!process.env.JWT_SECRET) {
      console.error(
        "LOGIN ERROR: JWT_SECRET is missing from environment variables."
      )

      return NextResponse.json(
        {
          success: false,
          message:
            "Server authentication is not configured correctly.",
        },
        { status: 500 }
      )
    }

    // ============================================================
    // CREATE APPLICATION SESSION
    // ============================================================

    const token = await createToken(
      user.id,
      user.role
    )

    // ============================================================
    // STORE HTTP-ONLY SESSION COOKIE
    // ============================================================

    const cookieStore = await cookies()

    cookieStore.set(
      "session",
      token,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV === "production",

        sameSite: "lax",

        path: "/",

        maxAge: 60 * 60 * 24 * 7,
      }
    )

    // ============================================================
    // DETERMINE REDIRECT
    // ============================================================

    let redirectTo = "/student/dashboard"

    switch (
      String(user.role).toLowerCase()
    ) {
      case "admin":
        redirectTo = "/admin/dashboard"
        break

      case "teacher":
        redirectTo = "/teacher/dashboard"
        break

      case "tutor":
        redirectTo = "/tutor/dashboard"
        break

      case "parent":
        redirectTo = "/parent/dashboard"
        break

      case "student":
        redirectTo = "/student/dashboard"
        break

      default:
        console.error(
          "Unknown user role:",
          user.role
        )

        return NextResponse.json(
          {
            success: false,
            message:
              "Your account role is not configured correctly. Please contact the administrator.",
          },
          { status: 403 }
        )
    }

    // ============================================================
    // SUCCESS
    // ============================================================

    console.log(
      "LOGIN SUCCESS:",
      email,
      "→",
      redirectTo
    )

    return NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        redirectTo,

        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(
      "Unexpected login API error:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while logging you in. Please try again.",
      },
      { status: 500 }
    )
  }
}