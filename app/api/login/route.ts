import bcrypt from "bcryptjs";

import { cookies } from "next/headers";

import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createToken } from "@/lib/auth";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(
  request: NextRequest
) {
  try {
    const { email, password } =
      await request.json();

    const { data: user } =
      await supabaseAdmin
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid credentials",
        },
        { status: 401 }
      );
    }

    const valid =
      await bcrypt.compare(
        password,
        user.password_hash
      );

    if (!valid) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid credentials",
        },
        { status: 401 }
      );
    }

    if (!user.email_verified) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Verify your email first.",
        },
        { status: 401 }
      );
    }

    const token =
      await createToken(
        user.id,
        user.role
      );

    (await cookies()).set(
      "session",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
      }
    );

    let redirectTo =
      "/student/dashboard";

    if (user.role === "admin")
      redirectTo =
        "/admin/dashboard";

    if (user.role === "teacher")
      redirectTo =
        "/teacher/dashboard";

    if (user.role === "parent")
      redirectTo =
        "/parent/dashboard";

    return NextResponse.json({
      success: true,
      redirectTo,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to login.",
      },
      { status: 500 }
    );
  }
}