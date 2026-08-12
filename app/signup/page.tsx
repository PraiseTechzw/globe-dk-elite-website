"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
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
  Sparkles,
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

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [loading, setLoading] = useState(false)

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

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.")
      return
    }

    setLoading(true)

    // Supabase signup will be connected here
    console.log(form)

    setLoading(false)
  }

  const handleGoogleSignup = async () => {
    // Supabase Google OAuth will be connected here
    console.log("Google signup")
  }

  return (
    <main className="min-h-screen bg-muted/30">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT BRANDING */}
        <div className="relative hidden overflow-hidden bg-primary lg:flex">

          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-16">

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
                Create your GlobeDK Elite Academy account and gain
                access to tools designed to make examination
                preparation more intelligent and effective.
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

        {/* FORM */}
        <div className="flex items-center justify-center p-5 sm:p-8">

          <div className="w-full max-w-xl">

            {/* Mobile branding */}
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
                  Tell us a little about yourself so we can
                  personalise your learning experience.
                </CardDescription>

              </CardHeader>

              <CardContent>

                {/* Google */}
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full"
                  onClick={handleGoogleSignup}
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

                  Sign up with Google
                </Button>

                <div className="my-6 flex items-center gap-3">

                  <Separator className="flex-1" />

                  <span className="text-xs text-muted-foreground">
                    OR CREATE WITH EMAIL
                  </span>

                  <Separator className="flex-1" />

                </div>

                <form
                  onSubmit={handleSignup}
                  className="space-y-6"
                >

                  {/* Personal Information */}
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
                        />

                      </div>

                    </div>

                  </div>

                  {/* Contact */}
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
                          />

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Academic Information */}
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
                          />

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Guardian */}
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
                        />

                      </div>

                    </div>

                  </div>

                  {/* Password */}
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
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword(
                                !showPassword
                              )
                            }
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
                            value={form.confirmPassword}
                            onChange={(e) =>
                              updateField(
                                "confirmPassword",
                                e.target.value
                              )
                            }
                            minLength={8}
                            required
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(
                                !showConfirmPassword
                              )
                            }
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

                  {/* Terms */}
                  <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">

                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                    <p className="text-xs leading-5 text-muted-foreground">
                      Your account information is securely stored
                      and is used to provide your GlobeDK learning
                      experience. By creating an account, you agree
                      to the academy's terms and privacy policy.
                    </p>

                  </div>

                  <Button
                    type="submit"
                    className="h-11 w-full"
                    disabled={loading}
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