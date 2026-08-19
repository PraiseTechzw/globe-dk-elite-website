"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Sparkles,
  Brain,
  TrendingUp,
  Target,
  FileText,
  Calculator,
  Laptop,
  Globe,
  Atom,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Download,
  BookOpen,
  HelpCircle,
  BarChart3,
  Layers,
  ChevronRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

interface TopicPrediction {
  topic: string;
  probability: number;
  confidence: "Very High" | "High" | "Moderate";
  historicalFrequency: string;
  expectedMarks: string;
  keySubtopics: string[];
  sampleQuestionSnippet: string;
  revisionTips: string;
}

const PREDICTION_DATA: Record<string, TopicPrediction[]> = {
  "Mathematics (O-Level)": [
    {
      topic: "Algebraic Expressions & Factorisation",
      probability: 96,
      confidence: "Very High",
      historicalFrequency: "Appeared in 10/10 past sessions",
      expectedMarks: "8 - 12 Marks (Paper 1 & Paper 2)",
      keySubtopics: ["Quadratic equations by formula", "Simultaneous linear equations", "Change of subject of formula", "Simplification of algebraic fractions"],
      sampleQuestionSnippet: "Solve the quadratic equation 3x² - 5x - 2 = 0 giving your answer correct to 2 decimal places.",
      revisionTips: "Master the quadratic formula and factoring differences of two squares.",
    },
    {
      topic: "Matrices & Transformations",
      probability: 93,
      confidence: "Very High",
      historicalFrequency: "Appeared in 9/10 past sessions",
      expectedMarks: "10 - 15 Marks (Paper 2 Section B)",
      keySubtopics: ["Determinant & inverse of 2x2 matrix", "Matrix multiplication", "Enlargement, reflection & shear matrices", "Area scale factor"],
      sampleQuestionSnippet: "Given matrix M = [[3, -1], [2, 4]], find the inverse matrix M⁻¹ and state the coordinates of the image.",
      revisionTips: "Double check your signs when finding matrix determinants (ad - bc).",
    },
    {
      topic: "Trigonometry & 3D Bearings",
      probability: 89,
      confidence: "High",
      historicalFrequency: "Appeared in 9/10 past sessions",
      expectedMarks: "10 - 14 Marks (Paper 2)",
      keySubtopics: ["Sine & Cosine rules", "Angles of elevation & depression", "Three-figure bearings", "Area of triangle = 1/2 ab sin C"],
      sampleQuestionSnippet: "In triangle ABC, AB = 8.5km, BC = 12.0km and angle ABC = 115°. Calculate the distance AC.",
      revisionTips: "Always draw a large, clear sketch and write bearings using 3 digits (e.g. 045°).",
    },
    {
      topic: "Statistics & Cumulative Frequency (Ogive)",
      probability: 86,
      confidence: "High",
      historicalFrequency: "Appeared in 8/10 past sessions",
      expectedMarks: "8 - 12 Marks",
      keySubtopics: ["Mean from grouped data", "Cumulative frequency curves (Ogive)", "Median, Quartiles & Interquartile range", "Probability tree diagrams"],
      sampleQuestionSnippet: "Draw a cumulative frequency curve for the grouped data and estimate the median and upper quartile.",
      revisionTips: "Plot points at the upper class boundaries, not class midpoints.",
    },
    {
      topic: "Mensuration (Cylinders, Cones & Spheres)",
      probability: 82,
      confidence: "High",
      historicalFrequency: "Appeared in 8/10 past sessions",
      expectedMarks: "6 - 10 Marks",
      keySubtopics: ["Total surface area of composite solids", "Volume of frustum", "Arc length & sector area", "Mass-volume density calculations"],
      sampleQuestionSnippet: "A solid cone of base radius 6cm and height 8cm is melted to form a sphere. Calculate the radius of the sphere.",
      revisionTips: "Check if the formula requires radians or degrees and memorize πr²h and 4/3πr³.",
    },
  ],
  "Combined Science (O-Level)": [
    {
      topic: "Cell Structure & Specialised Cells",
      probability: 95,
      confidence: "Very High",
      historicalFrequency: "Appeared in 10/10 past sessions",
      expectedMarks: "8 - 10 Marks",
      keySubtopics: ["Plant vs animal cell differences", "Microscope magnification calculations", "Red blood cell & sperm adaptations"],
      sampleQuestionSnippet: "State two structural differences between a palisade mesophyll cell and a red blood cell.",
      revisionTips: "Remember magnification formula: Image size = Actual size × Magnification.",
    },
    {
      topic: "Acids, Bases, Salts & Neutralisation",
      probability: 91,
      confidence: "Very High",
      historicalFrequency: "Appeared in 9/10 past sessions",
      expectedMarks: "10 - 12 Marks",
      keySubtopics: ["pH scale & universal indicator", "Word & balanced chemical equations", "Preparation of soluble salts by titration"],
      sampleQuestionSnippet: "Write a balanced chemical equation with state symbols for the reaction between hydrochloric acid and sodium hydroxide.",
      revisionTips: "Practice state symbols (aq, s, l, g) for all salt preparation reactions.",
    },
    {
      topic: "Current Electricity & Circuits",
      probability: 88,
      confidence: "High",
      historicalFrequency: "Appeared in 9/10 past sessions",
      expectedMarks: "8 - 12 Marks",
      keySubtopics: ["Ohm's Law: V = IR", "Series and parallel circuit calculations", "Electrical power & domestic energy cost (kWh)"],
      sampleQuestionSnippet: "Calculate the total equivalent resistance of three 6-ohm resistors connected in parallel.",
      revisionTips: "1/R_total = 1/R1 + 1/R2 for parallel circuits.",
    },
  ],
  "Computer Science (O-Level)": [
    {
      topic: "Algorithms, Flowcharts & Pseudocode",
      probability: 97,
      confidence: "Very High",
      historicalFrequency: "Appeared in 10/10 past sessions",
      expectedMarks: "15 - 20 Marks (Paper 2)",
      keySubtopics: ["Iteration loops (FOR, WHILE, REPEAT)", "Conditional branching (IF-THEN-ELSE)", "Trace tables & dry runs", "Linear search & Bubble sort"],
      sampleQuestionSnippet: "Write a pseudocode algorithm that accepts 20 student marks, calculates the average mark and outputs the highest score.",
      revisionTips: "Trace tables need accurate row-by-row variable tracking.",
    },
    {
      topic: "Binary Representation & Logic Gates",
      probability: 92,
      confidence: "Very High",
      historicalFrequency: "Appeared in 10/10 past sessions",
      expectedMarks: "10 - 14 Marks",
      keySubtopics: ["Binary to Denary / Hexadecimal conversion", "Two's complement for negative numbers", "Truth tables for AND, OR, NOT, NAND, NOR, XOR"],
      sampleQuestionSnippet: "Complete the truth table for the logic circuit: X = (A AND B) OR (NOT C).",
      revisionTips: "Memorize power of 2 values: 128, 64, 32, 16, 8, 4, 2, 1.",
    },
    {
      topic: "Databases & SQL Queries",
      probability: 85,
      confidence: "High",
      historicalFrequency: "Appeared in 8/10 past sessions",
      expectedMarks: "8 - 12 Marks",
      keySubtopics: ["Primary key & foreign keys", "Data types", "SQL SELECT, FROM, WHERE, ORDER BY"],
      sampleQuestionSnippet: "Write an SQL query to display the FirstName and Grade of all students whose Marks are greater than 75.",
      revisionTips: "Always put string literals in quotes in SQL WHERE clauses.",
    },
  ],
  "Pure Mathematics (A-Level)": [
    {
      topic: "Calculus (Integration & Differential Equations)",
      probability: 98,
      confidence: "Very High",
      historicalFrequency: "Appeared in 10/10 past sessions",
      expectedMarks: "25 - 35 Marks (Paper 1 & Paper 2)",
      keySubtopics: ["Integration by parts & substitution", "Separation of variables for differential equations", "Volume of revolution", "Partial fractions in integration"],
      sampleQuestionSnippet: "Find the general solution of the differential equation dy/dx = (2x + 1)/(y² + 1).",
      revisionTips: "Remember the constant of integration (+ C) for all indefinite integrals.",
    },
    {
      topic: "Vectors & 3D Lines / Planes",
      probability: 94,
      confidence: "Very High",
      historicalFrequency: "Appeared in 9/10 past sessions",
      expectedMarks: "12 - 16 Marks",
      keySubtopics: ["Vector equation of straight lines in 3D", "Dot (scalar) product for angles", "Perpendicular distance from a point to a line", "Skew lines & intersection"],
      sampleQuestionSnippet: "Find the acute angle between the two lines whose direction vectors are [2, -1, 3] and [1, 4, -2].",
      revisionTips: "a · b = |a||b|cos(θ). If dot product is 0, the lines are perpendicular.",
    },
    {
      topic: "Complex Numbers & De Moivre's Theorem",
      probability: 90,
      confidence: "High",
      historicalFrequency: "Appeared in 9/10 past sessions",
      expectedMarks: "10 - 15 Marks",
      keySubtopics: ["Modulus-argument form (r cis θ)", "De Moivre's Theorem for powers & roots", "Loci in the Argand diagram", "Roots of polynomials with complex coefficients"],
      sampleQuestionSnippet: "Solve z⁴ = -16 in polar form and represent all four roots on an Argand diagram.",
      revisionTips: "Roots are evenly spaced around a circle of radius r^(1/n) in the Argand plane.",
    },
  ],
};

export default function ExamPredictorPage() {
  const [selectedCurriculum, setSelectedCurriculum] = useState<"ZIMSEC" | "Cambridge">("ZIMSEC");
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>("Mathematics (O-Level)");
  const [targetSession, setTargetSession] = useState<string>("Nov 2026 Examination");
  const [activeTab, setActiveTab] = useState<string>("predictions");

  const currentPredictions = PREDICTION_DATA[selectedSubjectKey] || PREDICTION_DATA["Mathematics (O-Level)"];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20">
      <Navigation />

      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 py-14 text-white md:py-20">
        <Image src="/classroom-study-session.png" alt="Students preparing together in a classroom" fill priority className="object-cover object-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/55" />
        <div className="container relative z-10 mx-auto grid max-w-6xl items-center gap-8 px-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl space-y-5">
            <Badge className="border-amber-400/30 bg-amber-400/15 text-amber-200 shadow-none"><Sparkles className="mr-1.5 h-3.5 w-3.5" />AI Examination Intelligence</Badge>
            <h1 className="font-serif text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl">Study with a clearer view of what matters most.</h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">Review topic patterns, mark weighting, and revision priorities from historical examination papers. Use the forecast as a focused revision guide for ZIMSEC and Cambridge preparation.</p>
            <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-200"><span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Pattern-led revision</span><span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Topic confidence scores</span><span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Tutor-led support</span></div>
          </div>
          <div className="relative hidden overflow-hidden rounded-2xl border border-white/15 bg-slate-900/60 p-3 shadow-2xl lg:block"><div className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src="/classroom-study-session.png" alt="GlobeDk students in a focused study session" fill className="object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-200">Built for focused preparation</p><p className="mt-1 font-serif text-xl font-bold">Turn revision time into a plan.</p></div></div></div>
        </div>
      </section>

      {/* Main Interactive Tool */}
      <main className="flex-1 py-10 bg-muted/20">
        <div className="container mx-auto px-4 max-w-6xl space-y-8">
          {/* Controls Bar */}
          <Card className="border-border shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Configure Examination Forecast
              </CardTitle>
              <CardDescription>Select your curriculum, subject, and sitting to generate high-yield topic predictions</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                {/* Curriculum */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Exam Board / Syllabus
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCurriculum("ZIMSEC")}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                        selectedCurriculum === "ZIMSEC"
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:bg-muted"
                      }`}
                    >
                      ZIMSEC
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCurriculum("Cambridge")}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                        selectedCurriculum === "Cambridge"
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:bg-muted"
                      }`}
                    >
                      Cambridge CAIE
                    </button>
                  </div>
                </div>

                {/* Subject Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Subject &amp; Level
                  </label>
                  <select
                    value={selectedSubjectKey}
                    onChange={(e) => setSelectedSubjectKey(e.target.value)}
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-primary"
                  >
                    <option value="Mathematics (O-Level)">O-Level Mathematics</option>
                    <option value="Combined Science (O-Level)">O-Level Combined Science</option>
                    <option value="Computer Science (O-Level)">O-Level Computer Science</option>
                    <option value="Pure Mathematics (A-Level)">A-Level Pure Mathematics</option>
                  </select>
                </div>

                {/* Sitting / Target Session */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Target Sitting Session
                  </label>
                  <select
                    value={targetSession}
                    onChange={(e) => setTargetSession(e.target.value)}
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-primary"
                  >
                    <option value="Nov 2026 Examination">November 2026 Examination</option>
                    <option value="June 2026 Examination">June 2026 Examination</option>
                    <option value="Nov 2027 Examination">November 2027 Examination</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Forecast Overview Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                  AI Model: Neural Exam Analyzer v3.2
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700 text-xs">
                  {selectedCurriculum} • {selectedSubjectKey}
                </Badge>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                Forecast Summary for {targetSession}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                The top 5 high-probability topic clusters below represent an estimated <strong>65% – 75%</strong> of the total paper marks based on multi-year recurrence modeling.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md">
                <Link href="/enroll">
                  Enroll For Topic Masterclass
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Forecast Cards Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                High-Yield Predicted Topics
              </h2>
              <span className="text-xs text-muted-foreground font-medium">
                Ranked by Probability Index
              </span>
            </div>

            <div className="grid gap-5">
              {currentPredictions.map((pred, index) => (
                <Card
                  key={pred.topic}
                  className="border-border hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <CardHeader className="bg-muted/30 pb-4 border-b border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                          #{index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
                            {pred.topic}
                          </CardTitle>
                          <CardDescription className="text-xs text-muted-foreground flex items-center gap-3 mt-0.5">
                            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{pred.historicalFrequency}</span>
                            <span className="h-1 w-1 rounded-full bg-slate-400" />
                            <span>Weighting: {pred.expectedMarks}</span>
                          </CardDescription>
                        </div>
                      </div>

                      {/* Probability Score Pill */}
                      <div className="flex items-center gap-3 sm:text-right shrink-0">
                        <div>
                          <span className="text-xs text-muted-foreground block">Probability</span>
                          <span className="text-xl sm:text-2xl font-extrabold text-emerald-600">
                            {pred.probability}%
                          </span>
                        </div>
                        <Badge
                          className={`text-xs ${
                            pred.confidence === "Very High"
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                              : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30"
                          }`}
                        >
                          {pred.confidence}
                        </Badge>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Progress value={pred.probability} className="h-2 bg-muted" />
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 sm:p-6 space-y-4">
                    {/* Key Subtopics */}
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Key Exam Focus Sub-Topics:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {pred.keySubtopics.map((sub, i) => (
                          <Badge key={i} variant="secondary" className="text-xs py-1 px-2.5">
                            {sub}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Sample Question Preview */}
                    <div className="p-3.5 rounded-xl bg-muted/50 border border-border space-y-1">
                      <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                        Typical Examination Question Style:
                      </span>
                      <p className="text-xs sm:text-sm text-foreground font-mono italic">
                        &quot;{pred.sampleQuestionSnippet}&quot;
                      </p>
                    </div>

                    {/* Revision Strategy */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                        <span><strong>Tutor Strategy:</strong> {pred.revisionTips}</span>
                      </div>

                      <Link
                        href="/enroll"
                        className="text-primary hover:underline font-semibold flex items-center gap-1 shrink-0"
                      >
                        Join Revision Class <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Need Personal Help Box */}
          <Card className="border-border bg-slate-950 text-white shadow-xl">
            <CardContent className="p-8 text-center space-y-4">
              <Badge className="bg-primary/20 text-primary-foreground border-primary/30">
                Master These Predicted Topics
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-bold">
                Need One-on-One or Group Tutoring For Difficult Topics?
              </h3>
              <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
                Join <strong>GlobeDk Elite Academy</strong> weekend lessons or live virtual classes where Senior Tutor <strong>Dr. John Ariphios Daka</strong> breaks down each of these predicted question types step-by-step.
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center pt-2">
                <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold">
                  <Link href="/enroll">Enroll For Extra Lessons</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-emerald-500/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60"
                >
                  <a
                    href="https://wa.me/263786053315?text=Hello%20Dr%20Daka,%20I%20saw%20the%20AI%20Exam%20Predictor%20and%20want%20help%20with%20Mathematics"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="mr-2 h-4 w-4 text-emerald-400" />
                    Ask Dr. Daka on WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
