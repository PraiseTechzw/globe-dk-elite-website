import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, UserCheck, Scale } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />

      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-14 md:py-20 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-4">
          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
            Legal &amp; Regulatory Compliance
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Academic Privacy Policy &amp; Data Protection
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Protecting student information, minor privacy, guardian records, and academic integrity in accordance with the <strong>Zimbabwe Cyber and Data Protection Act [Chapter 12:07]</strong> and international best practices.
          </p>
          <p className="text-xs text-slate-400 font-mono">
            Effective Date: Academic Year 2026 / 2027 • Last Reviewed: August 2026
          </p>
        </div>
      </section>

      {/* Main Legal Content */}
      <main className="flex-1 py-12 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <Card className="border-border shadow-md">
            <CardContent className="p-6 sm:p-10 space-y-8 text-sm text-muted-foreground leading-relaxed">
              {/* Section 1 */}
              <div className="space-y-3">
                <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2.5">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                  1. Institutional Commitment &amp; Scope
                </h2>
                <p>
                  GlobeDk Elite Academy (&quot;the Academy&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates as a registered educational institution offering tutoring, online virtual classes, physical extra lessons in Epworth, Harare, homeschooling, and academic examination preparation for <strong>ZIMSEC</strong> and <strong>Cambridge International</strong> curricula.
                </p>
                <p>
                  This Privacy Policy applies to all students, parents, legal guardians, and tutors utilizing our physical premises, digital student portals, and AI examination intelligence tools.
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-3">
                <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2.5">
                  <Lock className="h-5 w-5 text-primary shrink-0" />
                  2. Student &amp; Guardian Information Collected
                </h2>
                <p>
                  To provide accredited tutoring and maintain student academic records, we collect the following categories of data:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Student Identity Data:</strong> Full legal name, date of birth, gender, educational level (Form 1 to Upper 6), and current school.</li>
                  <li><strong>Contact Details:</strong> Phone/WhatsApp number, residential locality, and email address.</li>
                  <li><strong>Guardian &amp; Sponsor Information:</strong> Parent/guardian full name, contact phone numbers, and emergency contact details.</li>
                  <li><strong>Academic Records:</strong> Subject selections, mock examination results, progress scores, attendance logs, and syllabus mastery assessments.</li>
                  <li><strong>Digital Session Records:</strong> Secure login timestamps, question submissions, and virtual classroom participation records.</li>
                </ul>
              </div>

              {/* Section 3: Minor Protection */}
              <div className="space-y-3 p-5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-foreground">
                <h3 className="font-serif font-bold text-base text-amber-900 dark:text-amber-200 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-amber-700 dark:text-amber-400" />
                  3. Special Protections for Minor Learners (Under 18)
                </h3>
                <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-300">
                  Because many of our learners are minor students under the age of 18, guardian consent is mandatory during registration. We do not sell, rent, or commercialize student data under any circumstances. Student records are used strictly for academic guidance, grade improvement, and communication with verified guardians.
                </p>
              </div>

              {/* Section 4 */}
              <div className="space-y-3">
                <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2.5">
                  <Eye className="h-5 w-5 text-primary shrink-0" />
                  4. Purpose &amp; Lawful Basis of Processing
                </h2>
                <p>
                  Data collected by GlobeDk Elite Academy is processed for the following legitimate educational purposes:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-lg border border-border bg-card">
                    <p className="font-semibold text-foreground text-xs">Curriculum Delivery</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Scheduling live classes, homework feedback, and mock exams.</p>
                  </div>
                  <div className="p-3.5 rounded-lg border border-border bg-card">
                    <p className="font-semibold text-foreground text-xs">AI Pattern Forecasting</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Assisting students in targeting high-yield examination topics.</p>
                  </div>
                  <div className="p-3.5 rounded-lg border border-border bg-card">
                    <p className="font-semibold text-foreground text-xs">Guardian Reporting</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Providing parents with real-time academic progress reports.</p>
                  </div>
                  <div className="p-3.5 rounded-lg border border-border bg-card">
                    <p className="font-semibold text-foreground text-xs">Institutional Safety</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Ensuring safe physical and virtual classroom environments.</p>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="space-y-3">
                <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2.5">
                  <Scale className="h-5 w-5 text-primary shrink-0" />
                  5. Data Retention &amp; Rights of Access
                </h2>
                <p>
                  Parents and students have the right to request access to their academic transcript records, request corrections of contact details, or request account closure at the end of their examination cycle by contacting <a href="mailto:admission@globedk.co.zw" className="text-primary hover:underline font-semibold">admission@globedk.co.zw</a> or messaging Senior Tutor Dr. Daka at <strong>+263 78 605 3315</strong>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
