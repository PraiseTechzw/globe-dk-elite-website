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
import { Separator } from "@/components/ui/separator"

import { createClient } from "@/lib/supabaseClient"

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // ============================================================
  // EMAIL + PASSWORD LOGIN
  // ============================================================

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setErrorMessage("")
    setSuccessMessage("")

    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.")
      return
    }

    if (!password) {
      setErrorMessage("Please enter your password.")
      return
    }

    try {
      setLoading(true)

      // --------------------------------------------------------
      // CALL EMAIL LOGIN API
      // --------------------------------------------------------

      const response = await fetch("/api/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      })

      // --------------------------------------------------------
      // READ API RESPONSE
      // --------------------------------------------------------

      const result = await response.json()

      if (!response.ok || !result.success) {
        setErrorMessage(
          result.message || "Unable to sign in."
        )

        return
      }

      // --------------------------------------------------------
      // ESTABLISH SUPABASE SESSION IN BROWSER
      // --------------------------------------------------------

      if (
        result.session?.access_token &&
        result.session?.refresh_token
      ) {
        const {
          error: sessionError,
        } = await supabase.auth.setSession({
          access_token:
            result.session.access_token,

          refresh_token:
            result.session.refresh_token,
        })

        if (sessionError) {
          console.error(
            "Supabase session error:",
            sessionError
          )

          setErrorMessage(
            "Login succeeded, but we could not establish your session. Please try again."
          )

          return
        }
      }

      // --------------------------------------------------------
      // SUCCESS
      // --------------------------------------------------------

      setSuccessMessage(
        "Login successful. Redirecting..."
      )

      // --------------------------------------------------------
      // ROLE-BASED REDIRECT
      // --------------------------------------------------------

      const redirectTo =
        result.redirectTo ||
        "/student/dashboard"

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

  // ============================================================
  // GOOGLE LOGIN
  // ============================================================

  const handleGoogleLogin = async () => {
    setErrorMessage("")
    setSuccessMessage("")

    try {
      setLoading(true)

      // --------------------------------------------------------
      // GOOGLE OAUTH IS COMPLETELY SEPARATE
      // FROM EMAIL/PASSWORD LOGIN
      // --------------------------------------------------------

      const { error } =
        await supabase.auth.signInWithOAuth({
          provider: "google",

          options: {
            redirectTo:
              `${window.location.origin}/auth/callback`,
          },
        })

      if (error) {
        console.error(
          "Google login error:",
          error
        )

        setErrorMessage(
          error.message ||
            "Unable to continue with Google."
        )

        setLoading(false)

        return
      }

      // --------------------------------------------------------
      // IMPORTANT:
      //
      // Supabase redirects the browser to Google.
      //
      // After Google authentication, Supabase sends the
      // browser to:
      //
      // /auth/callback#access_token=...
      //
      // Your /auth/callback/page.tsx handles that session
      // and performs the role-based redirect.
      // --------------------------------------------------------
    } catch (error) {
      console.error(
        "Unexpected Google login error:",
        error
      )

      setErrorMessage(
        "Unable to connect to Google. Please try again."
      )

      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-muted/30">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE - BRANDING */}
        <div className="relative hidden overflow-hidden bg-primary lg:flex">

          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-16">

            {/* Logo */}
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

            {/* Main message */}
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

                Access intelligent examination analysis, personalised
                practice and AI-powered learning tools designed to help
                students prepare with confidence.

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

        {/* RIGHT SIDE - LOGIN */}
        <div className="flex items-center justify-center p-6 sm:p-10">

          <div className="w-full max-w-md">

            {/* Mobile logo */}
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
                  Sign in to continue to your GlobeDK learning
                  dashboard.
                </CardDescription>

              </CardHeader>

              <CardContent>

                {/* ==================================================
                    ERROR MESSAGE
                ================================================== */}

                {errorMessage && (
                  <div className="mb-5 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                    {errorMessage}
                  </div>
                )}

                {/* ==================================================
                    SUCCESS MESSAGE
                ================================================== */}

                {successMessage && (
                  <div className="mb-5 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-700 dark:text-green-400">
                    {successMessage}
                  </div>
                )}

                {/* Google */}
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >

                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                  >

                    <path
                      fill="currentColor"
                      d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.92-4.2 2.92-7.42Z"
                    />

                    <path
                      fill="currentColor"
                      d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.55 0-4.71-1.72-5.49-4.04H3.26v2.53A9.74 9.74 0 0 0 12 21.5Z"
                    />

                    <path
                      fill="currentColor"
                      d="M6.51 13.58A5.86 5.86 0 0 1 6.2 12c0-.55.1-1.08.31-1.58V7.89H3.26A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.01 4.11l3.25-2.53Z"
                    />

                    <path
                      fill="currentColor"
                      d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.39 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.74 5.39l3.25 2.53C7.29 8.1 9.45 6.38 12 6.38Z"
                    />

                  </svg>

                  {loading
                    ? "Please wait..."
                    : "Continue with Google"}

                </Button>

                <div className="my-6 flex items-center gap-3">

                  <Separator className="flex-1" />

                  <span className="text-xs text-muted-foreground">
                    OR
                  </span>

                  <Separator className="flex-1" />

                </div>

                {/* Login form */}
                <form
                  onSubmit={handleLogin}
                  className="space-y-5"
                >

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
                          setEmail(e.target.value)
                        }
                        className="h-11 pl-10"
                        required
                      />

                    </div>

                  </div>

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
                          setPassword(e.target.value)
                        }
                        className="h-11 pl-10 pr-10"
                        required
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
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