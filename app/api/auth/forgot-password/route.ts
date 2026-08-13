import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"
import crypto from "crypto"

const resend = new Resend(
  process.env.RESEND_API_KEY
)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(
  request: NextRequest
) {
  try {
    const { email } = await request.json()

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single()

    if (!user) {
      return NextResponse.json({
        success: true,
      })
    }

    const token =
      crypto.randomBytes(32).toString("hex")

    await supabase
      .from("users")
      .update({
        reset_token: token,
      })
      .eq("id", user.id)

    const resetUrl =
      `${process.env.NEXT_PUBLIC_SITE_URL}` +
      `/auth/reset-password?token=${token}`

    await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "Reset Password",
      html: `
        <h2>Password Reset</h2>

        <p>Click below:</p>

        <a href="${resetUrl}">
          Reset Password
        </a>
      `,
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    )
  }
}