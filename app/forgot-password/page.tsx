"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setMessage("")
    setError("")

    const normalizedEmail =
      email.trim().toLowerCase()

    if (!normalizedEmail) {
      setError("Please enter your email address.")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        "/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: normalizedEmail,
          }),
        }
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        setError(
          result.message ||
            "Unable to process your request. Please try again."
        )
        return
      }

      setMessage(
        "If an account exists with that email address, a password reset link has been sent. Please check your email."
      )

      setEmail("")
    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      )

      setError(
        "Something went wrong. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          {/* Header */}

          <div className="text-center">
            <h1 className="text-3xl font-bold">
              Forgot Password?
            </h1>

            <p className="mt-3 text-sm text-muted-foreground">
              Enter your email address and we'll
              send you a link to reset your password.
            </p>
          </div>

          {/* Success */}

          {message && (
            <div
              className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
              role="status"
            >
              {message}
            </div>
          )}

          {/* Error */}

          {error && (
            <div
              className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                disabled={loading}
                required
                className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Sending Reset Link..."
                : "Send Reset Link"}
            </button>
          </form>

          {/* Back to login */}

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm font-medium text-primary hover:underline"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}