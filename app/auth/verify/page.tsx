"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function VerifyPage() {
  const searchParams = useSearchParams()

  const [status, setStatus] = useState<
    "verifying" | "success" | "error"
  >("verifying")

  const [message, setMessage] = useState(
    "Please wait while we verify your account."
  )

  useEffect(() => {
    const token = searchParams.get("token")

    if (!token) {
      setStatus("error")
      setMessage(
        "The verification link is missing its token."
      )
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `/api/auth/verify-email?token=${encodeURIComponent(token)}`
        )

        const result = await response.json()

        if (!response.ok || !result.success) {
          setStatus("error")
          setMessage(
            result.message ||
              "Unable to verify your email."
          )
          return
        }

        setStatus("success")
        setMessage(
          result.message ||
            "Your email has been successfully verified."
        )
      } catch (error) {
        console.error(
          "Email verification error:",
          error
        )

        setStatus("error")
        setMessage(
          "Something went wrong while verifying your email."
        )
      }
    }

    verifyEmail()
  }, [searchParams])

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md text-center">
        {status === "verifying" && (
          <>
            <h1 className="text-3xl font-bold">
              Verifying Email...
            </h1>

            <p className="mt-4 text-muted-foreground">
              {message}
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-3xl font-bold text-green-600">
              Email Verified!
            </h1>

            <p className="mt-4 text-muted-foreground">
              {message}
            </p>

            <Link
              href="/login"
              className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-primary-foreground"
            >
              Continue to Sign In
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-3xl font-bold text-destructive">
              Verification Failed
            </h1>

            <p className="mt-4 text-muted-foreground">
              {message}
            </p>

            <Link
              href="/login"
              className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-primary-foreground"
            >
              Return to Sign In
            </Link>
          </>
        )}
      </div>
    </main>
  )
}