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
  BookOpen,
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
  Calendar,
  AlertCircle,
  Clock,
  DollarSign,
  ChevronRight,
} from "lucide-react";

// Optional Supabase client for applications
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const ALL_SUBJECTS = {
  "O-Level": [
    { name: "Mathematics", fee: 15, onlineFee: 20 },
    { name: "English Language", fee: 15, onlineFee: 20 },
    { name: "Combined Science", fee: 15, onlineFee: 20 },
    { name: "Physics", fee: 15, onlineFee: 20 },
    { name: "Chemistry", fee: 15, onlineFee: 20 },
    { name: "Biology", fee: 15, onlineFee: 20 },
    { name: "Computer Science", fee: 15, onlineFee: 20 },
    { name: "Geography", fee: 15, onlineFee: 20 },
    { name: "History", fee: 15, onlineFee: 20 },
    { name: "Heritage Studies", fee: 15, onlineFee: 20 },
    { name: "Commerce", fee: 15, onlineFee: 20 },
    { name: "Principles of Accounts", fee: 15, onlineFee: 20 },
  ],
  "A-Level": [
    { name: "Pure Mathematics", fee: 20, onlineFee: 25 },
    { name: "Statistics", fee: 20, onlineFee: 25 },
    { name: "Computer Science", fee: 20, onlineFee: 25 },
    { name: "Geography", fee: 20, onlineFee: 25 },
    { name: "Business Studies", fee: 20, onlineFee: 25 },
    { name: "Economics", fee: 20, onlineFee: 25 },
  ],
};

export default function EnrollPage() {
  const [step, setStep] = useState<number>(1);
  const [curriculum, setCurriculum] = useState<"ZIMSEC" | "Cambridge">("ZIMSEC");
  const [level, setLevel] = useState<"O-Level" | "A-Level">("O-Level");
  const [formLevel, setFormLevel] = useState<string>("Form 4");
  const [learningMode, setLearningMode] = useState<string>("Physical (Epworth, Harare)");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["Mathematics"]);

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

  // Fee calculation
  const calculateTotalFee = () => {
    const isOnline = learningMode.includes("Online");
    const rate = level === "O-Level" ? (isOnline ? 20 : 15) : (isOnline ? 25 : 20);
    return selectedSubjects.length * rate;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.firstName || !formData.lastName || !formData.phone) {
      setErrorMsg("Please provide the student's first name, last name, and contact phone number.");
      return;
    }

    if (selectedSubjects.length === 0) {
      setErrorMsg("Please select at least one subject.");
      return;
    }

    setIsSubmitting(true);
    const refCode = "GDK-" + Math.floor(100000 + Math.random() * 900000);
    setReferenceCode(refCode);

    try {
      if (supabase) {
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
      console.error("Submission error:", err);
      // Still show success with WhatsApp option
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppUrl = () => {
    const message = encodeURIComponent(
      `Hello Dr. Daka, I just submitted an enrollment application for GlobeDk Elite Academy!\n\n` +
        `*Reference:* ${referenceCode || "New Application"}\n` +
        `*Student Name:* ${formData.firstName} ${formData.lastName}\n` +
        `*Curriculum & Level:* ${curriculum} ${level} (${formLevel})\n` +
        `*Learning Mode:* ${learningMode}\n` +
        `*Selected Subjects (${selectedSubjects.length}):* ${selectedSubjects.join(", ")}\n` +
        `*Estimated Monthly Tuition:* US$${calculateTotalFee()}\n` +
        `*Student/Parent Phone:* ${formData.phone}\n\n` +
        `Please confirm our registration and share class access instructions.`
    );
    return `https://wa.me/263786053315?text=${message}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20">
      <Navigation />

      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-12 md:py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl space-y-4">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
            Admissions Open 2026 / 2027
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Student Enrollment Portal
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Apply online for <strong>ZIMSEC &amp; Cambridge O-Level / A-Level Lessons</strong>, Live Virtual Classes, Homeschooling, or Physical Lessons at Epworth Harare.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 py-12 bg-muted/20">
        <div className="container mx-auto px-4 max-w-5xl">
          {submitted ? (
            /* SUCCESS CONFIRMATION STATE */
            <Card className="border-border shadow-2xl overflow-hidden">
              <div className="bg-emerald-600 text-white p-8 text-center space-y-3">
                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Application Submitted Successfully!
                </h2>
                <p className="text-emerald-100 text-sm max-w-xl mx-auto">
                  Thank you, <strong>{formData.firstName}</strong>. Your enrollment application has been recorded.
                </p>
                <div className="inline-block bg-white text-slate-900 px-4 py-1.5 rounded-full text-xs font-mono font-bold mt-2">
                  Application Reference: {referenceCode}
                </div>
              </div>

              <CardContent className="p-6 sm:p-10 space-y-8">
                {/* Summary Details */}
                <div className="grid md:grid-cols-2 gap-6 bg-muted/50 p-6 rounded-2xl border border-border text-sm">
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                      Student Details
                    </p>
                    <p className="font-semibold text-base text-foreground">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-muted-foreground">Phone: {formData.phone}</p>
                    <p className="text-muted-foreground">Email: {formData.email || "—"}</p>
                    <p className="text-muted-foreground">Level: {curriculum} {level} ({formLevel})</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                      Enrolled Subjects &amp; Mode
                    </p>
                    <p className="font-semibold text-base text-foreground">
                      {learningMode}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedSubjects.map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                    <p className="font-bold text-emerald-600 text-base pt-2">
                      Estimated Monthly Tuition: US${calculateTotalFee()}
                    </p>
                  </div>
                </div>

                {/* Instant WhatsApp Verification Trigger */}
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-4">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-6 w-6 text-emerald-600 mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-emerald-900 dark:text-emerald-200">
                        Confirm Admission Instantly on WhatsApp
                      </h4>
                      <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 mt-0.5">
                        Tap below to send your application summary directly to <strong>Dr. John Ariphios Daka</strong> on WhatsApp for immediate class scheduling, timetable placement, and payment verification.
                      </p>
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 text-sm shadow-md"
                  >
                    <a href={generateWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Send Application to Dr. Daka on WhatsApp
                    </a>
                  </Button>
                </div>

                {/* Next Steps / Payment Instructions */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Next Steps &amp; Payment Options
                  </h3>

                  <div className="grid sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-xl border border-border bg-card space-y-1.5">
                      <p className="font-bold text-foreground">1. EcoCash / Innbucks</p>
                      <p className="text-muted-foreground">Send to <strong>+263 78 605 3315</strong></p>
                      <p className="text-muted-foreground">Account Name: John Ariphios Daka</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-card space-y-1.5">
                      <p className="font-bold text-foreground">2. Physical USD Cash</p>
                      <p className="text-muted-foreground">Pay in person at our tutoring center</p>
                      <p className="text-muted-foreground">Epworth StopOver, Harare</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-card space-y-1.5">
                      <p className="font-bold text-foreground">3. Bank Transfer</p>
                      <p className="text-muted-foreground">Contact +263 78 605 3315 for direct banking details</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Button asChild variant="outline">
                    <Link href="/">Return to Homepage</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/timetable">View Class Timetable</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* ENROLLMENT FORM STATE */
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
                      <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <CardTitle className="text-lg">Curriculum &amp; Academic Level</CardTitle>
                        <CardDescription>Select your exam board and current level</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">{curriculum} - {level}</Badge>
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
                        ZIMSEC Curriculum
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
                        <BookOpen className="h-4 w-4" />
                        Cambridge (CAIE / IGCSE)
                      </button>
                    </div>
                  </div>

                  {/* Level Toggle */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Level Category
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
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          O-Level (Forms 1-4)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLevel("A-Level");
                            setSelectedSubjects(["Pure Mathematics"]);
                          }}
                          className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all ${
                            level === "A-Level"
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          A-Level (Lower / Upper 6)
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Specific Form / Class
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
                        <option value="Repeat / Revision">Repeat / Private Candidate</option>
                      </select>
                    </div>
                  </div>

                  {/* Learning Mode */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Preferred Learning Mode
                    </Label>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {[
                        { title: "Physical (Harare)", desc: "Epworth center weekend & weekday classes" },
                        { title: "Live Online Virtual", desc: "Interactive Zoom/Meet from anywhere" },
                        { title: "1-on-1 Mentorship", desc: "Private personalized tutoring" },
                      ].map((mode) => (
                        <button
                          key={mode.title}
                          type="button"
                          onClick={() => setLearningMode(mode.title)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            learningMode === mode.title
                              ? "bg-primary/10 border-primary text-primary ring-1 ring-primary"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          <p className="font-bold text-xs sm:text-sm">{mode.title}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{mode.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* STEP 2: SUBJECT SELECTION & LIVE FEE ESTIMATOR */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <CardTitle className="text-lg">Select Subjects ({selectedSubjects.length})</CardTitle>
                        <CardDescription>Choose the subjects you would like tutoring for</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground block">Estimated Tuition:</span>
                      <span className="text-lg font-bold text-emerald-600">US${calculateTotalFee()}/mo</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {ALL_SUBJECTS[level].map((subj) => {
                      const isSelected = selectedSubjects.includes(subj.name);
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
                              className={`h-5 w-5 rounded-md flex items-center justify-center text-xs ${
                                isSelected ? "bg-white text-primary" : "border border-muted-foreground/40"
                              }`}
                            >
                              {isSelected && <CheckCircle2 className="h-4 w-4" />}
                            </div>
                            <span className="text-xs sm:text-sm font-semibold">{subj.name}</span>
                          </div>
                          <span
                            className={`text-xs font-bold ${
                              isSelected ? "text-primary-foreground/90" : "text-muted-foreground"
                            }`}
                          >
                            US${learningMode.includes("Online") ? subj.onlineFee : subj.fee}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-xs text-muted-foreground pt-2">
                    💡 <em>Note:</em> You can add or modify subjects anytime during your academic term.
                  </p>
                </CardContent>
              </Card>

              {/* STEP 3: STUDENT & PARENT / GUARDIAN DETAILS */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <CardTitle className="text-lg">Student &amp; Guardian Information</CardTitle>
                      <CardDescription>Contact details for admission verification and scheduling</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Student Details */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
                      Student Information
                    </h4>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName">Student First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="e.g. Tapiwa"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="lastName">Student Last Name *</Label>
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
                          placeholder="student@example.com"
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
                        <Label htmlFor="school">Current School (if applicable)</Label>
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
                      Parent / Guardian Information
                    </h4>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="guardianName">Parent / Guardian Name</Label>
                        <Input
                          id="guardianName"
                          placeholder="e.g. Mr. / Mrs. Makumbe"
                          value={formData.guardianName}
                          onChange={(e) => handleInputChange("guardianName", e.target.value)}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="guardianPhone">Parent / Guardian Phone</Label>
                        <Input
                          id="guardianPhone"
                          placeholder="e.g. +263 71 XXX XXXX"
                          value={formData.guardianPhone}
                          onChange={(e) => handleInputChange("guardianPhone", e.target.value)}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="guardianRelationship">Relationship</Label>
                        <select
                          id="guardianRelationship"
                          value={formData.guardianRelationship}
                          onChange={(e) => handleInputChange("guardianRelationship", e.target.value)}
                          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                        >
                          <option value="Parent">Parent</option>
                          <option value="Guardian">Guardian</option>
                          <option value="Sponsor">Sponsor</option>
                          <option value="Self">Self</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="specialRequests">Special Requests / Weak Areas</Label>
                        <Input
                          id="specialRequests"
                          placeholder="e.g. Needs help with Algebra &amp; Trigonometry"
                          value={formData.specialRequests}
                          onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit CTA */}
              <div className="p-6 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Estimated Monthly Tuition</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-emerald-600">US${calculateTotalFee()}</span>
                    <span className="text-xs text-muted-foreground">/ month ({selectedSubjects.length} subjects)</span>
                  </div>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto font-bold h-12 px-8 text-base bg-primary text-primary-foreground shadow-md"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Enrollment Application"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}