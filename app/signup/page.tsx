"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  Phone,
  School,
  ShieldCheck,
  User,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { createClient } from "@/lib/supabaseClient"

export default function SignupPage() {
  const router = useRouter()

  /*
   * Supabase is ONLY used here for Google OAuth.
   *
   * Email/password registration is completely custom:
   *
   * Signup page
   *      ↓
   * POST /api/signup
   *      ↓
   * Supabase database
   *      ↓
   * Resend
   *      ↓
   * Verification email
   */

  const supabase = createClient()

  const [showPassword, setShowPassword] =
    useState(false)

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [googleLoading, setGoogleLoading] =
    useState(false)

  const [errorMessage, setErrorMessage] =
    useState("")

  const [successMessage, setSuccessMessage] =
    useState("")

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    level: "",
    school: "",
    guardianName: "",
    guardianPhone: "",
  })

  // ============================================================
  // UPDATE FORM
  // ============================================================

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  // ============================================================
  // CUSTOM EMAIL SIGNUP
  // ============================================================

  const handleSignup = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault()

  setErrorMessage("")
  setSuccessMessage("")

  // ============================================================
  // CLIENT-SIDE VALIDATION
  // ============================================================

  if (form.password !== form.confirmPassword) {
    setErrorMessage("Passwords do not match.")
    return
  }

  if (form.password.length < 8) {
    setErrorMessage(
      "Password must be at least 8 characters long."
    )
    return
  }

  if (!form.firstName.trim()) {
    setErrorMessage("Please enter your first name.")
    return
  }

  if (!form.lastName.trim()) {
    setErrorMessage("Please enter your last name.")
    return
  }

  if (!form.email.trim()) {
    setErrorMessage("Please enter your email address.")
    return
  }

  if (!form.level) {
    setErrorMessage("Please select your current level.")
    return
  }

  if (!form.school.trim()) {
    setErrorMessage("Please enter your school.")
    return
  }

  // ============================================================
  // SEND REQUEST
  // ============================================================

  try {
    setLoading(true)

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      password: form.password,
      level: form.level,
      school: form.school.trim(),
      guardianName: form.guardianName.trim(),
      guardianPhone: form.guardianPhone.trim(),
    }

    console.log(
      "Sending signup request:",
      payload
    )

    const response = await fetch(
      "/api/signup",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },

        body: JSON.stringify(payload),
      }
    )

    // ============================================================
    // READ RAW RESPONSE FIRST
    // ============================================================

    const responseText = await response.text()

    console.log(
      "Signup API status:",
      response.status
    )

    console.log(
      "Signup API content-type:",
      response.headers.get("content-type")
    )

    console.log(
      "Raw signup API response:",
      responseText
    )

    // ============================================================
    // TRY TO PARSE JSON
    // ============================================================

    let result: {
      success?: boolean
      message?: string
      requiresEmailConfirmation?: boolean
      user?: {
        id?: string
        email?: string
        firstName?: string
        lastName?: string
      }
    } = {}

    try {
      result = JSON.parse(responseText)
    } catch (jsonError) {
      console.error(
        "Signup API did not return valid JSON:",
        jsonError
      )

      console.error(
        "Full server response:",
        responseText
      )

      setErrorMessage(
        `The signup server returned an unexpected response. HTTP status: ${response.status}`
      )

      return
    }

    // ============================================================
    // API ERROR
    // ============================================================

    if (
      !response.ok ||
      !result.success
    ) {
      setErrorMessage(
        result.message ||
          "Unable to create your account."
      )

      return
    }

    // ============================================================
    // SUCCESS
    // ============================================================

    setSuccessMessage(
      result.message ||
        "Your account has been created successfully. Please check your email and verify your account before signing in."
    )

    // ============================================================
    // CLEAR PASSWORDS
    // ============================================================

    setForm((previous) => ({
      ...previous,
      password: "",
      confirmPassword: "",
    }))

  } catch (error) {
    console.error(
      "Signup request error:",
      error
    )

    setErrorMessage(
      error instanceof Error
        ? error.message
        : "Something went wrong while creating your account. Please try again."
    )
  } finally {
    setLoading(false)
  }
}
  // ============================================================
  // GOOGLE SIGNUP
  // ============================================================

  const handleGoogleSignup = async () => {
    setErrorMessage("")
    setSuccessMessage("")

    try {
      setGoogleLoading(true)

      const {
        error,
      } =
        await supabase.auth.signInWithOAuth({
          provider: "google",

          options: {
            redirectTo:
              `${window.location.origin}/auth/callback?next=/student/dashboard`,
          },
        })

      if (error) {
        console.error(
          "Google signup error:",
          error
        )

        setErrorMessage(
          error.message ||
            "Unable to continue with Google."
        )

        setGoogleLoading(false)
      }
    } catch (error) {
      console.error(
        "Unexpected Google signup error:",
        error
      )

      setErrorMessage(
        "Unable to connect to Google. Please try again."
      )

      setGoogleLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ====================================================
            LEFT BRANDING
        ==================================================== */}

        <div className="relative hidden overflow-hidden bg-primary lg:flex">

          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-16">

            {/* LOGO */}

            <Link
              href="/"
              className="flex items-center gap-3 text-primary-foreground"
            >

              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white">

                <Image
                  src="/Logo.png"
                  alt="GlobeDK Elite Academy"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />

              </div>

              <div>

                <p className="text-lg font-bold">
                  GlobeDK Elite Academy
                </p>

                <p className="text-xs opacity-80">
                  Excellence Through Education
                </p>

              </div>

            </Link>

            {/* HERO */}

            <div className="max-w-xl text-primary-foreground">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">

                <GraduationCap className="h-7 w-7" />

              </div>

              <h1 className="text-4xl font-bold tracking-tight xl:text-5xl">

                Start your

                <br />

                learning journey.

              </h1>

              <p className="mt-6 text-lg leading-8 opacity-85">

                Create your GlobeDK Elite Academy
                account and gain access to tools
                designed to make examination
                preparation more intelligent and
                effective.

              </p>

              <div className="mt-8 space-y-4">

                {[
                  "AI-powered examination insights",
                  "Historical examination analysis",
                  "Personalised mock examinations",
                  "Progress and performance tracking",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">

                      <Check className="h-4 w-4" />

                    </div>

                    <span className="text-sm">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>

            <p className="text-xs text-primary-foreground/60">

              © {new Date().getFullYear()} GlobeDK Elite Academy.

            </p>

          </div>

        </div>

        {/* ====================================================
            FORM
        ==================================================== */}

        <div className="flex items-center justify-center p-5 sm:p-8">

          <div className="w-full max-w-xl">

            {/* MOBILE BRANDING */}

            <div className="mb-8 flex justify-center lg:hidden">

              <Link
                href="/"
                className="flex items-center gap-3"
              >

                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl">

                  <Image
                    src="/Logo.png"
                    alt="GlobeDK Elite Academy"
                    width={48}
                    height={48}
                  />

                </div>

                <div>

                  <p className="font-bold">
                    GlobeDK Elite Academy
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Excellence Through Education
                  </p>

                </div>

              </Link>

            </div>

            <Card>

              <CardHeader>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">

                  <User className="h-5 w-5 text-primary" />

                </div>

                <CardTitle className="mt-3 text-2xl">
                  Create your account
                </CardTitle>

                <CardDescription>
                  Tell us a little about yourself so
                  we can personalise your learning
                  experience.
                </CardDescription>

              </CardHeader>

              <CardContent>

                {/* ERROR */}

                {errorMessage && (

                  <div className="mb-5 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">

                    {errorMessage}

                  </div>

                )}

                {/* SUCCESS */}

                {successMessage && (

                  <div className="mb-5 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-700 dark:text-green-400">

                    {successMessage}

                  </div>

                )}

                {/* GOOGLE */}

                

                <div className="my-6 flex items-center gap-3">


                </div>

                {/* ==================================================
                    EMAIL SIGNUP FORM
                ================================================== */}

                <form
                  onSubmit={handleSignup}
                  className="space-y-6"
                >

                  {/* PERSONAL */}

                  <div>

                    <h3 className="mb-3 text-sm font-semibold">
                      Personal information
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">

                      <div className="space-y-2">

                        <Label htmlFor="firstName">
                          First name
                        </Label>

                        <Input
                          id="firstName"
                          placeholder="First Name"
                          value={form.firstName}
                          onChange={(e) =>
                            updateField(
                              "firstName",
                              e.target.value
                            )
                          }
                          required
                          disabled={loading}
                        />

                      </div>

                      <div className="space-y-2">

                        <Label htmlFor="lastName">
                          Last name
                        </Label>

                        <Input
                          id="lastName"
                          placeholder="Last Name"
                          value={form.lastName}
                          onChange={(e) =>
                            updateField(
                              "lastName",
                              e.target.value
                            )
                          }
                          required
                          disabled={loading}
                        />

                      </div>

                    </div>

                  </div>

                  {/* CONTACT */}

                  <div>

                    <h3 className="mb-3 text-sm font-semibold">
                      Contact information
                    </h3>

                    <div className="space-y-4">

                      <div className="space-y-2">

                        <Label htmlFor="email">
                          Email address
                        </Label>

                        <div className="relative">

                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10"
                            value={form.email}
                            onChange={(e) =>
                              updateField(
                                "email",
                                e.target.value
                              )
                            }
                            required
                            disabled={loading}
                          />

                        </div>

                      </div>

                      <div className="space-y-2">

                        <Label htmlFor="phone">
                          Phone number
                        </Label>

                        <div className="relative">

                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+263 7X XXX XXXX"
                            className="pl-10"
                            value={form.phone}
                            onChange={(e) =>
                              updateField(
                                "phone",
                                e.target.value
                              )
                            }
                            disabled={loading}
                          />

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* ACADEMIC */}

                  <div>

                    <h3 className="mb-3 text-sm font-semibold">
                      Academic information
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">

                      <div className="space-y-2">

                        <Label htmlFor="level">
                          Current level / Form
                        </Label>

                        <div className="relative">

                          <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                          <select
                            id="level"
                            value={form.level}
                            onChange={(e) =>
                              updateField(
                                "level",
                                e.target.value
                              )
                            }
                            required
                            disabled={loading}
                            className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm"
                          >

                            <option value="">
                              Select level
                            </option>

                            <option value="Form 1">
                              Form 1
                            </option>

                            <option value="Form 2">
                              Form 2
                            </option>

                            <option value="Form 3">
                              Form 3
                            </option>

                            <option value="Form 4">
                              Form 4
                            </option>

                            <option value="Lower 6">
                              Lower 6
                            </option>

                            <option value="Upper 6">
                              Upper 6
                            </option>

                            <option value="Other">
                              Other
                            </option>

                          </select>

                        </div>

                      </div>

                      <div className="space-y-2">

                        <Label htmlFor="school">
                          School
                        </Label>

                        <div className="relative">

                          <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                          <Input
                            id="school"
                            placeholder="Your school"
                            className="pl-10"
                            value={form.school}
                            onChange={(e) =>
                              updateField(
                                "school",
                                e.target.value
                              )
                            }
                            required
                            disabled={loading}
                          />

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* GUARDIAN */}

                  <div>

                    <h3 className="mb-3 text-sm font-semibold">
                      Parent / Guardian
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">

                      <div className="space-y-2">

                        <Label htmlFor="guardianName">
                          Guardian name
                        </Label>

                        <div className="relative">

                          <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                          <Input
                            id="guardianName"
                            placeholder="Parent or guardian"
                            className="pl-10"
                            value={form.guardianName}
                            onChange={(e) =>
                              updateField(
                                "guardianName",
                                e.target.value
                              )
                            }
                            disabled={loading}
                          />

                        </div>

                      </div>

                      <div className="space-y-2">

                        <Label htmlFor="guardianPhone">
                          Guardian phone
                        </Label>

                        <Input
                          id="guardianPhone"
                          type="tel"
                          placeholder="+263 7X XXX XXXX"
                          value={form.guardianPhone}
                          onChange={(e) =>
                            updateField(
                              "guardianPhone",
                              e.target.value
                            )
                          }
                          disabled={loading}
                        />

                      </div>

                    </div>

                  </div>

                  {/* PASSWORD */}

                  <div>

                    <h3 className="mb-3 text-sm font-semibold">
                      Account security
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">

                      <div className="space-y-2">

                        <Label htmlFor="password">
                          Password
                        </Label>

                        <div className="relative">

                          <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                          <Input
                            id="password"
                            type={
                              showPassword
                                ? "text"
                                : "password"
                            }
                            placeholder="Create password"
                            className="pl-10 pr-10"
                            value={form.password}
                            onChange={(e) =>
                              updateField(
                                "password",
                                e.target.value
                              )
                            }
                            minLength={8}
                            required
                            disabled={loading}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword(
                                !showPassword
                              )
                            }
                            disabled={loading}
                            className="absolute right-3 top-2.5 text-muted-foreground"
                          >

                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}

                          </button>

                        </div>

                      </div>

                      <div className="space-y-2">

                        <Label htmlFor="confirmPassword">
                          Confirm password
                        </Label>

                        <div className="relative">

                          <Input
                            id="confirmPassword"
                            type={
                              showConfirmPassword
                                ? "text"
                                : "password"
                            }
                            placeholder="Repeat password"
                            className="pr-10"
                            value={
                              form.confirmPassword
                            }
                            onChange={(e) =>
                              updateField(
                                "confirmPassword",
                                e.target.value
                              )
                            }
                            minLength={8}
                            required
                            disabled={loading}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(
                                !showConfirmPassword
                              )
                            }
                            disabled={loading}
                            className="absolute right-3 top-2.5 text-muted-foreground"
                          >

                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}

                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* SECURITY */}

                  <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">

                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                    <p className="text-xs leading-5 text-muted-foreground">

                      Your account information is securely
                      stored and is used to provide your
                      GlobeDK learning experience. By
                      creating an account, you agree to the
                      academy&apos;s terms and privacy policy.

                    </p>

                  </div>

                  {/* SUBMIT */}

                  <Button
                    type="submit"
                    className="h-11 w-full"
                    disabled={
                      loading ||
                      googleLoading
                    }
                  >

                    {loading
                      ? "Creating account..."
                      : "Create student account"}

                    {!loading && (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}

                  </Button>

                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">

                  Already have an account?{" "}

                  <Link
                    href="/login"
                    className="font-semibold text-primary hover:underline"
                  >
                    Sign in
                  </Link>

                </p>

              </CardContent>

            </Card>

          </div>

        </div>

      </div>
    </main>
  )
}