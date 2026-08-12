import bcrypt from "bcryptjs"
import crypto from "crypto"

import {
  NextRequest,
  NextResponse,
} from "next/server"

import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { resend } from "@/lib/resend"

export async function POST(
  request: NextRequest
) {
  try {
    // ============================================================
    // READ REQUEST
    // ============================================================

    const body = await request.json()

    // ============================================================
    // GET DATA
    // ============================================================

    const firstName =
      String(body.firstName || "").trim()

    const lastName =
      String(body.lastName || "").trim()

    const email =
      String(body.email || "")
        .trim()
        .toLowerCase()

    const phone =
      String(body.phone || "").trim()

    const password =
      String(body.password || "")

    const level =
      String(body.level || "").trim()

    const school =
      String(body.school || "").trim()

    const guardianName =
      String(body.guardianName || "").trim()

    const guardianPhone =
      String(body.guardianPhone || "").trim()

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
        {
          status: 400,
        }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must be at least 8 characters long.",
        },
        {
          status: 400,
        }
      )
    }

    // ============================================================
    // BASIC EMAIL VALIDATION
    // ============================================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      )
    }

    // ============================================================
    // CHECK EXISTING USER
    // ============================================================

    const {
      data: existingUser,
      error: existingUserError,
    } = await supabaseAdmin
      .from("users")
      .select("id, email, email_verified")
      .eq("email", email)
      .maybeSingle()

    if (existingUserError) {
      console.error(
        "Existing user lookup error:",
        existingUserError
      )

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to check whether this email already exists.",
        },
        {
          status: 500,
        }
      )
    }

    // ============================================================
    // EMAIL ALREADY EXISTS
    // ============================================================

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "An account with this email already exists.",
        },
        {
          status: 409,
        }
      )
    }

    // ============================================================
    // HASH PASSWORD
    // ============================================================

    const passwordHash =
      await bcrypt.hash(
        password,
        12
      )

    // ============================================================
    // CREATE EMAIL VERIFICATION TOKEN
    // ============================================================

    const verificationToken =
      crypto
        .randomBytes(32)
        .toString("hex")

    // ============================================================
    // TOKEN EXPIRATION
    //
    // 24 HOURS
    // ============================================================

    const verificationExpiresAt =
      new Date(
        Date.now() +
          24 * 60 * 60 * 1000
      ).toISOString()

    // ============================================================
    // INSERT USER
    // ============================================================

    const {
      data: user,
      error: insertError,
    } = await supabaseAdmin
      .from("users")
      .insert({
        email,

        password_hash:
          passwordHash,

        first_name:
          firstName,

        last_name:
          lastName,

        phone,

        level,

        school,

        guardian_name:
          guardianName,

        guardian_phone:
          guardianPhone,

        role: "student",

        email_verified: false,

        verification_token:
          verificationToken,

        verification_token_expires_at:
          verificationExpiresAt,
      })
      .select(
        "id, email, first_name, last_name"
      )
      .single()

    // ============================================================
    // DATABASE ERROR
    // ============================================================

    if (insertError) {
      console.error(
        "Supabase insert error:",
        insertError
      )

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to create your account.",
        },
        {
          status: 500,
        }
      )
    }

    // ============================================================
    // CREATE VERIFICATION URL
    // ============================================================

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      request.nextUrl.origin

    const verifyLink =
      `${siteUrl}/auth/verify?token=${encodeURIComponent(
        verificationToken
      )}`

    // ============================================================
    // SEND VERIFICATION EMAIL
    // ============================================================

    const {
      error: emailError,
    } = await resend.emails.send({
      from:
        "GlobeDK Elite Academy <admission@globedk.co.zw>",

      to: [email],

      subject:
        "Verify your GlobeDK Elite Academy account",

      html: `
        <!DOCTYPE html>

        <html>
          <head>
            <meta charset="UTF-8" />

            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />

            <title>
              Verify your GlobeDK account
            </title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background: #f5f7fb;
              font-family: Arial, sans-serif;
            "
          >

            <div
              style="
                max-width: 600px;
                margin: 40px auto;
                background: white;
                border-radius: 12px;
                padding: 40px;
              "
            >

              <h1
                style="
                  margin-bottom: 20px;
                  color: #111827;
                "
              >
                Welcome to GlobeDK Elite Academy
              </h1>

              <p
                style="
                  color: #4b5563;
                  line-height: 1.6;
                "
              >
                Hello ${escapeHtml(firstName)},
              </p>

              <p
                style="
                  color: #4b5563;
                  line-height: 1.6;
                "
              >
                Thank you for creating your
                GlobeDK Elite Academy account.
              </p>

              <p
                style="
                  color: #4b5563;
                  line-height: 1.6;
                "
              >
                Please verify your email address
                by clicking the button below.
              </p>

              <div
                style="
                  margin: 30px 0;
                "
              >

                <a
                  href="${verifyLink}"
                  style="
                    display: inline-block;
                    padding: 14px 24px;
                    background: #2563eb;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: bold;
                  "
                >
                  Verify My Account
                </a>

              </div>

              <p
                style="
                  color: #6b7280;
                  font-size: 14px;
                  line-height: 1.6;
                "
              >
                This verification link will expire
                in 24 hours.
              </p>

              <p
                style="
                  color: #6b7280;
                  font-size: 13px;
                  line-height: 1.6;
                "
              >
                If you did not create this account,
                you can safely ignore this email.
              </p>

              <hr
                style="
                  border: none;
                  border-top: 1px solid #e5e7eb;
                  margin: 30px 0;
                "
              />

              <p
                style="
                  color: #9ca3af;
                  font-size: 12px;
                "
              >
                © ${new Date().getFullYear()}
                GlobeDK Elite Academy
              </p>

            </div>

          </body>
        </html>
      `,
    })

    // ============================================================
    // EMAIL ERROR
    // ============================================================

    if (emailError) {
      console.error(
        "Resend email error:",
        emailError
      )

      // Remove the account because
      // verification email was not sent.

      await supabaseAdmin
        .from("users")
        .delete()
        .eq("id", user.id)

      return NextResponse.json(
        {
          success: false,
          message:
            "Your account could not be completed because the verification email could not be sent. Please try again.",
        },
        {
          status: 500,
        }
      )
    }

    // ============================================================
    // SUCCESS
    // ============================================================

    return NextResponse.json(
      {
        success: true,

        requiresEmailConfirmation:
          true,

        message:
          "Your account has been created successfully. Please check your email and verify your account before signing in.",

        user: {
          id: user.id,
          email: user.email,
          firstName:
            user.first_name,
          lastName:
            user.last_name,
        },
      },
      {
        status: 201,
      }
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
      {
        status: 500,
      }
    )
  }
}

// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHtml(
  value: string
) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}