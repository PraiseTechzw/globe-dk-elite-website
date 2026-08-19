"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Video,
  Star,
  Calculator,
  Laptop,
  Globe,
  FileText,
  Atom,
  TrendingUp,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  Zap,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

const heroImages = [
  "/african-students-learning-in-modern-classroom.jpg",
  "/classroom-study-session.png",
  "/african-male-student.jpg",
  "/african-female-student-smiling.jpg",
];

const oLevelSubjects = [
  {
    name: "Mathematics",
    icon: Calculator,
    category: "Sciences",
    topics: ["Algebra", "Geometry", "Trigonometry", "Matrices", "Statistics"],
    fee: "From $15/mo",
    popular: true,
  },
  {
    name: "English Language",
    icon: FileText,
    category: "Languages",
    topics: ["Comprehension", "Composition", "Summary", "Grammar", "Registers"],
    fee: "From $15/mo",
    popular: true,
  },
  {
    name: "Combined Science",
    icon: Atom,
    category: "Sciences",
    topics: ["Biology", "Chemistry", "Physics", "Practical Skills", "Experiments"],
    fee: "From $15/mo",
    popular: true,
  },
  {
    name: "Computer Science",
    icon: Laptop,
    category: "Technology",
    topics: ["Programming", "Algorithms", "Data Representation", "Databases"],
    fee: "From $15/mo",
    popular: false,
  },
  {
    name: "Geography",
    icon: Globe,
    category: "Humanities",
    topics: ["Map Reading", "Weather & Climate", "Settlements", "Geomorphology"],
    fee: "From $15/mo",
    popular: false,
  },
  {
    name: "Principles of Accounts",
    icon: Calculator,
    category: "Commercials",
    topics: ["Double Entry", "Ledger Accounts", "Trial Balance", "Financial Statements"],
    fee: "From $15/mo",
    popular: false,
  },
  {
    name: "Commerce",
    icon: BookOpen,
    category: "Commercials",
    topics: ["Trade", "Banking", "Insurance", "Warehousing", "Marketing"],
    fee: "From $15/mo",
    popular: false,
  },
  {
    name: "Physics & Chemistry",
    icon: Atom,
    category: "Sciences",
    topics: ["Mechanics", "Electricity", "Organic Chemistry", "Acids & Bases"],
    fee: "From $15/mo",
    popular: false,
  },
];

const aLevelSubjects = [
  {
    name: "Pure Mathematics",
    icon: Calculator,
    category: "Sciences",
    topics: ["Calculus", "Vectors", "Complex Numbers", "Differential Equations", "Proof"],
    fee: "From $20/mo",
    popular: true,
  },
  {
    name: "Statistics",
    icon: Calculator,
    category: "Sciences",
    topics: ["Probability", "Distributions", "Hypothesis Testing", "Correlation", "Regression"],
    fee: "From $20/mo",
    popular: true,
  },
  {
    name: "Computer Science",
    icon: Laptop,
    category: "Technology",
    topics: ["Object-Oriented Programming", "Data Structures", "Software Engineering", "Systems"],
    fee: "From $20/mo",
    popular: true,
  },
  {
    name: "Business Studies",
    icon: BookOpen,
    category: "Commercials",
    topics: ["Management", "Marketing", "Finance & Accounting", "Operations", "Strategy"],
    fee: "From $20/mo",
    popular: false,
  },
  {
    name: "Economics",
    icon: TrendingUp,
    category: "Commercials",
    topics: ["Microeconomics", "Macroeconomics", "International Trade", "Development Policy"],
    fee: "From $20/mo",
    popular: false,
  },
  {
    name: "Advanced Geography",
    icon: Globe,
    category: "Humanities",
    topics: ["Hydrology", "Biogeography", "Population Dynamics", "Economic Development"],
    fee: "From $20/mo",
    popular: false,
  },
];

const testimonials = [
  {
    name: "Tapiwa Makumbe",
    role: "O-Level Graduate",
    quote:
      "GlobeDk Elite transformed my understanding of Mathematics. I went from struggling with basic algebra and scoring Ds to achieving an A* in my final examinations!",
    subject: "Mathematics (ZIMSEC)",
    improvement: "From D to A*",
    image: "/african-student-portrait.jpg",
  },
  {
    name: "Rudo Makore",
    role: "A-Level Graduate",
    quote:
      "The Computer Science and Pure Maths lessons are world-class. Tutor John makes complex algorithmic concepts and calculus straightforward and intuitive.",
    subject: "Computer Science & Pure Maths",
    improvement: "Straight A Grades",
    image: "/african-female-student.jpg",
  },
  {
    name: "Tanatswa Mutasa",
    role: "O-Level Student",
    quote:
      "The online interactive classes gave me the flexibility I needed. The notes, past paper question drills, and exam predictions helped me gain immense confidence.",
    subject: "Combined Science & English",
    improvement: "From C to A",
    image: "/african-male-student.jpg",
  },
];

const faqs = [
  {
    q: "What curricula do you support?",
    a: "We provide comprehensive tutoring for both ZIMSEC (Zimbabwe School Examinations Council) and Cambridge Assessment International Education (CAIE / IGCSE / A-Level) syllabi across all forms (Form 1 to Upper 6).",
  },
  {
    q: "Where are the physical lessons conducted?",
    a: "Our physical learning center is located in Epworth StopOver, Harare, Zimbabwe. We provide weekend intensive lessons, holiday revision masterclasses, and weekday afternoon sessions.",
  },
  {
    q: "How do the online live virtual classes work?",
    a: "Online classes are held live via Zoom and Google Meet with interactive digital whiteboards, screen demonstrations, past paper walkthroughs, and recorded sessions so students can re-watch any topic anytime.",
  },
  {
    q: "How does the AI Exam Predictor work?",
    a: "Our proprietary AI engine analyses over a decade of ZIMSEC and Cambridge examination papers to identify historical topic recurrence patterns, question frequency trends, and high-yield focus areas for upcoming sittings.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept EcoCash, Innbucks, USD Cash (in-person at our Epworth center), and Direct Bank Transfers. Payment receipts can be easily submitted via WhatsApp or during online registration.",
  },
  {
    q: "Can I enroll for just 1 or 2 subjects?",
    a: "Yes! You can enroll for single subjects, multiple subjects, or complete full-package bundles depending on where you need targeted improvement.",
  },
];

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [calcLevel, setCalcLevel] = useState<"o-level" | "a-level">("o-level");
  const [calcMode, setCalcMode] = useState<"physical" | "online">("physical");
  const [calcSubjects, setCalcSubjects] = useState<number>(3);

  // Auto carousel rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Fee calculation logic
  const calculatePrice = () => {
    if (calcMode === "physical") {
      const rate = calcLevel === "o-level" ? 15 : 20;
      return calcSubjects * rate;
    } else {
      const rate = calcLevel === "o-level" ? 20 : 25;
      return calcSubjects * rate;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20">
      <Navigation />

      {/* =========================================================================
          HERO SECTION
      ========================================================================== */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20 md:py-32">
        {/* Background Carousel with Parallax & Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            {heroImages.map((src, index) =>
              index === currentImageIndex ? (
                <motion.div
                  key={src}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${src})` }}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 0.38, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
              ) : null
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/80" />
          <div className="absolute inset-0 bg-radial from-primary/15 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs sm:text-sm font-medium text-slate-200">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Zimbabwe's Premier Academy • ZIMSEC &amp; Cambridge</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
                Unlock Academic Excellence in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-300">
                  O-Level &amp; A-Level
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Welcome to <strong>GlobeDk Elite Academy</strong>. We empower students across Zimbabwe and internationally with expert <strong>Live Online Lessons, Physical Classes in Epworth Harare, Homeschooling, One-on-One Tutoring</strong>, and Zimbabwe&apos;s first <strong>AI Exam Predictor</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg text-base h-12 px-7"
                >
                  <Link href="/enroll">
                    Enroll For Lessons
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-emerald-500/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60 font-semibold text-base h-12 px-6"
                >
                  <a
                    href="https://wa.me/263786053315?text=Hello%20Dr%20Daka,%20I%20would%20like%20to%20inquire%20about%20GlobeDK%20lessons"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5 text-emerald-400" />
                    WhatsApp Dr. Daka
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="text-slate-300 hover:text-white hover:bg-white/10 text-base h-12"
                >
                  <Link href="/exam-predictor">
                    <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                    AI Exam Predictor
                  </Link>
                </Button>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>95% Pass Rate Track Record</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Physical &amp; Online Classes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Cambridge &amp; ZIMSEC Tutors</span>
                </div>
              </div>
            </motion.div>

            {/* Right Card / Interactive Teaser */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-primary/40 via-indigo-500/20 to-transparent shadow-2xl backdrop-blur-xl">
                <Card className="border-0 bg-slate-900/90 text-white rounded-[22px] overflow-hidden">
                  <CardHeader className="border-b border-slate-800 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                          <GraduationCap className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-base font-bold text-white">
                            GlobeDk Elite Highlights
                          </CardTitle>
                          <CardDescription className="text-xs text-slate-400">
                            Academic Excellence in Harare &amp; Beyond
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                        Admissions Open
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 space-y-4">
                    {/* Founder Highlight Mini Card */}
                    <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary shrink-0">
                        <Image
                          src="/john-ariphios.jpg.JPG"
                          alt="Dr John Ariphios Daka"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-white leading-tight">
                          Dr John Ariphios Daka
                        </h4>
                        <p className="text-xs text-slate-400">
                          CEO, Founder &amp; Senior Tutor
                        </p>
                      </div>
                      <Link
                        href="/about"
                        className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1"
                      >
                        Profile <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 text-center">
                        <span className="text-2xl font-extrabold text-white block">95%+</span>
                        <span className="text-xs text-slate-400">Pass Rate</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 text-center">
                        <span className="text-2xl font-extrabold text-amber-400 block">16+</span>
                        <span className="text-xs text-slate-400">Subjects Taught</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 text-center">
                        <span className="text-2xl font-extrabold text-sky-400 block">Epworth</span>
                        <span className="text-xs text-slate-400">Harare Physical Center</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 text-center">
                        <span className="text-2xl font-extrabold text-emerald-400 block">24/7</span>
                        <span className="text-xs text-slate-400">Online &amp; AI Tools</span>
                      </div>
                    </div>

                    {/* Quick Enrollment CTA */}
                    <Button asChild className="w-full h-11 font-semibold text-sm">
                      <Link href="/enroll">
                        Apply For Admission Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY VALUE STATS BANNER
      ========================================================================== */}
      <section className="border-y border-border bg-muted/40 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">500+</div>
              <div className="text-sm font-medium text-foreground">Students Mentored</div>
              <p className="text-xs text-muted-foreground">Across Zimbabwe &amp; Abroad</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">95%</div>
              <div className="text-sm font-medium text-foreground">Exam Pass Rate</div>
              <p className="text-xs text-muted-foreground">ZIMSEC &amp; Cambridge A* - C</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">16+</div>
              <div className="text-sm font-medium text-foreground">Core Subjects</div>
              <p className="text-xs text-muted-foreground">Sciences, Commercials &amp; Arts</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">100%</div>
              <div className="text-sm font-medium text-foreground">Dedicated Support</div>
              <p className="text-xs text-muted-foreground">Physical &amp; Online Classes</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4 LEARNING PATHWAYS SECTION
      ========================================================================== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Flexible Learning Options
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Four Tailored Ways To Learn
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Every student learns differently. Choose the learning mode that fits your lifestyle, location, and academic goals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pathway 1 */}
            <Card className="border-border hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <CardHeader className="space-y-3 pb-4">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Video className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Live Virtual Classes</CardTitle>
                <CardDescription>
                  Attend interactive online classes from anywhere in Zimbabwe or internationally.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 flex-1 flex flex-col justify-between text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Live Zoom &amp; Meet interactive sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Recorded playback for revision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Digital worksheets &amp; notes</span>
                  </li>
                </ul>
                <Button variant="outline" asChild className="w-full mt-4">
                  <Link href="/enroll">Join Online Class</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pathway 2 */}
            <Card className="border-border hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <CardHeader className="space-y-3 pb-4">
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <MapPin className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Physical Lessons</CardTitle>
                <CardDescription>
                  In-person classes at Epworth StopOver, Harare for structured learning.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 flex-1 flex flex-col justify-between text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Weekend &amp; holiday intensive classes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Face-to-face tutor interactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Mock exams in real exam conditions</span>
                  </li>
                </ul>
                <Button variant="outline" asChild className="w-full mt-4">
                  <Link href="/timetable">View Timetable</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pathway 3 */}
            <Card className="border-border hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <CardHeader className="space-y-3 pb-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <BookOpen className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Homeschooling</CardTitle>
                <CardDescription>
                  Full curriculum homeschooling for Cambridge &amp; ZIMSEC students.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 flex-1 flex flex-col justify-between text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Structured full syllabus coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Termly assessments &amp; report cards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Flexible study hours at home</span>
                  </li>
                </ul>
                <Button variant="outline" asChild className="w-full mt-4">
                  <Link href="/contact">Inquire Homeschooling</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pathway 4 */}
            <Card className="border-border hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <CardHeader className="space-y-3 pb-4">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">1-on-1 Tutoring</CardTitle>
                <CardDescription>
                  Private mentorship focused exclusively on your specific weak areas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 flex-1 flex flex-col justify-between text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Customized pace &amp; attention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Intensive past paper drills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Direct tutor mentorship</span>
                  </li>
                </ul>
                <Button variant="outline" asChild className="w-full mt-4">
                  <Link href="/enroll">Book 1-on-1</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* =========================================================================
          AI EXAM PREDICTOR FEATURE SHOWCASE
      ========================================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                AI Exam Intelligence
              </Badge>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Predict Examination Trends With AI Intelligence
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                GlobeDk Elite features Zimbabwe&apos;s first <strong>AI Exam Predictor</strong>. By analyzing past ZIMSEC &amp; Cambridge examination question papers over the last 10 years, our platform projects likely recurring topics, exam question structures, and high-yield revision focus areas.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <Zap className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-white">Historical Frequency Heatmap</h4>
                    <p className="text-xs text-slate-400">See which sub-topics repeat every 1, 2, or 3 examination sittings.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <Sparkles className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-white">Topic Likelihood Probability</h4>
                    <p className="text-xs text-slate-400">Prioritize your revision time on the highest probability exam areas.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg">
                  <Link href="/exam-predictor">
                    Explore AI Exam Predictor
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* AI Mock Visual UI */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-400" />
                    <span className="font-bold text-sm text-white">AI Predictor Simulator</span>
                  </div>
                  <Badge variant="outline" className="text-xs text-slate-400 border-slate-700">
                    Subject: ZIMSEC Maths
                  </Badge>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-200">Algebra, Equations &amp; Indices</span>
                      <span className="text-emerald-400 font-bold">96% Very High</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[96%] rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-200">Matrices &amp; Transformations</span>
                      <span className="text-emerald-400 font-bold">92% Very High</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[92%] rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-200">Trigonometry &amp; Bearings</span>
                      <span className="text-amber-400 font-bold">88% High</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 w-[88%] rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-200">Statistics &amp; Cumulative Frequency</span>
                      <span className="text-sky-400 font-bold">84% Moderate-High</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-sky-500 to-indigo-400 w-[84%] rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                  <span>✨ 12 Paper sessions analyzed (2014 - 2025)</span>
                  <Link href="/exam-predictor" className="text-amber-400 hover:underline font-semibold">
                    Test Full Tool →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SUBJECTS & CURRICULUM EXPLORER
      ========================================================================== */}
      <section className="py-20 md:py-28 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Curriculum &amp; Subjects
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              O-Level &amp; A-Level Subjects
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Comprehensive syllabus coverage across Sciences, Commercials, Humanities and Technology subjects.
            </p>
          </div>

          <Tabs defaultValue="o-level" className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-10">
              <TabsList className="grid grid-cols-2 w-full max-w-md h-12 p-1 bg-muted">
                <TabsTrigger value="o-level" className="text-sm font-semibold">
                  O-Level Subjects
                </TabsTrigger>
                <TabsTrigger value="a-level" className="text-sm font-semibold">
                  A-Level Subjects
                </TabsTrigger>
              </TabsList>
            </div>

            {/* O-Level Tab */}
            <TabsContent value="o-level">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {oLevelSubjects.map((sub) => {
                  const Icon = sub.icon;
                  return (
                    <Card key={sub.name} className="border-border hover:shadow-lg transition-all flex flex-col justify-between">
                      <CardHeader className="space-y-2 pb-3">
                        <div className="flex items-center justify-between">
                          <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <Icon className="h-5 w-5" />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {sub.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg pt-1">{sub.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-xs">
                        <div>
                          <p className="font-semibold text-muted-foreground mb-1.5">Key Topics:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {sub.topics.map((t) => (
                              <span key={t} className="px-2 py-0.5 rounded-sm bg-muted text-muted-foreground">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="pt-3 border-t border-border flex items-center justify-between">
                          <span className="font-semibold text-primary">{sub.fee}</span>
                          <Link href="/enroll" className="text-xs font-semibold text-foreground hover:text-primary flex items-center gap-1">
                            Enroll <ChevronRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* A-Level Tab */}
            <TabsContent value="a-level">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {aLevelSubjects.map((sub) => {
                  const Icon = sub.icon;
                  return (
                    <Card key={sub.name} className="border-border hover:shadow-lg transition-all flex flex-col justify-between">
                      <CardHeader className="space-y-2 pb-3">
                        <div className="flex items-center justify-between">
                          <div className="h-11 w-11 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                            <Icon className="h-5 w-5" />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {sub.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg pt-1">{sub.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-xs">
                        <div>
                          <p className="font-semibold text-muted-foreground mb-1.5">Key Topics:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {sub.topics.map((t) => (
                              <span key={t} className="px-2 py-0.5 rounded-sm bg-muted text-muted-foreground">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="pt-3 border-t border-border flex items-center justify-between">
                          <span className="font-semibold text-primary">{sub.fee}</span>
                          <Link href="/enroll" className="text-xs font-semibold text-foreground hover:text-primary flex items-center gap-1">
                            Enroll <ChevronRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/subjects">
                View Full Subject Syllabuses &amp; Fee Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE TUITION FEE CALCULATOR
      ========================================================================== */}
      <section className="py-20 md:py-28 border-y border-border bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                Transparent Pricing
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Tuition Fee Estimator
              </h2>
              <p className="text-slate-300 text-base">
                Calculate your estimated monthly tuition fee with complete transparency. No hidden registration fees.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
              <div className="grid sm:grid-cols-3 gap-6">
                {/* Level Toggle */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    1. Select Academic Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCalcLevel("o-level")}
                      className={`py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        calcLevel === "o-level"
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      O-Level
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcLevel("a-level")}
                      className={`py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        calcLevel === "a-level"
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      A-Level
                    </button>
                  </div>
                </div>

                {/* Mode Toggle */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    2. Learning Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCalcMode("physical")}
                      className={`py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        calcMode === "physical"
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      Physical (Harare)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcMode("online")}
                      className={`py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        calcMode === "online"
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      Live Online
                    </button>
                  </div>
                </div>

                {/* Subjects Count */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    3. Number of Subjects ({calcSubjects})
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setCalcSubjects(num)}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition-all ${
                          calcSubjects === num
                            ? "bg-emerald-600 text-white border-emerald-500"
                            : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Calculation Output Box */}
              <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">Estimated Monthly Tuition</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-emerald-400">
                      US${calculatePrice()}
                    </span>
                    <span className="text-sm text-slate-400">/ month</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Includes all study notes, mock tests, homework assistance &amp; recorded lesson access.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                    <Link href="/enroll">
                      Enroll With This Plan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MEET SENIOR TUTOR & FOUNDER
      ========================================================================== */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="border-border shadow-xl overflow-hidden">
              <CardContent className="p-6 sm:p-10 md:p-12">
                <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                  <div className="md:col-span-5 flex flex-col items-center text-center">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-primary shadow-2xl">
                      <Image
                        src="/john-ariphios.jpg.JPG"
                        alt="Dr John Ariphios Daka"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mt-4">Dr John Ariphios Daka</h3>
                    <p className="text-sm font-semibold text-primary">CEO, Founder &amp; Senior Tutor</p>
                    <p className="text-xs text-muted-foreground mt-1">Epworth, Harare, Zimbabwe</p>

                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="text-xs border-emerald-600/30 text-emerald-700 dark:text-emerald-400"
                      >
                        <a
                          href="https://wa.me/263786053315"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                          Chat WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Leadership &amp; Vision
                    </Badge>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                      Dedicated to Transforming Zimbabwean &amp; African Education
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      &quot;Education is the greatest catalyst for lifelong success. At GlobeDk Elite Academy, we believe no student should be left behind due to location or rigid teaching styles. We integrate empathetic, high-engagement teaching with modern digital tools and past paper methodologies.&quot;
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      Whether you are preparing for ZIMSEC or Cambridge O &amp; A-Levels, our students receive the individual mentorship, exam drills, and moral encouragement needed to score top grades and secure university admissions.
                    </p>

                    <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-foreground">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Expert Mathematics Tutor
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Computer Science Specialist
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Geography &amp; Sciences
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* =========================================================================
          VERIFIED STUDENT TESTIMONIALS
      ========================================================================== */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Student Success Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Real Transformations &amp; Results
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Hear directly from students who boosted their grades and achieved top marks with GlobeDk Elite.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, idx) => (
              <Card key={idx} className="border-border hover:shadow-xl transition-all flex flex-col justify-between">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-500" />
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &quot;{t.quote}&quot;
                  </p>

                  <div className="pt-4 border-t border-border flex items-center gap-3">
                    <div className="relative h-11 w-11 rounded-full overflow-hidden border border-border shrink-0">
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-tight">{t.name}</h4>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                      <Badge variant="outline" className="mt-1 text-[10px] text-emerald-600 border-emerald-600/30">
                        {t.improvement}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/testimonials">
                Read More Student Stories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQ ACCORDION SECTION
      ========================================================================== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Frequently Asked Questions
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Got Questions? We Have Answers.
            </h2>
            <p className="text-base text-muted-foreground">
              Everything you need to know about enrolling and studying with GlobeDk Elite Academy.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border rounded-xl px-5 py-1 bg-card shadow-xs"
                >
                  <AccordionTrigger className="text-sm sm:text-base font-semibold hover:no-underline text-foreground">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pt-2">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL ENROLLMENT CTA BANNER
      ========================================================================== */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl space-y-6">
          <Badge className="bg-white/20 text-white border-white/20 text-xs px-3 py-1">
            ✨ Term Registration Now Open
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready To Excel in Your O-Level or A-Level Examinations?
          </h2>

          <p className="text-base sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of confident students mastering their subjects with GlobeDk Elite Academy. Enroll online in under 2 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="font-bold text-base h-13 px-8 shadow-xl"
            >
              <Link href="/enroll">
                Enroll Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-primary-foreground/10 border-primary-foreground/30 hover:bg-primary-foreground/20 text-white font-semibold text-base h-13 px-8"
            >
              <a
                href="https://wa.me/263786053315?text=Hello%20GlobeDK,%20I%20want%20to%20enroll%20for%20lessons"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5 text-emerald-400" />
                WhatsApp Us Directly
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
