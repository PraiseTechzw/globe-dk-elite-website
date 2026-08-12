import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(
  request: NextRequest
) {
  try {
    const {
      token,
      password,
    } = await request.json()

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("reset_token", token)
      .single()

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token",
        },
        { status: 400 }
      )
    }

    const hashedPassword =
      await bcrypt.hash(password, 12)

    await supabase
      .from("users")
      .update({
        password_hash:
          hashedPassword,
        reset_token: null,
      })
      .eq("id", user.id)

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