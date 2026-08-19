"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
  BookOpenText,
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
  FlaskConical,
  Dna,
  Binary,
  Compass,
  Landmark,
  Briefcase,
  Receipt,
  Scale,
  Building2,
  Infinity as InfinityIcon,
  BarChart3,
  Quote,
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
    icon: BookOpenText,
    category: "Languages",
    topics: ["Comprehension", "Composition", "Summary", "Grammar", "Registers"],
    fee: "From $15/mo",
    popular: true,
  },
  {
    name: "Combined Science",
    icon: Atom,
    category: "Sciences",
    topics: [
      "Biology",
      "Chemistry",
      "Physics",
      "Practical Skills",
      "Experiments",
    ],
    fee: "From $15/mo",
    popular: true,
  },
  {
    name: "Physics",
    icon: Atom,
    category: "Sciences",
    topics: [
      "Mechanics",
      "Thermal Physics",
      "Waves & Optics",
      "Electricity & Magnetism",
    ],
    fee: "From $15/mo",
    popular: false,
  },
  {
    name: "Chemistry",
    icon: FlaskConical,
    category: "Sciences",
    topics: [
      "Stoichiometry",
      "Organic Chemistry",
      "Acids & Bases",
      "Electrochemistry",
    ],
    fee: "From $15/mo",
    popular: false,
  },
  {
    name: "Biology",
    icon: Dna,
    category: "Sciences",
    topics: [
      "Cell Biology",
      "Human Physiology",
      "Genetics & Inheritance",
      "Ecology",
    ],
    fee: "From $15/mo",
    popular: false,
  },
  {
    name: "Computer Science",
    icon: Laptop,
    category: "Technology",
    topics: [
      "Algorithms & Logic",
      "Data Representation",
      "Programming",
      "Databases",
    ],
    fee: "From $15/mo",
    popular: false,
  },
  {
    name: "Geography",
    icon: Compass,
    category: "Humanities",
    topics: [
      "Map Interpretation",
      "Geomorphology",
      "Weather & Climate",
      "Settlements",
    ],
    fee: "From $15/mo",
    popular: false,
  },
  {
    name: "History & Heritage",
    icon: Landmark,
    category: "Humanities",
    topics: [
      "Zimbabwean Heritage",
      "African History",
      "World Wars",
      "Governance",
    ],
    fee: "From $15/mo",
    popular: false,
  },
  {
    name: "Principles of Accounts",
    icon: Receipt,
    category: "Commercials",
    topics: [
      "Double Entry Ledger",
      "Trial Balance",
      "Income Statements",
      "Balance Sheet",
    ],
    fee: "From $15/mo",
    popular: false,
  },
  {
    name: "Commerce",
    icon: Briefcase,
    category: "Commercials",
    topics: [
      "Trade & Commerce",
      "Banking & Finance",
      "Insurance",
      "Marketing & Transport",
    ],
    fee: "From $15/mo",
    popular: false,
  },
  {
    name: "Economics",
    icon: TrendingUp,
    category: "Commercials",
    topics: [
      "Price Mechanism",
      "Market Structures",
      "Money & Banking",
      "National Income",
    ],
    fee: "From $15/mo",
    popular: false,
  },
];

const aLevelSubjects = [
  {
    name: "Pure Mathematics",
    icon: InfinityIcon,
    category: "Sciences",
    topics: [
      "Calculus & Integration",
      "Vectors in 3D",
      "Differential Equations",
      "Complex Numbers",
      "Proof",
    ],
    fee: "From $20/mo",
    popular: true,
  },
  {
    name: "Statistics",
    icon: BarChart3,
    category: "Sciences",
    topics: [
      "Probability Distributions",
      "Hypothesis Testing",
      "Regression & Correlation",
      "Sampling",
    ],
    fee: "From $20/mo",
    popular: true,
  },
  {
    name: "Computer Science",
    icon: Binary,
    category: "Technology",
    topics: [
      "Advanced Data Structures",
      "Software Engineering",
      "Object-Oriented Coding",
      "System Theory",
    ],
    fee: "From $20/mo",
    popular: true,
  },
  {
    name: "Business Studies",
    icon: Building2,
    category: "Commercials",
    topics: [
      "Strategic Management",
      "Marketing Strategy",
      "Corporate Finance",
      "Human Resources",
    ],
    fee: "From $20/mo",
    popular: false,
  },
  {
    name: "Economics",
    icon: TrendingUp,
    category: "Commercials",
    topics: [
      "Advanced Microeconomics",
      "Macroeconomic Policy",
      "International Trade",
      "Development Economics",
    ],
    fee: "From $20/mo",
    popular: false,
  },
  {
    name: "Advanced Geography",
    icon: Compass,
    category: "Humanities",
    topics: [
      "Hydrology & Fluvial Geomorphology",
      "Atmosphere & Weather",
      "Global Economic Activity",
      "Fieldwork",
    ],
    fee: "From $20/mo",
    popular: false,
  },
];

const testimonials = [
  {
    name: "Tapiwa Makumbe",
    role: "O-Level Distinction Graduate",
    quote:
      "GlobeDk Elite transformed my understanding of Mathematics and Combined Science. I progressed from struggling with basic algebraic concepts to achieving an A* in my final ZIMSEC examinations. The academic mentorship here is exceptional.",
    subject: "Mathematics & Sciences",
    improvement: "From D to A*",
    image: "/african-student-portrait.jpg",
  },
  {
    name: "Rudo Makore",
    role: "A-Level Honors Scholar",
    quote:
      "The Computer Science and Pure Mathematics masterclasses are truly collegiate grade. Tutor John Ariphios Daka breaks down complex calculus and algorithms into intuitive, step-by-step proofs. I secured straight A grades.",
    subject: "Computer Science & Pure Maths",
    improvement: "Straight A Grades",
    image: "/african-female-student.jpg",
  },
  {
    name: "Tanatswa Mutasa",
    role: "Cambridge IGCSE Candidate",
    quote:
      "The live virtual sessions gave me the structure and rigor I needed. The syllabus topic projections and comprehensive weekly past paper drills provided complete exam confidence.",
    subject: "Cambridge Geography & English",
    improvement: "From C to A",
    image: "/african-male-student.jpg",
  },
];

const faqs = [
  {
    q: "What examination syllabuses does the Academy prepare students for?",
    a: "GlobeDk Elite Academy provides accredited instruction for both ZIMSEC (Zimbabwe School Examinations Council) and Cambridge Assessment International Education (CAIE / IGCSE / AS & A-Level) across Forms 1 to Upper 6.",
  },
  {
    q: "Where is the physical campus located?",
    a: "Our physical tutoring center is situated at Epworth StopOver, Harare, Zimbabwe. The facility accommodates weekend intensive lessons, candidate holiday bootcamps, and afternoon revision classes.",
  },
  {
    q: "How are the live virtual classes structured for distance learners?",
    a: "Live online classes take place in interactive digital classrooms via Zoom and Google Meet with screen sharing, digital handwriting whiteboards, and high-definition recordings archived for 24/7 student revision.",
  },
  {
    q: "What is the methodology behind the AI Exam Intelligence Engine?",
    a: "Our machine learning engine evaluates more than a decade of verified historical examination question trends (2014–2025) to map topic recurrence frequencies, section mark weights, and high-probability focus areas.",
  },
  {
    q: "What payment channels and currency options are supported?",
    a: "We accept EcoCash, Innbucks, USD Cash (at our Harare campus), and Direct Bank Transfers. Automated receipt verification is provided through WhatsApp and our online registration portal.",
  },
  {
    q: "Are parents and guardians provided with student progress reports?",
    a: "Yes. Guardians receive monthly academic progress reports, mock examination scorecards, and direct communication channels with the Senior Tutor.",
  },
];

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [calcLevel, setCalcLevel] = useState<"o-level" | "a-level">("o-level");
  const [calcMode, setCalcMode] = useState<"physical" | "online">("physical");
  const [calcSubjects, setCalcSubjects] = useState<number>(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 7500);
    return () => clearInterval(interval);
  }, []);

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
          HERO SECTION — HARVARD COLLEGIAL EDITORIAL STYLE
      ========================================================================== */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800/80">
        {/* Background Image Carousel with Dignified Contrast */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            {heroImages.map((src, index) =>
              index === currentImageIndex ? (
                <motion.div
                  key={src}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${src})` }}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 0.32, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.08 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              ) : null,
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/92 to-slate-900/85" />
          <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-amber-200 backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span>
                  Zimbabwe&apos;s Center for Academic Rigor &amp; Excellence
                </span>
              </div>

              <h1 className="mx-auto max-w-3xl font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:mx-0 lg:text-6xl">
                Confident exam preparation for{" "}
                <span className="italic font-normal text-amber-200">
                  O-Level &amp; A-Level
                </span>{" "}
                success.
              </h1>

              <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0">
                Personal tutoring, live online classes, and focused exam support
                for <strong className="font-semibold text-white">ZIMSEC</strong>{" "}
                and{" "}
                <strong className="font-semibold text-white">
                  Cambridge International
                </strong>{" "}
                students.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="h-12 bg-amber-400 px-6 font-bold text-slate-950 shadow-lg shadow-amber-950/30 hover:bg-amber-300"
                >
                  <Link href="/enroll">
                    Start your application
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/25 bg-white/5 px-6 font-semibold text-white hover:bg-white/10 hover:text-white"
                >
                  <a
                    href="https://wa.me/263786053315?text=Hello%20Dr%20Daka,%20I%20would%20like%20to%20inquire%20about%20GlobeDK%20admissions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4 text-emerald-400" />
                    Speak to admissions
                  </a>
                </Button>

                <Link
                  href="/exam-predictor"
                  className="inline-flex h-12 items-center justify-center gap-2 px-3 text-sm font-semibold text-amber-200 transition-colors hover:text-amber-100"
                >
                  <Sparkles className="h-4 w-4" />
                  Try exam tools
                </Link>
              </div>

              {/* Institutional Hallmarks */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-slate-700/80 pt-5 text-xs font-medium text-slate-300 lg:justify-start">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  <span>Focused tuition for exam confidence</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  <span>Epworth Campus &amp; Virtual Classrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  <span>Certified ZIMSEC &amp; Cambridge Specialists</span>
                </div>
              </div>
            </motion.div>

            {/* Right Card / Academy Crest & Dean Spotlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-amber-500/30 via-slate-800/50 to-transparent shadow-2xl backdrop-blur-xl">
                <Card className="border-0 bg-slate-900/95 text-white rounded-[22px] overflow-hidden">
                  <CardHeader className="border-b border-slate-800 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-13 shrink-0 items-start justify-center overflow-hidden rounded-xl border border-amber-400/30 bg-[#f8f7f2] p-1 shadow-inner">
                          <Image
                            src="/logo.png"
                            alt="GlobeDk Elite Academy crest"
                            width={52}
                            height={58}
                            className="h-auto w-[115%] max-w-none object-contain object-top"
                          />
                        </div>
                        <div>
                          <CardTitle className="font-serif text-base font-bold text-white">
                            GlobeDk Elite Academy
                          </CardTitle>
                          <CardDescription className="text-xs text-slate-400">
                            Harare, Zimbabwe • Established for Excellence
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[10px] uppercase font-bold tracking-wider">
                        Admissions Active
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 space-y-4">
                    {/* Dean Callout */}
                    <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/70">
                      <div className="relative h-13 w-13 rounded-full overflow-hidden border-2 border-amber-400 shrink-0">
                        <Image
                          src="/john-ariphios.jpg.JPG"
                          alt="Dr John Ariphios Daka"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif font-bold text-sm text-white">
                          Dr John Ariphios Daka
                        </h4>
                        <p className="text-xs text-slate-400">
                          CEO, Founder &amp; Senior Tutor
                        </p>
                        <p className="text-[11px] text-amber-300/90 font-mono mt-0.5">
                          Mathematics &amp; Sciences Faculty Lead
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 text-sm text-slate-200">
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-300" />
                        Small, focused learning groups
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-300" />
                        In-person and live online lessons
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-300" />
                        Guidance built around each learner
                      </p>
                    </div>

                    <Button
                      asChild
                      className="w-full h-11 font-bold text-xs uppercase tracking-wider"
                    >
                      <Link href="/enroll">
                        Enroll in Current Academic Session
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

      <section className="border-y border-border bg-[#f7f5f0] py-16 md:py-20">
        <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src="/african-students-learning-in-modern-classroom.jpg"
              alt="Students learning together in a modern classroom"
              fill
              className="object-cover"
            />
          </div>
          <div className="max-w-xl space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
              Learning at GlobeDk
            </p>
            <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
              A serious education, shaped around the learner.
            </h2>
            <p className="text-base leading-relaxed text-slate-600">
              Every student arrives with a different starting point. Our
              teachers make room for questions, sustained practice, and the
              confidence that comes from understanding—not memorising.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-950 underline decoration-amber-500 decoration-2 underline-offset-8 transition-colors hover:text-amber-800"
            >
              Discover the Academy <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOUR ACADEMIC LEARNING PATHWAYS
      ========================================================================== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs uppercase font-semibold tracking-wider">
              Educational Modalities
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Four Pathways to Academic Mastery
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Designed for full-time scholars, evening candidates, distance
              learners, and homeschoolers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pathway 1 */}
            <Card className="border-border hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
              <CardHeader className="space-y-3 pb-4">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-700 dark:text-blue-400 flex items-center justify-center">
                  <Video className="h-6 w-6" />
                </div>
                <CardTitle className="font-serif text-xl">
                  Live Virtual Classrooms
                </CardTitle>
                <CardDescription>
                  Real-time interactive instruction broadcast nationwide and
                  internationally.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Zoom &amp; Meet live whiteboard sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Archived 24/7 video playback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Electronic worksheets &amp; past papers</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  asChild
                  className="w-full mt-4 text-xs font-semibold"
                >
                  <Link href="/enroll">Join Virtual Class</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pathway 2 */}
            <Card className="border-border hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
              <CardHeader className="space-y-3 pb-4">
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                  <MapPin className="h-6 w-6" />
                </div>
                <CardTitle className="font-serif text-xl">
                  Harare Campus Classes
                </CardTitle>
                <CardDescription>
                  In-person weekend lessons and holiday bootcamps at Epworth
                  StopOver.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Structured weekend schedule</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Face-to-face tutor interactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Authentic exam hall mock sittings</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  asChild
                  className="w-full mt-4 text-xs font-semibold"
                >
                  <Link href="/timetable">View Timetable</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pathway 3 */}
            <Card className="border-border hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
              <CardHeader className="space-y-3 pb-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <BookOpenText className="h-6 w-6" />
                </div>
                <CardTitle className="font-serif text-xl">
                  Homeschooling Program
                </CardTitle>
                <CardDescription>
                  Full curriculum pacing, individual tracking, and termly
                  academic reporting.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Complete ZIMSEC &amp; Cambridge syllabus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Official termly grade cards for guardians</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Customized self-paced study tracks</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  asChild
                  className="w-full mt-4 text-xs font-semibold"
                >
                  <Link href="/contact">Inquire Homeschooling</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pathway 4 */}
            <Card className="border-border hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
              <CardHeader className="space-y-3 pb-4">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-700 dark:text-purple-400 flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle className="font-serif text-xl">
                  1-on-1 Mentorship
                </CardTitle>
                <CardDescription>
                  Private individualized coaching targeting specific problem
                  areas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>100% focused tutor attention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Intensive past exam drills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Tailored speed and syllabus review</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  asChild
                  className="w-full mt-4 text-xs font-semibold"
                >
                  <Link href="/enroll">Book 1-on-1 Tutoring</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* =========================================================================
          AI EXAM PREDICTOR FORECAST ENGINE
      ========================================================================== */}
      <section className="relative overflow-hidden border-y border-slate-800 bg-slate-950 py-16 text-white md:py-24">
        <Image
          src="/classroom-study-session.png"
          alt="Students studying together at GlobeDk Elite Academy"
          fill
          className="object-cover object-center opacity-[0.12]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge className="border-amber-400/30 bg-amber-400/15 text-amber-200 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                AI Examination Intelligence
              </Badge>

              <h2 className="max-w-xl font-serif text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
                Make every revision session count.
              </h2>

              <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Explore recurring topic patterns, question structures, and mark
                weighting from historical ZIMSEC and Cambridge papers—then build
                a focused plan with your tutor.
              </p>

              <div className="grid gap-3 pt-1 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <Zap className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">
                      Historical Frequency Mapping
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      See which syllabus areas occur most often across past
                      sittings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <Sparkles className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">
                      High-Yield Priority Indicators
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      Turn evidence into a clear sequence for your revision.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  asChild
                  size="lg"
                  className="h-12 bg-amber-400 px-6 font-bold text-slate-950 shadow-lg shadow-black/20 hover:bg-amber-300"
                >
                  <Link href="/exam-predictor">
                    Explore the Exam Lab
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Visual Forecast Matrix */}
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
                <div className="relative h-24 overflow-hidden border-b border-white/10 sm:h-28">
                  <Image
                    src="/african-students-learning-in-modern-classroom.jpg"
                    alt="Students learning in a modern classroom"
                    fill
                    className="object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-950/20" />
                  <div className="absolute inset-0 flex items-center gap-2 px-6">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-400 text-slate-950">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-amber-200">
                        Live example
                      </span>
                      <span className="font-serif text-base font-bold text-white">
                        Exam Lab forecast
                      </span>
                    </span>
                  </div>
                </div>
                <div className="space-y-5 p-5 sm:p-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="font-serif font-bold text-sm text-white">
                      ZIMSEC &amp; Cambridge Forecaster
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs text-slate-400 border-slate-700"
                    >
                      Subject: Pure Mathematics
                    </Badge>
                  </div>

                  <div className="space-y-3.5">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-200">
                          Integration &amp; Differential Equations
                        </span>
                        <span className="text-emerald-400 font-bold">
                          98% Very High
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[98%] rounded-full" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-200">
                          Vectors in 3D &amp; Scalar Products
                        </span>
                        <span className="text-emerald-400 font-bold">
                          94% Very High
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[94%] rounded-full" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-200">
                          Complex Numbers &amp; De Moivre&apos;s Theorem
                        </span>
                        <span className="text-amber-400 font-bold">
                          90% High
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-amber-500 w-[90%] rounded-full" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-200">
                          Binomial Expansion &amp; Partial Fractions
                        </span>
                        <span className="text-sky-400 font-bold">86% High</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-sky-500 w-[86%] rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                    <span>✨ Multi-year datasets analyzed (2014 – 2025)</span>
                    <Link
                      href="/exam-predictor"
                      className="text-amber-400 hover:underline font-semibold"
                    >
                      Test Full Tool →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SUBJECTS & CURRICULUM CATALOG
      ========================================================================== */}
      <section className="py-20 md:py-28 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs uppercase font-semibold tracking-wider">
              Academic Faculties
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Disciplines &amp; Subject Catalog
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Comprehensive subject coverage taught by specialized subject
              masters.
            </p>
          </div>

          <Tabs defaultValue="o-level" className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-10">
              <TabsList className="grid grid-cols-2 w-full max-w-md h-12 p-1 bg-muted">
                <TabsTrigger value="o-level" className="text-sm font-semibold">
                  O-Level Curriculum
                </TabsTrigger>
                <TabsTrigger value="a-level" className="text-sm font-semibold">
                  A-Level Curriculum
                </TabsTrigger>
              </TabsList>
            </div>

            {/* O-Level Tab */}
            <TabsContent value="o-level">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {oLevelSubjects.map((sub) => {
                  const Icon = sub.icon;
                  return (
                    <Card
                      key={sub.name}
                      className="border-border hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <CardHeader className="space-y-2 pb-3">
                        <div className="flex items-center justify-between">
                          <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <Icon className="h-5 w-5" />
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-[10px] uppercase tracking-wider font-semibold"
                          >
                            {sub.category}
                          </Badge>
                        </div>
                        <CardTitle className="font-serif text-lg pt-1">
                          {sub.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-xs">
                        <div>
                          <p className="font-semibold text-muted-foreground mb-1.5 uppercase text-[10px] tracking-wider">
                            Core Syllabus Topics:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {sub.topics.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded-sm bg-muted text-muted-foreground text-[11px]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="pt-3 border-t border-border flex items-center justify-between">
                          <span className="font-bold text-primary">
                            {sub.fee}
                          </span>
                          <Link
                            href="/enroll"
                            className="text-xs font-semibold text-foreground hover:text-primary flex items-center gap-1"
                          >
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
                    <Card
                      key={sub.name}
                      className="border-border hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <CardHeader className="space-y-2 pb-3">
                        <div className="flex items-center justify-between">
                          <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <Icon className="h-5 w-5" />
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-[10px] uppercase tracking-wider font-semibold"
                          >
                            {sub.category}
                          </Badge>
                        </div>
                        <CardTitle className="font-serif text-xl pt-1">
                          {sub.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-xs">
                        <div>
                          <p className="font-semibold text-muted-foreground mb-1.5 uppercase text-[10px] tracking-wider">
                            Advanced Syllabus Modules:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {sub.topics.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded-sm bg-muted text-muted-foreground text-[11px]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="pt-3 border-t border-border flex items-center justify-between">
                          <span className="font-bold text-primary">
                            {sub.fee}
                          </span>
                          <Link
                            href="/enroll"
                            className="text-xs font-semibold text-foreground hover:text-primary flex items-center gap-1"
                          >
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
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE TUITION FEE CALCULATOR
      ========================================================================== */}
      <section className="py-20 md:py-28 border-y border-border bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs uppercase tracking-wider font-semibold">
                Transparent Tuition Schedule
              </Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                Institutional Fee Estimator
              </h2>
              <p className="text-slate-300 text-base font-light">
                Calculate estimated monthly tuition with total transparency. No
                hidden administrative registration fees.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
              <div className="grid sm:grid-cols-3 gap-6">
                {/* Level Toggle */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    1. Academic Level
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
                    2. Modality
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
                      Harare Campus
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
                      Live Virtual
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
                            ? "bg-amber-600 text-white border-amber-500"
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
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">
                    Total Estimated Monthly Tuition
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-amber-400">
                      US${calculatePrice()}
                    </span>
                    <span className="text-sm text-slate-400">/ month</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Includes lesson hours, study notes, past exam question
                    drills &amp; recorded lecture access.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button
                    asChild
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider h-12 px-6"
                  >
                    <Link href="/enroll">
                      Proceed to Admission
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
          DIRECTORATE & FOUNDER PROFILE
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
                    <h3 className="font-serif text-2xl font-bold mt-4">
                      Dr John Ariphios Daka
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      CEO, Founder &amp; Senior Tutor
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Harare, Zimbabwe
                    </p>

                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="text-xs border-emerald-600/30 text-emerald-700 dark:text-emerald-400 font-semibold"
                      >
                        <a
                          href="https://wa.me/263786053315"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                          Chat on WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs uppercase font-semibold tracking-wider">
                      Academic Leadership
                    </Badge>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                      &quot;Excellence in Education. Success for Life.&quot;
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      &quot;Education must combine intellectual rigor, moral
                      encouragement, and modern technical capability. At GlobeDk
                      Elite Academy, we mentor each scholar through personalized
                      problem-solving approaches, ensuring full syllabus mastery
                      and high examination confidence.&quot;
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      Under his stewardship, hundreds of students across Harare,
                      nationwide Zimbabwe, and the Southern African region have
                      achieved distinction grades in both ZIMSEC and Cambridge
                      International sittings.
                    </p>

                    <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-foreground">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Mathematics &amp; Statistics Specialist
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Computer Science Faculty Lead
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
          VERIFIED HONORS & TESTIMONIALS
      ========================================================================== */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs uppercase font-semibold tracking-wider">
              Student Honors &amp; Results
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Verified Student Achievements
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Documented grade transformations and distinction outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, idx) => (
              <Card
                key={idx}
                className="border-border hover:shadow-xl transition-all flex flex-col justify-between"
              >
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
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm leading-tight">
                        {t.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                      <Badge
                        variant="outline"
                        className="mt-1 text-[10px] text-emerald-700 dark:text-emerald-300 border-emerald-600/30"
                      >
                        {t.improvement}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQ ACCORDION
      ========================================================================== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs uppercase font-semibold tracking-wider">
              Admissions FAQ
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Frequently Addressed Inquiries
            </h2>
            <p className="text-base text-muted-foreground">
              Essential details regarding admissions, curricula, and
              institutional policies.
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
                  <AccordionTrigger className="font-serif text-sm sm:text-base font-semibold hover:no-underline text-foreground">
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
          FINAL ADMISSION CTA BANNER
      ========================================================================== */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl space-y-6">
          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs px-3 py-1 font-mono uppercase">
            Admissions Active for Academic Year 2026 / 2027
          </Badge>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Begin Your Academic Journey with GlobeDk Elite Academy
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Secure admission in your desired subjects. Complete the official
            registration online in under 2 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider h-13 px-8 shadow-xl"
            >
              <Link href="/enroll">
                Apply Online Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/5 border-slate-700 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider h-13 px-8"
            >
              <a
                href="https://wa.me/263786053315?text=Hello%20GlobeDK,%20I%20want%20to%20enroll%20for%20lessons"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4 text-emerald-400" />
                WhatsApp Admissions
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
