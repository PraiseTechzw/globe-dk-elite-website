"use client"

import {
  FormEvent,
  Suspense,
  useState,
} from "react"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] =
    useState("")

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setError("")

    if (!token) {
      setError(
        "This password reset link is invalid or missing its token."
      )
      return
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters long."
      )
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        "/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        setError(
          result.message ||
            "Unable to reset your password. Please try again."
        )
        return
      }

      setSuccess(true)
      setPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.error(
        "Password reset error:",
        error
      )

      setError(
        "Something went wrong while resetting your password. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-8">
            <h1 className="text-3xl font-bold text-destructive">
              Invalid Reset Link
            </h1>

            <p className="mt-4 text-sm text-muted-foreground">
              This password reset link is missing its
              token or is invalid.
            </p>

            <Link
              href="/forgot-password"
              className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground"
            >
              Request a New Link
            </Link>
          </div>
        </div>
      </main>
    )
  }

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-8">
            <h1 className="text-3xl font-bold text-green-600">
              Password Reset Successfully
            </h1>

            <p className="mt-4 text-sm text-muted-foreground">
              Your password has been updated successfully.
              You can now sign in using your new password.
            </p>

            <Link
              href="/login"
              className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground"
            >
              Continue to Sign In
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">

          <div className="text-center">
            <h1 className="text-3xl font-bold">
              Reset Password
            </h1>

            <p className="mt-3 text-sm text-muted-foreground">
              Enter your new password below.
            </p>
          </div>

          {error && (
            <div
              className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              role="alert"
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                New Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter your new password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                disabled={loading}
                required
                minLength={8}
                className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <p className="mt-2 text-xs text-muted-foreground">
                Password must be at least 8 characters.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium"
              >
                Confirm New Password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                disabled={loading}
                required
                minLength={8}
                className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Resetting Password..."
                : "Reset Password"}
            </button>
          </form>

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

function ResetPasswordLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold">
          Reset Password
        </h1>

        <p className="mt-4 text-sm text-muted-foreground">
          Loading password reset...
        </p>
      </div>
    </main>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordContent />
    </Suspense>
  )
}