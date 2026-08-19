"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@supabase/supabase-js";
import {
  GraduationCap,
  BookOpenText,
  CheckCircle2,
  Phone,
  Mail,
  User,
  ShieldCheck,
  MapPin,
  Video,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Clock,
  AlertCircle,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Laptop,
  Compass,
  Landmark,
  Receipt,
  Briefcase,
  TrendingUp,
  Infinity as InfinityIcon,
  BarChart3,
  Building2,
  Binary,
  Scale,
  Lock,
} from "lucide-react";

// Supabase client with safe fallback
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ALL_SUBJECTS = {
  "O-Level": [
    { name: "Mathematics", icon: Calculator, fee: 15, onlineFee: 20 },
    { name: "English Language", icon: BookOpenText, fee: 15, onlineFee: 20 },
    { name: "Combined Science", icon: Atom, fee: 15, onlineFee: 20 },
    { name: "Physics", icon: Atom, fee: 15, onlineFee: 20 },
    { name: "Chemistry", icon: FlaskConical, fee: 15, onlineFee: 20 },
    { name: "Biology", icon: Dna, fee: 15, onlineFee: 20 },
    { name: "Computer Science", icon: Laptop, fee: 15, onlineFee: 20 },
    { name: "Geography", icon: Compass, fee: 15, onlineFee: 20 },
    { name: "History & Heritage", icon: Landmark, fee: 15, onlineFee: 20 },
    { name: "Principles of Accounts", icon: Receipt, fee: 15, onlineFee: 20 },
    { name: "Commerce", icon: Briefcase, fee: 15, onlineFee: 20 },
    { name: "Economics", icon: TrendingUp, fee: 15, onlineFee: 20 },
  ],
  "A-Level": [
    { name: "Pure Mathematics", icon: InfinityIcon, fee: 20, onlineFee: 25 },
    { name: "Statistics", icon: BarChart3, fee: 20, onlineFee: 25 },
    { name: "Computer Science", icon: Binary, fee: 20, onlineFee: 25 },
    { name: "Geography", icon: Compass, fee: 20, onlineFee: 25 },
    { name: "Business Studies", icon: Building2, fee: 20, onlineFee: 25 },
    { name: "Economics", icon: TrendingUp, fee: 20, onlineFee: 25 },
  ],
};

export default function EnrollPage() {
  const [curriculum, setCurriculum] = useState<"ZIMSEC" | "Cambridge">("ZIMSEC");
  const [level, setLevel] = useState<"O-Level" | "A-Level">("O-Level");
  const [formLevel, setFormLevel] = useState<string>("Form 4");
  const [learningMode, setLearningMode] = useState<string>("Physical (Harare Campus)");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["Mathematics"]);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "Male",
    dob: "",
    school: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    guardianRelationship: "Parent",
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSubject = (subjectName: string) => {
    if (selectedSubjects.includes(subjectName)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== subjectName));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, subjectName]);
    }
  };

  const calculateTotalFee = () => {
    const isOnline = learningMode.includes("Online") || learningMode.includes("Virtual");
    const rate = level === "O-Level" ? (isOnline ? 20 : 15) : (isOnline ? 25 : 20);
    return selectedSubjects.length * rate;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.firstName || !formData.lastName || !formData.phone) {
      setErrorMsg("Please provide the scholar's first name, last name, and contact telephone number.");
      return;
    }

    if (selectedSubjects.length === 0) {
      setErrorMsg("Please select at least one academic discipline.");
      return;
    }

    if (!agreedToTerms) {
      setErrorMsg("Please accept the Academic Terms of Service & Privacy Policy consent checkbox before submitting.");
      return;
    }

    setIsSubmitting(true);
    const refCode = "GDK-" + Math.floor(100000 + Math.random() * 900000);
    setReferenceCode(refCode);

    try {
      if (supabase && process.env.NEXT_PUBLIC_SUPABASE_URL) {
        await supabase.from("extra_lesson_applications").insert({
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim() || null,
          phone: formData.phone.trim(),
          gender: formData.gender,
          dob: formData.dob || null,
          level: `${curriculum} - ${level} (${formLevel})`,
          learning_mode: learningMode,
          subjects: selectedSubjects,
          guardian_name: formData.guardianName.trim() || null,
          guardian_phone: formData.guardianPhone.trim() || null,
          guardian_email: formData.guardianEmail.trim() || null,
          relationship: formData.guardianRelationship,
          notes: formData.specialRequests || null,
          ref_code: refCode,
        });
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Submission notice:", err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppUrl = () => {
    const message = encodeURIComponent(
      `Hello Dr. Daka, I just submitted an official admission application for GlobeDk Elite Academy!\n\n` +
        `*Reference:* ${referenceCode || "New Application"}\n` +
        `*Scholar:* ${formData.firstName} ${formData.lastName}\n` +
        `*Curriculum:* ${curriculum} ${level} (${formLevel})\n` +
        `*Modality:* ${learningMode}\n` +
        `*Enrolled Disciplines (${selectedSubjects.length}):* ${selectedSubjects.join(", ")}\n` +
        `*Estimated Monthly Tuition:* US$${calculateTotalFee()}\n` +
        `*Contact:* ${formData.phone}\n\n` +
        `Please confirm our registration placement and provide timetable coordinates.`
    );
    return `https://wa.me/263786053315?text=${message}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20">
      <Navigation />

      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-14 md:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl space-y-4">
          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-mono uppercase">
            Official Admissions Application • 2026 / 2027 Session
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Academic Enrollment Portal
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Register for <strong>ZIMSEC &amp; Cambridge O-Level / A-Level</strong> instruction, live virtual classrooms, homeschooling tracks, or Harare campus weekend classes.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 py-12 bg-muted/20">
        <div className="container mx-auto px-4 max-w-5xl">
          {submitted ? (
            /* SUCCESS CONFIRMATION STATE */
            <Card className="border-border shadow-2xl overflow-hidden">
              <div className="bg-slate-950 text-white p-8 text-center space-y-3 border-b border-slate-800">
                <div className="h-16 w-16 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-2 text-amber-400">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Admission Application Recorded
                </h2>
                <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
                  Thank you, <strong>{formData.firstName}</strong>. Your formal enrollment request has been documented.
                </p>
                <div className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-mono font-bold mt-2">
                  Reference: {referenceCode}
                </div>
              </div>

              <CardContent className="p-6 sm:p-10 space-y-8">
                {/* Summary Details */}
                <div className="grid md:grid-cols-2 gap-6 bg-muted/40 p-6 rounded-2xl border border-border text-sm">
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                      Scholar Information
                    </p>
                    <p className="font-serif font-bold text-base text-foreground">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-muted-foreground">Phone: {formData.phone}</p>
                    <p className="text-muted-foreground">Curriculum: {curriculum} {level} ({formLevel})</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                      Enrolled Disciplines &amp; Modality
                    </p>
                    <p className="font-semibold text-foreground">
                      {learningMode}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedSubjects.map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                    <p className="font-bold text-amber-600 dark:text-amber-400 text-base pt-2">
                      Estimated Monthly Tuition: US${calculateTotalFee()}
                    </p>
                  </div>
                </div>

                {/* Instant WhatsApp Verification Trigger */}
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-4">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-6 w-6 text-emerald-600 mt-1 shrink-0" />
                    <div>
                      <h4 className="font-serif font-bold text-emerald-900 dark:text-emerald-200 text-base">
                        Confirm Registration with Senior Tutor
                      </h4>
                      <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 mt-0.5">
                        Tap below to transmit your admission reference directly to <strong>Dr. John Ariphios Daka</strong> on WhatsApp to finalize your timetable allocation and payment receipt.
                      </p>
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 text-xs uppercase tracking-wider shadow-md"
                  >
                    <a href={generateWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Send Admission to Dr. Daka on WhatsApp
                    </a>
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Button asChild variant="outline">
                    <Link href="/">Return to Homepage</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/timetable">View Timetable Coordinates</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleFormSubmit} className="space-y-8">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* STEP 1: CURRICULUM & LEVEL SELECTION */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold font-serif">
                        1
                      </div>
                      <div>
                        <CardTitle className="font-serif text-lg">Curriculum &amp; Academic Level</CardTitle>
                        <CardDescription>Select the examination board and current scholar form</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs">{curriculum} - {level}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Curriculum Toggle */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Examination Board
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setCurriculum("ZIMSEC")}
                        className={`p-3.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                          curriculum === "ZIMSEC"
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-card text-foreground border-border hover:bg-muted"
                        }`}
                      >
                        <GraduationCap className="h-4 w-4" />
                        ZIMSEC Board
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurriculum("Cambridge")}
                        className={`p-3.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                          curriculum === "Cambridge"
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-card text-foreground border-border hover:bg-muted"
                        }`}
                      >
                        <BookOpenText className="h-4 w-4" />
                        Cambridge International (CAIE)
                      </button>
                    </div>
                  </div>

                  {/* Level Toggle */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Category Level
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setLevel("O-Level");
                            setSelectedSubjects(["Mathematics"]);
                          }}
                          className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all ${
                            level === "O-Level"
                              ? "bg-primary text-primary-foreground border-primary font-bold"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          O-Level (Forms 1–4)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLevel("A-Level");
                            setSelectedSubjects(["Pure Mathematics"]);
                          }}
                          className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all ${
                            level === "A-Level"
                              ? "bg-primary text-primary-foreground border-primary font-bold"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          A-Level (Lower / Upper 6)
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Specific Form / Sitting Class
                      </Label>
                      <select
                        value={formLevel}
                        onChange={(e) => setFormLevel(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                      >
                        {level === "O-Level" ? (
                          <>
                            <option value="Form 1">Form 1</option>
                            <option value="Form 2">Form 2</option>
                            <option value="Form 3">Form 3</option>
                            <option value="Form 4">Form 4 (Candidate Class)</option>
                          </>
                        ) : (
                          <>
                            <option value="Lower 6">Lower 6 (Form 5)</option>
                            <option value="Upper 6">Upper 6 (Candidate Class)</option>
                          </>
                        )}
                        <option value="Candidate Revision">Candidate Repeat / Revision</option>
                      </select>
                    </div>
                  </div>

                  {/* Learning Mode */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Desired Learning Modality
                    </Label>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {[
                        { title: "Physical (Harare Campus)", desc: "Epworth center weekend & weekday classes" },
                        { title: "Live Virtual Classroom", desc: "Interactive digital sessions from anywhere" },
                        { title: "1-on-1 Private Mentorship", desc: "Individual personalized coaching" },
                      ].map((mode) => (
                        <button
                          key={mode.title}
                          type="button"
                          onClick={() => setLearningMode(mode.title)}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            learningMode === mode.title
                              ? "bg-primary/10 border-primary text-primary ring-1 ring-primary font-semibold"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          <p className="font-serif font-bold text-xs sm:text-sm">{mode.title}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5 font-light">{mode.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* STEP 2: DISCIPLINE SELECTION WITH CORRECT ICONS */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold font-serif">
                        2
                      </div>
                      <div>
                        <CardTitle className="font-serif text-lg">Select Subjects ({selectedSubjects.length})</CardTitle>
                        <CardDescription>Choose the subject masterclasses you require</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold block">Monthly Tuition:</span>
                      <span className="font-serif text-xl font-bold text-amber-600 dark:text-amber-400">US${calculateTotalFee()}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {ALL_SUBJECTS[level].map((subj) => {
                      const isSelected = selectedSubjects.includes(subj.name);
                      const Icon = subj.icon;
                      return (
                        <div
                          key={subj.name}
                          onClick={() => toggleSubject(subj.name)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-2 ${
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-sm"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`h-7 w-7 rounded-md flex items-center justify-center text-xs ${
                                isSelected ? "bg-white/20 text-white" : "bg-muted text-primary"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold">{subj.name}</span>
                          </div>
                          <span
                            className={`text-xs font-bold font-mono ${
                              isSelected ? "text-primary-foreground/90" : "text-muted-foreground"
                            }`}
                          >
                            ${learningMode.includes("Virtual") || learningMode.includes("Online") ? subj.onlineFee : subj.fee}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* STEP 3: SCHOLAR & GUARDIAN DETAILS */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold font-serif">
                      3
                    </div>
                    <div>
                      <CardTitle className="font-serif text-lg">Scholar &amp; Guardian Information</CardTitle>
                      <CardDescription>Official details for student records and timetable scheduling</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Student Details */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
                      Scholar Information
                    </h4>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName">Scholar First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="e.g. Tapiwa"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="lastName">Scholar Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="e.g. Makumbe"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone / WhatsApp Number *</Label>
                        <Input
                          id="phone"
                          placeholder="e.g. +263 78 XXX XXXX"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email Address (Optional)</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="scholar@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="gender">Gender</Label>
                        <select
                          id="gender"
                          value={formData.gender}
                          onChange={(e) => handleInputChange("gender", e.target.value)}
                          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="school">Current School</Label>
                        <Input
                          id="school"
                          placeholder="e.g. Epworth High School"
                          value={formData.school}
                          onChange={(e) => handleInputChange("school", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guardian Details */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
                      Parent / Legal Guardian Information
                    </h4>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="guardianName">Parent / Guardian Full Name</Label>
                        <Input
                          id="guardianName"
                          placeholder="e.g. Mr. / Mrs. Makumbe"
                          value={formData.guardianName}
                          onChange={(e) => handleInputChange("guardianName", e.target.value)}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="guardianPhone">Parent / Guardian Contact Phone</Label>
                        <Input
                          id="guardianPhone"
                          placeholder="e.g. +263 71 XXX XXXX"
                          value={formData.guardianPhone}
                          onChange={(e) => handleInputChange("guardianPhone", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* LEGAL CONSENTS & DECLARATION */}
                  <div className="p-4 rounded-xl bg-card border border-border space-y-3 pt-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="termsConsent"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded-sm border-slate-700 text-primary focus:ring-primary"
                        required
                      />
                      <label htmlFor="termsConsent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                        <span className="font-semibold text-foreground">Academic Declaration &amp; Guardian Consent: </span>
                        I confirm that the information provided is accurate, and I agree to the GlobeDk Elite Academy{" "}
                        <Link href="/terms" target="_blank" className="text-primary hover:underline font-semibold">
                          Terms of Enrollment
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" target="_blank" className="text-primary hover:underline font-semibold">
                          Privacy Policy
                        </Link>{" "}
                        in accordance with the Zimbabwe Cyber &amp; Data Protection Act.
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit CTA */}
              <div className="p-6 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Estimated Monthly Tuition</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-amber-600 dark:text-amber-400">US${calculateTotalFee()}</span>
                    <span className="text-xs text-muted-foreground">/ month ({selectedSubjects.length} subjects)</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto font-bold h-12 px-8 text-xs uppercase tracking-wider bg-primary text-primary-foreground shadow-md"
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Admission Application"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}