import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale, BookOpen, GraduationCap, DollarSign, ShieldAlert, CheckCircle2 } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />

      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-14 md:py-20 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-4">
          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
            Institutional Regulations
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Academic Terms of Enrollment &amp; Code of Conduct
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Policies governing tuition, classroom conduct, academic honesty, online learning protocols, and examination preparation at <strong>GlobeDk Elite Academy</strong>.
          </p>
          <p className="text-xs text-slate-400 font-mono">
            Academic Year 2026 / 2027 • Approved by the Directorate
          </p>
        </div>
      </section>

      {/* Main Terms Content */}
      <main className="flex-1 py-12 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <Card className="border-border shadow-md">
            <CardContent className="p-6 sm:p-10 space-y-8 text-sm text-muted-foreground leading-relaxed">
              {/* Term 1 */}
              <div className="space-y-3">
                <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2.5">
                  <GraduationCap className="h-5 w-5 text-primary shrink-0" />
                  1. Admission &amp; Enrollment Terms
                </h2>
                <p>
                  Enrollment in GlobeDk Elite Academy courses constitutes a mutual commitment between the Academy, the student, and the legal guardian. Students must be registered for their appropriate Form / Level (O-Level Forms 1–4, A-Level Lower &amp; Upper 6) under either the <strong>ZIMSEC</strong> or <strong>Cambridge</strong> syllabus.
                </p>
              </div>

              {/* Term 2 */}
              <div className="space-y-3">
                <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2.5">
                  <DollarSign className="h-5 w-5 text-primary shrink-0" />
                  2. Tuition Fees &amp; Payment Policies
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Monthly Tuition Schedule:</strong> Tuition fees are billed per subject per calendar month. Physical O-Level lessons are standard at US$15/subject/month, A-Level at US$20/subject/month; Online virtual sessions range from US$20 to US$30/subject/month.</li>
                  <li><strong>Due Dates:</strong> Tuition is payable on or before the 5th day of each calendar month to guarantee uninterrupted access to classes and study materials.</li>
                  <li><strong>Accepted Payment Methods:</strong> EcoCash, Innbucks, USD Cash (Epworth Harare center), and Direct Bank Transfer.</li>
                  <li><strong>Refund Policy:</strong> Tuition fees cover reserved tutor hours, classroom space, and digital resources; fees paid for an active ongoing month are non-refundable once classes have commenced.</li>
                </ul>
              </div>

              {/* Term 3 */}
              <div className="space-y-3">
                <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2.5">
                  <BookOpen className="h-5 w-5 text-primary shrink-0" />
                  3. Academic Integrity &amp; Student Conduct
                </h2>
                <p>
                  All students are expected to uphold the highest standards of academic integrity, respectful classroom dialogue, punctuality for scheduled weekend and online sessions, and regular completion of assigned homework and mock tests.
                </p>
                <div className="p-4 rounded-xl bg-card border border-border space-y-2 text-xs">
                  <p className="font-semibold text-foreground">Digital Classroom Protocol:</p>
                  <p className="text-muted-foreground">
                    Students attending virtual Zoom/Meet sessions must maintain courteous communication, participate actively, and not record or distribute lesson footage without explicit tutor authorization.
                  </p>
                </div>
              </div>

              {/* Term 4 */}
              <div className="space-y-3">
                <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2.5">
                  <Scale className="h-5 w-5 text-primary shrink-0" />
                  4. AI Examination Intelligence Disclaimer
                </h2>
                <p>
                  The AI Exam Predictor and syllabus analysis tools provided by GlobeDk Elite Academy are sophisticated statistical aids designed to help students prioritize revision based on multi-year recurrence frequencies. They do not constitute official advance leaked examination papers. Students are required to study their complete prescribed ZIMSEC and Cambridge curricula.
                </p>
              </div>

              {/* Contact Notice */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <span>Direct questions regarding terms to the Principal&apos;s Office.</span>
                <a
                  href="https://wa.me/263786053315"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-primary hover:underline"
                >
                  Contact Administration via WhatsApp (+263 78 605 3315) →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
