"use client"

import Link from "next/link"
import {
  BarChart3,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  FileText,
  GraduationCap,
  LogOut,
  MessageSquare,
  Settings,
  Sparkles,
  TrendingUp,
  Upload,
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
import { Badge } from "@/components/ui/badge"

export default function TutorDashboard() {
  const tutorActions = [
    {
      title: "My Students",
      description:
        "View students assigned to you and monitor their learning progress.",
      href: "/tutor/students",
      icon: Users,
    },
    {
      title: "Create Practice",
      description:
        "Create questions, assignments and practice materials.",
      href: "/tutor/practice",
      icon: BookOpen,
    },
    {
      title: "AI Question Analysis",
      description:
        "Use AI tools to analyse questions and identify relevant topics.",
      href: "/tutor/ai-analysis",
      icon: Brain,
    },
    {
      title: "Resources",
      description:
        "Manage learning resources and teaching materials.",
      href: "/tutor/resources",
      icon: FileText,
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
                Tutor Portal
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">

            <Badge
              variant="secondary"
              className="hidden sm:flex"
            >
              Tutor
            </Badge>

            <Button
              variant="ghost"
              size="icon"
              asChild
            >
              <Link href="/tutor/settings">
                <Settings className="h-5 w-5" />
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
                Tutor Dashboard
              </Badge>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Welcome back, Tutor 👋
              </h1>

              <p className="mt-2 max-w-2xl text-muted-foreground">
                Support your students with teaching resources,
                performance insights and AI-powered examination tools.
              </p>

            </div>

            <Button asChild>
              <Link href="/tutor/practice">
                <BookOpen className="mr-2 h-4 w-4" />
                Create Practice
              </Link>
            </Button>

          </div>

        </section>

        {/* Stats */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">

                <div>
                  <p className="text-sm text-muted-foreground">
                    My Students
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    0
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Assigned students
                  </p>
                </div>

                <Users className="h-6 w-6 text-primary" />

              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">

                <div>
                  <p className="text-sm text-muted-foreground">
                    Assignments
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    0
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Active
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
                    Resources
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    0
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Teaching materials
                  </p>
                </div>

                <FileText className="h-6 w-6 text-primary" />

              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">

                <div>
                  <p className="text-sm text-muted-foreground">
                    Average Progress
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    --%
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Student performance
                  </p>
                </div>

                <TrendingUp className="h-6 w-6 text-primary" />

              </div>
            </CardContent>
          </Card>

        </section>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Tutor Actions */}
          <Card className="lg:col-span-2">

            <CardHeader>

              <CardTitle>
                Teaching Centre
              </CardTitle>

              <CardDescription>
                Tools for managing your students and teaching
                activities.
              </CardDescription>

            </CardHeader>

            <CardContent>

              <div className="grid gap-4 sm:grid-cols-2">

                {tutorActions.map((action) => {

                  const Icon = action.icon

                  return (
                    <Link
                      key={action.title}
                      href={action.href}
                      className="group rounded-xl border p-5 transition-all hover:border-primary/50 hover:bg-muted/50"
                    >

                      <div className="flex items-start justify-between">

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

            </CardContent>

          </Card>

          {/* Schedule */}
          <Card>

            <CardHeader>

              <CardTitle>
                Today's Schedule
              </CardTitle>

              <CardDescription>
                Your upcoming activities
              </CardDescription>

            </CardHeader>

            <CardContent>

              <div className="flex flex-col items-center justify-center py-10 text-center">

                <CalendarDays className="h-10 w-10 text-muted-foreground" />

                <h3 className="mt-4 font-semibold">
                  No activities scheduled
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Your classes and activities will appear here.
                </p>

                <Button
                  asChild
                  variant="outline"
                  className="mt-5"
                >
                  <Link href="/tutor/timetable">
                    View Timetable
                  </Link>
                </Button>

              </div>

            </CardContent>

          </Card>

        </div>

        {/* AI Tutor Tools */}
        <section className="mt-6">

          <Card>

            <CardContent className="p-0">

              <div className="grid md:grid-cols-2">

                <div className="p-6 md:p-8">

                  <Badge className="mb-4">
                    <Sparkles className="mr-1 h-3 w-3" />
                    AI Teaching Assistant
                  </Badge>

                  <h2 className="text-2xl font-bold">
                    Use AI to support your teaching
                  </h2>

                  <p className="mt-3 text-muted-foreground">
                    Analyse examination questions, identify topics,
                    generate practice materials and help students
                    understand difficult concepts.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">

                    <Button asChild>
                      <Link href="/tutor/ai-analysis">
                        <Brain className="mr-2 h-4 w-4" />
                        Open AI Tools
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      asChild
                    >
                      <Link href="/tutor/resources">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Resource
                      </Link>
                    </Button>

                  </div>

                </div>

                <div className="flex items-center justify-center bg-primary/5 p-8">

                  <div className="grid grid-cols-2 gap-4">

                    <div className="rounded-xl border bg-background p-5 text-center">
                      <Brain className="mx-auto h-7 w-7 text-primary" />

                      <p className="mt-2 text-sm font-medium">
                        AI Analysis
                      </p>
                    </div>

                    <div className="rounded-xl border bg-background p-5 text-center">
                      <BarChart3 className="mx-auto h-7 w-7 text-primary" />

                      <p className="mt-2 text-sm font-medium">
                        Analytics
                      </p>
                    </div>

                    <div className="rounded-xl border bg-background p-5 text-center">
                      <MessageSquare className="mx-auto h-7 w-7 text-primary" />

                      <p className="mt-2 text-sm font-medium">
                        Student Support
                      </p>
                    </div>

                    <div className="rounded-xl border bg-background p-5 text-center">
                      <CheckCircle2 className="mx-auto h-7 w-7 text-primary" />

                      <p className="mt-2 text-sm font-medium">
                        Assessments
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </CardContent>

          </Card>

        </section>

      </div>

    </main>
  )
}