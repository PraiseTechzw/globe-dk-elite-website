"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react"

import { createClient } from "@/lib/supabaseClient"

export default function AuthCallbackPage() {
  const router = useRouter()
  const supabase = createClient()

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading")

  const [message, setMessage] = useState(
    "Completing your account verification..."
  )

  useEffect(() => {
    let mounted = true

    const handleCallback = async () => {
      try {
        /*
         * ============================================================
         * 1. CHECK URL HASH
         *
         * Supabase may redirect to:
         *
         * /auth/callback#access_token=...&refresh_token=...
         *
         * Everything after "#" is available only in the browser.
         * ============================================================
         */

        const hash = window.location.hash.substring(1)

        if (!hash) {
          /*
           * There may be no hash if Supabase has already established
           * the session using another authentication flow.
           */

          const {
            data: { session },
            error,
          } = await supabase.auth.getSession()

          if (error) {
            throw error
          }

          if (!session) {
            throw new Error(
              "No authentication session was found."
            )
          }

          await redirectUser(session.user)

          return
        }

        /*
         * ============================================================
         * 2. CONVERT HASH INTO PARAMETERS
         * ============================================================
         */

        const params = new URLSearchParams(hash)

        const accessToken = params.get("access_token")
        const refreshToken = params.get("refresh_token")
        const type = params.get("type")

        /*
         * Check whether Supabase returned an authentication error.
         */

        const errorDescription =
          params.get("error_description")

        if (errorDescription) {
          throw new Error(
            decodeURIComponent(errorDescription.replace(/\+/g, " "))
          )
        }

        /*
         * ============================================================
         * 3. ESTABLISH SUPABASE SESSION
         * ============================================================
         */

        if (accessToken && refreshToken) {
          const { data, error } =
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            })

          if (error) {
            throw error
          }

          if (!data.session || !data.user) {
            throw new Error(
              "Unable to establish your authentication session."
            )
          }

          /*
           * ========================================================
           * 4. DETERMINE AUTHENTICATION TYPE
           * ========================================================
           *
           * For email confirmation:
           *
           * type=signup
           *
           * For recovery:
           *
           * type=recovery
           *
           * Google OAuth normally won't use this exact signup type.
           */

          if (type === "signup") {
            if (mounted) {
              setStatus("success")
              setMessage(
                "Your email has been verified successfully. Welcome to GlobeDK Elite Academy!"
              )
            }
          }

          /*
           * ========================================================
           * 5. REDIRECT USER
           * ========================================================
           */

          await redirectUser(data.user)

          return
        }

        /*
         * ============================================================
         * 6. FALLBACK: CHECK EXISTING SESSION
         * ============================================================
         */

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        if (!session) {
          throw new Error(
            "Your authentication link is invalid or has expired."
          )
        }

        await redirectUser(session.user)
      } catch (error) {
        console.error("Auth callback error:", error)

        if (!mounted) return

        setStatus("error")

        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to complete authentication."
        )
      }
    }

    /*
     * Small delay makes the callback screen feel intentional
     * instead of flashing during redirects.
     */

    const timer = setTimeout(() => {
      handleCallback()
    }, 300)

    return () => {
      mounted = false
      clearTimeout(timer)
    }
  }, [])

  /*
   * ================================================================
   * REDIRECT USER BASED ON ROLE
   * ================================================================
   */

  const redirectUser = async (user: any) => {
    const role =
      user.user_metadata?.role ||
      user.app_metadata?.role ||
      "student"

    /*
     * Remove authentication tokens from the visible URL.
     *
     * Example:
     *
     * /auth/callback#access_token=...
     *
     * becomes:
     *
     * /auth/callback
     */

    window.history.replaceState(
      {},
      document.title,
      "/auth/callback"
    )

    /*
     * Give the UI a moment to show success.
     */

    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    )

    switch (role) {
      case "admin":
        router.replace("/admin/dashboard")
        break

      case "tutor":
        router.replace("/tutor/dashboard")
        break

      case "student":
      default:
        router.replace("/student/dashboard")
        break
    }

    router.refresh()
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-background p-8 text-center shadow-sm">

          {/* LOGO */}

          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border">
              <Image
                src="/Logo.png"
                alt="GlobeDK Elite Academy"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* LOADING */}

          {status === "loading" && (
            <>
              <div className="mb-5 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              </div>

              <h1 className="text-xl font-semibold">
                Verifying your account
              </h1>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {message}
              </p>
            </>
          )}

          {/* SUCCESS */}

          {status === "success" && (
            <>
              <div className="mb-5 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>

              <h1 className="text-xl font-semibold">
                Account verified!
              </h1>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {message}
              </p>

              <p className="mt-5 text-xs text-muted-foreground">
                Taking you to your dashboard...
              </p>
            </>
          )}

          {/* ERROR */}

          {status === "error" && (
            <>
              <div className="mb-5 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
              </div>

              <h1 className="text-xl font-semibold">
                Verification failed
              </h1>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {message}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="h-11 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                  Return to sign in
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="h-11 rounded-lg border px-4 text-sm font-medium transition hover:bg-muted"
                >
                  Create a new account
                </button>
              </div>
            </>
          )}

          <div className="mt-8 border-t pt-5">
            <p className="text-xs text-muted-foreground">
              GlobeDK Elite Academy
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Excellence Through Education
            </p>
          </div>

        </div>
      </div>
    </main>
  )
}