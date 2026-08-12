"use client"

import Link from "next/link"
import {
  BarChart3,
  Brain,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileQuestion,
  GraduationCap,
  LogOut,
  Play,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function StudentDashboard() {
  const quickActions = [
    {
      title: "AI Exam Predictor",
      description:
        "Explore historical examination patterns and AI-generated topic likelihoods.",
      href: "/exam-predictor",
      icon: Brain,
      featured: true,
    },
    {
      title: "Generate Mock Test",
      description:
        "Practice with an AI-generated examination based on historical patterns.",
      href: "/mock-exams",
      icon: FileQuestion,
    },
    {
      title: "Practice Questions",
      description:
        "Strengthen your understanding by practising questions by topic.",
      href: "/practice",
      icon: BookOpen,
    },
    {
      title: "Upload a Question",
      description:
        "Upload an image of a question and get AI assistance.",
      href: "/question-helper",
      icon: Upload,
    },
  ]

  return (
    <main className="min-h-screen bg-muted/30">

      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>

            <div>
              <p className="font-bold leading-none">
                GlobeDK Elite Academy
              </p>
              <p className="text-xs text-muted-foreground">
                Student Portal
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
            >
              <Link href="/student/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            <Button variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">

        {/* Welcome */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <Badge className="mb-3">
                Student Dashboard
              </Badge>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Welcome back, Student 👋
              </h1>

              <p className="mt-2 max-w-2xl text-muted-foreground">
                Prepare smarter with historical examination analysis,
                personalised practice and AI-powered study assistance.
              </p>
            </div>

            <Button asChild size="lg">
              <Link href="/exam-predictor">
                <Sparkles className="mr-2 h-4 w-4" />
                Explore AI Predictor
              </Link>
            </Button>

          </div>
        </section>

        {/* Student Stats */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Mock Tests
                  </p>
                  <p className="mt-2 text-3xl font-bold">0</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Completed
                  </p>
                </div>

                <FileQuestion className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Average Score
                  </p>
                  <p className="mt-2 text-3xl font-bold">--%</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Keep practising
                  </p>
                </div>

                <Target className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Questions Practised
                  </p>
                  <p className="mt-2 text-3xl font-bold">0</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Total
                  </p>
                </div>

                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Study Progress
                  </p>
                  <p className="mt-2 text-3xl font-bold">0%</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Overall
                  </p>
                </div>

                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>

        </section>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* AI Feature */}
          <Card className="border-primary/20 lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />

                <CardTitle>
                  AI Examination Intelligence
                </CardTitle>
              </div>

              <CardDescription>
                Use historical examination patterns to guide your
                preparation.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="rounded-xl bg-primary/5 p-6">

                <h3 className="text-xl font-semibold">
                  What should you revise next?
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  GlobeDK analyses historical examination questions
                  and identifies recurring topics and patterns.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">

                  <div className="rounded-lg border bg-background p-4">
                    <Brain className="h-5 w-5 text-primary" />

                    <p className="mt-3 font-medium">
                      Pattern Analysis
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Historical question patterns
                    </p>
                  </div>

                  <div className="rounded-lg border bg-background p-4">
                    <BarChart3 className="h-5 w-5 text-primary" />

                    <p className="mt-3 font-medium">
                      Topic Frequency
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      See how often topics appear
                    </p>
                  </div>

                  <div className="rounded-lg border bg-background p-4">
                    <TrendingUp className="h-5 w-5 text-primary" />

                    <p className="mt-3 font-medium">
                      Likelihood
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      AI-assisted revision priorities
                    </p>
                  </div>

                </div>

                <Button asChild className="mt-6">
                  <Link href="/exam-predictor">
                    Open Exam Predictor
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

              </div>
            </CardContent>
          </Card>

          {/* Study Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Study</CardTitle>
              <CardDescription>
                Your recommended activities
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="flex items-start gap-3 rounded-lg border p-4">
                <BookOpen className="mt-0.5 h-5 w-5 text-primary" />

                <div className="flex-1">
                  <p className="font-medium">
                    Topic Practice
                  </p>

                  <p className="text-xs text-muted-foreground">
                    No study plan generated yet
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border p-4">
                <Clock3 className="mt-0.5 h-5 w-5 text-primary" />

                <div className="flex-1">
                  <p className="font-medium">
                    Mock Examination
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Start your first mock test
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <Link href="/study-plan">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  View Study Plan
                </Link>
              </Button>

            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <section className="mt-6">

          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              Learning Centre
            </h2>

            <p className="text-sm text-muted-foreground">
              Tools to help you prepare for your examinations.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {quickActions.map((action) => {
              const Icon = action.icon

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`group rounded-xl border bg-background p-5 transition-all hover:border-primary/50 hover:shadow-sm ${
                    action.featured
                      ? "border-primary/30 bg-primary/5"
                      : ""
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>

                  <h3 className="mt-4 font-semibold">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </Link>
              )
            })}

          </div>
        </section>

        {/* Progress */}
        <section className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Learning Progress</CardTitle>
              <CardDescription>
                Your academic performance will appear here as you
                practise.
              </CardDescription>
            </CardHeader>

            <CardContent>

              <div className="flex items-center justify-center py-10 text-center">
                <div>
                  <CheckCircle2 className="mx-auto h-10 w-10 text-muted-foreground" />

                  <h3 className="mt-4 font-semibold">
                    Start your first practice session
                  </h3>

                  <p className="mt-1 max-w-md text-sm text-muted-foreground">
                    Complete mock examinations and practice questions
                    to build your personalised performance profile.
                  </p>

                  <Button asChild className="mt-5">
                    <Link href="/mock-exams">
                      <Play className="mr-2 h-4 w-4" />
                      Start Practising
                    </Link>
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>
        </section>

      </div>
    </main>
  )
}