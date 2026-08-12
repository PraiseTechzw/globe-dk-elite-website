import { NextRequest, NextResponse } from "next/server"

import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token")

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification token is missing.",
        },
        { status: 400 }
      )
    }

    // Find user with this verification token
    const {
      data: user,
      error: userError,
    } = await supabaseAdmin
      .from("users")
      .select(
        "id, email, email_verified, verification_token_expires_at"
      )
      .eq("verification_token", token)
      .maybeSingle()

    if (userError) {
      console.error(
        "Verification lookup error:",
        userError
      )

      return NextResponse.json(
        {
          success: false,
          message: "Unable to verify your account.",
        },
        { status: 500 }
      )
    }

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This verification link is invalid or has already been used.",
        },
        { status: 400 }
      )
    }

    // Already verified
    if (user.email_verified) {
      return NextResponse.json({
        success: true,
        alreadyVerified: true,
        message: "Your email is already verified.",
      })
    }

    // Check expiration
    if (
      !user.verification_token_expires_at ||
      new Date(user.verification_token_expires_at) <
        new Date()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This verification link has expired. Please request a new verification email.",
        },
        { status: 400 }
      )
    }

    // Verify user
    const {
      error: updateError,
    } = await supabaseAdmin
      .from("users")
      .update({
        email_verified: true,
        verification_token: null,
        verification_token_expires_at: null,
      })
      .eq("id", user.id)

    if (updateError) {
      console.error(
        "Verification update error:",
        updateError
      )

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to complete email verification.",
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message:
        "Your email has been successfully verified.",
    })
  } catch (error) {
    console.error(
      "Unexpected verification error:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while verifying your email.",
      },
      { status: 500 }
    )
  }
}