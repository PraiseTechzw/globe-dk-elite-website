"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
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

export default function LoginPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] =
    useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const [errorMessage, setErrorMessage] =
    useState("")

  const [successMessage, setSuccessMessage] =
    useState("")

  // ============================================================
  // EMAIL + PASSWORD LOGIN
  // ============================================================

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setErrorMessage("")
    setSuccessMessage("")

    // ============================================================
    // CLIENT VALIDATION
    // ============================================================

    const cleanEmail = email
      .trim()
      .toLowerCase()

    if (!cleanEmail) {
      setErrorMessage(
        "Please enter your email address."
      )
      return
    }

    if (!password) {
      setErrorMessage(
        "Please enter your password."
      )
      return
    }

    try {
      setLoading(true)

      // ==========================================================
      // SEND TO CUSTOM LOGIN API
      // ==========================================================

      const response = await fetch("/api/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          email: cleanEmail,
          password,
        }),
      })

      // ==========================================================
      // READ RESPONSE
      // ==========================================================

      const responseText =
        await response.text()

      console.log(
        "Login API status:",
        response.status
      )

      console.log(
        "Login API content-type:",
        response.headers.get(
          "content-type"
        )
      )

      console.log(
        "Raw login API response:",
        responseText
      )

      // ==========================================================
      // PARSE JSON
      // ==========================================================

      let result: {
        success?: boolean
        message?: string
        redirectTo?: string

        user?: {
          id?: string
          email?: string
          firstName?: string
          lastName?: string
          role?: string
        }
      } = {}

      try {
        result = JSON.parse(
          responseText
        )
      } catch (jsonError) {
        console.error(
          "Login API did not return valid JSON:",
          jsonError
        )

        setErrorMessage(
          `The login server returned an unexpected response. HTTP status: ${response.status}`
        )

        return
      }

      // ==========================================================
      // LOGIN ERROR
      // ==========================================================

      if (
        !response.ok ||
        !result.success
      ) {
        setErrorMessage(
          result.message ||
            "Unable to sign in."
        )

        return
      }

      // ==========================================================
      // LOGIN SUCCESS
      // ==========================================================

      const redirectTo =
        result.redirectTo ||
        "/student/dashboard"

      console.log(
        "Login successful:",
        result.user
      )

      console.log(
        "Redirecting to:",
        redirectTo
      )

      setSuccessMessage(
        "Login successful. Redirecting..."
      )

      // ==========================================================
      // REDIRECT
      // ==========================================================

      router.replace(redirectTo)

      router.refresh()
    } catch (error) {
      console.error(
        "Unexpected email login error:",
        error
      )

      setErrorMessage(
        "Unable to connect to the server. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ====================================================
            LEFT SIDE - BRANDING
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

            {/* MAIN MESSAGE */}

            <div className="max-w-xl text-primary-foreground">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <Sparkles className="h-7 w-7" />
              </div>

              <h1 className="text-4xl font-bold tracking-tight xl:text-5xl">
                Prepare smarter.
                <br />
                Learn better.
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 opacity-85">
                Access intelligent examination analysis,
                personalised practice and AI-powered
                learning tools designed to help students
                prepare with confidence.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <ShieldCheck className="h-4 w-4" />
                  </div>

                  <span className="text-sm">
                    Secure student account
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <GraduationCap className="h-4 w-4" />
                  </div>

                  <span className="text-sm">
                    Examination-focused learning
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <Sparkles className="h-4 w-4" />
                  </div>

                  <span className="text-sm">
                    AI-powered study assistance
                  </span>
                </div>

              </div>
            </div>

            <p className="text-xs text-primary-foreground/60">
              © {new Date().getFullYear()} GlobeDK Elite Academy.
              All rights reserved.
            </p>

          </div>
        </div>

        {/* ====================================================
            RIGHT SIDE - LOGIN
        ==================================================== */}

        <div className="flex items-center justify-center p-6 sm:p-10">

          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}

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
                    className="object-contain"
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

            <Card className="border-0 shadow-none sm:border sm:shadow-sm">

              <CardHeader className="space-y-2">

                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <LockKeyhole className="h-5 w-5 text-primary" />
                </div>

                <CardTitle className="text-2xl">
                  Welcome back
                </CardTitle>

                <CardDescription>
                  Sign in to continue to your GlobeDK
                  learning dashboard.
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

                {/* LOGIN FORM */}

                <form
                  onSubmit={handleLogin}
                  className="space-y-5"
                >

                  {/* EMAIL */}

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
                        value={email}
                        onChange={(e) =>
                          setEmail(
                            e.target.value
                          )
                        }
                        className="h-11 pl-10"
                        required
                        disabled={loading}
                        autoComplete="email"
                      />

                    </div>

                  </div>

                  {/* PASSWORD */}

                  <div className="space-y-2">

                    <div className="flex items-center justify-between">

                      <Label htmlFor="password">
                        Password
                      </Label>

                      <Link
                        href="/forgot-password"
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>

                    </div>

                    <div className="relative">

                      <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                      <Input
                        id="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                          setPassword(
                            e.target.value
                          )
                        }
                        className="h-11 pl-10 pr-10"
                        required
                        disabled={loading}
                        autoComplete="current-password"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                        disabled={loading}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>

                    </div>

                  </div>

                  {/* SUBMIT */}

                  <Button
                    type="submit"
                    className="h-11 w-full"
                    disabled={loading}
                  >
                    {loading
                      ? "Signing in..."
                      : "Sign in"}

                    {!loading && (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}
                  </Button>

                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}

                  <Link
                    href="/signup"
                    className="font-semibold text-primary hover:underline"
                  >
                    Create an account
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