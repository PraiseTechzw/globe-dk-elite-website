"use client"

import Link from "next/link"
import {
  BarChart3,
  BookOpen,
  Brain,
  Database,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  Upload,
  ChevronRight,
  TrendingUp,
  Clock3,
  CheckCircle2,
  AlertCircle,
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

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "0",
      description: "Registered students",
      icon: Users,
    },
    {
      title: "Exam Papers",
      value: "0",
      description: "Historical papers",
      icon: FileText,
    },
    {
      title: "Questions Analysed",
      value: "0",
      description: "AI processed questions",
      icon: Brain,
    },
    {
      title: "Subjects",
      value: "0",
      description: "Active subjects",
      icon: BookOpen,
    },
  ]

  const quickActions = [
    {
      title: "Upload Exam Paper",
      description:
        "Add a new ZIMSEC examination paper in PDF or image format.",
      href: "/admin/datasets",
      icon: Upload,
    },
    {
      title: "Manage Dataset",
      description:
        "View, organise and manage historical examination sessions.",
      href: "/admin/datasets",
      icon: Database,
    },
    {
      title: "AI Analysis",
      description:
        "Review question extraction, classification and historical patterns.",
      href: "/admin/ai-analysis",
      icon: Brain,
    },
    {
      title: "Manage Students",
      description:
        "View student accounts, enrollments and academic information.",
      href: "/admin/students",
      icon: Users,
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
                Administration
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden sm:flex gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Administrator
            </Badge>

            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
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
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Badge>
                  <ShieldCheck className="mr-1 h-3 w-3" />
                  Admin Portal
                </Badge>
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Welcome to the Admin Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-muted-foreground">
                Manage GlobeDK Elite Academy, examination datasets,
                students, tutors and the AI examination intelligence
                platform from one place.
              </p>
            </div>

            <Button asChild>
              <Link href="/admin/datasets">
                <Upload className="mr-2 h-4 w-4" />
                Upload Exam Paper
              </Link>
            </Button>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.title}
                      </p>

                      <p className="mt-2 text-3xl font-bold">
                        {stat.value}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>

                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        {/* Main dashboard */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Management Centre</CardTitle>
              <CardDescription>
                Manage the core components of the GlobeDK platform.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {quickActions.map((action) => {
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

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                AI platform health
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Database</span>
                </div>

                <Badge variant="secondary">Ready</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Authentication</span>
                </div>

                <Badge variant="secondary">Ready</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">AI Analysis</span>
                </div>

                <Badge variant="outline">Waiting</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Dataset</span>
                </div>

                <Badge variant="outline">Not configured</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Intelligence */}
        <section className="mt-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">

                <div className="p-6 md:p-8">
                  <Badge className="mb-4">
                    <Sparkles className="mr-1 h-3 w-3" />
                    AI Examination Intelligence
                  </Badge>

                  <h2 className="text-2xl font-bold">
                    Build the examination intelligence dataset
                  </h2>

                  <p className="mt-3 text-muted-foreground">
                    Upload historical examination papers and allow the
                    system to extract questions, identify topics,
                    analyse repetition patterns and prepare the data
                    required for future predictions.
                  </p>

                  <Button asChild className="mt-6">
                    <Link href="/admin/datasets">
                      Manage Examination Dataset
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center justify-center bg-primary/5 p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border bg-background p-5 text-center">
                      <Database className="mx-auto h-7 w-7 text-primary" />
                      <p className="mt-2 text-sm font-medium">
                        Historical Papers
                      </p>
                    </div>

                    <div className="rounded-xl border bg-background p-5 text-center">
                      <Brain className="mx-auto h-7 w-7 text-primary" />
                      <p className="mt-2 text-sm font-medium">
                        AI Analysis
                      </p>
                    </div>

                    <div className="rounded-xl border bg-background p-5 text-center">
                      <BarChart3 className="mx-auto h-7 w-7 text-primary" />
                      <p className="mt-2 text-sm font-medium">
                        Patterns
                      </p>
                    </div>

                    <div className="rounded-xl border bg-background p-5 text-center">
                      <TrendingUp className="mx-auto h-7 w-7 text-primary" />
                      <p className="mt-2 text-sm font-medium">
                        Predictions
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