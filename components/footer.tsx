import Link from "next/link"
import Image from "next/image"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  GraduationCap,
  MessageCircle,
} from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-slate-950 text-slate-200">
      {/* Top Pre-Footer Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">
                  Join GlobeDk Elite Academy Today
                </h3>
                <p className="text-sm text-slate-400">
                  Online Lessons, Physical Classes in Epworth Harare, Homeschooling &amp; AI-powered Exam Prep.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/263786053315?text=Hello%20GlobeDK%20Elite%20Academy,%20I%20would%20like%20to%20enroll%20for%20lessons"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors shadow-sm"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <Link
                href="/enroll"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-colors shadow-sm"
              >
                Online Registration
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1">
                <Image
                  src="/Logo.png"
                  alt="GlobeDk Elite Academy Logo"
                  width={44}
                  height={44}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="font-bold text-xl text-white block">GlobeDk Elite Academy</span>
                <span className="text-xs text-slate-400">Excellence in Education. Success for Life.</span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Zimbabwe's trusted education academy offering professional tutoring for ZIMSEC &amp; Cambridge O-Level and A-Level curricula through Live Virtual Classes, Physical Lessons, Homeschooling, and One-on-One Mentorship.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Qualified Tutors • Proven 95% Pass Rate Track Record</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About the Academy
                </Link>
              </li>
              <li>
                <Link href="/subjects" className="hover:text-white transition-colors">
                  Subjects &amp; Pricing
                </Link>
              </li>
              <li>
                <Link href="/timetable" className="hover:text-white transition-colors">
                  Weekend Timetable
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-white transition-colors">
                  Student Success Stories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Programmes */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-200">
              Programmes
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/subjects" className="hover:text-white transition-colors">
                  ZIMSEC O-Level &amp; A-Level
                </Link>
              </li>
              <li>
                <Link href="/subjects" className="hover:text-white transition-colors">
                  Cambridge IGCSE &amp; A-Level
                </Link>
              </li>
              <li>
                <Link href="/enroll" className="hover:text-white transition-colors">
                  Homeschooling Zimbabwe
                </Link>
              </li>
              <li>
                <Link href="/enroll" className="hover:text-white transition-colors">
                  One-on-One Tutoring
                </Link>
              </li>
              <li>
                <Link href="/exam-predictor" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  AI Exam Predictor
                </Link>
              </li>
              <li>
                <Link href="/payment" className="hover:text-white transition-colors">
                  Payment Options
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-200">
              Contact &amp; Location
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>Epworth StopOver, Harare, Zimbabwe</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div className="space-y-1">
                  <a
                    href="tel:+263786053315"
                    className="hover:text-white transition-colors block"
                  >
                    +263 78 605 3315
                  </a>
                  <a
                    href="tel:+263713225707"
                    className="hover:text-white transition-colors block"
                  >
                    +263 71 322 5707
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div className="space-y-0.5">
                  <a
                    href="mailto:admission@globedk.co.zw"
                    className="hover:text-white transition-colors block"
                  >
                    admission@globedk.co.zw
                  </a>
                  <a
                    href="mailto:principal@globedk.co.zw"
                    className="hover:text-white transition-colors block text-xs text-slate-400"
                  >
                    principal@globedk.co.zw
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span className="text-xs">Sat: 8am - 6pm | Sun: 8am - 4pm | Online: 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Payment Badges */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} GlobeDk Elite Academy. All rights reserved. Directed by Dr. John Ariphios Daka.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-400">Accepted Payment Methods:</span>
            <span className="px-2 py-0.5 rounded-sm bg-slate-800 text-slate-300 font-medium">EcoCash</span>
            <span className="px-2 py-0.5 rounded-sm bg-slate-800 text-slate-300 font-medium">Innbucks</span>
            <span className="px-2 py-0.5 rounded-sm bg-slate-800 text-slate-300 font-medium">USD Cash</span>
            <span className="px-2 py-0.5 rounded-sm bg-slate-800 text-slate-300 font-medium">Bank Transfer</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
