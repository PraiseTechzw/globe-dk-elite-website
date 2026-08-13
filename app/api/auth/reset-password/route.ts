import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const {
      token,
      password,
    } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Reset token and password are required.",
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

    const { data: user, error: userError } =
      await supabase
        .from("users")
        .select("id")
        .eq("reset_token", token)
        .maybeSingle()

    if (userError) {
      console.error(
        "Reset password user lookup error:",
        userError
      )

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to verify the reset token.",
        },
        { status: 500 }
      )
    }

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired reset link.",
        },
        { status: 400 }
      )
    }

    const hashedPassword =
      await bcrypt.hash(password, 12)

    const { error: updateError } =
      await supabase
        .from("users")
        .update({
          password_hash: hashedPassword,
          reset_token: null,
        })
        .eq("id", user.id)

    if (updateError) {
      console.error(
        "Password update error:",
        updateError
      )

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to update your password.",
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message:
        "Your password has been reset successfully.",
    })
  } catch (error) {
    console.error(
      "Reset password API error:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while resetting your password.",
      },
      { status: 500 }
    )
  }
}