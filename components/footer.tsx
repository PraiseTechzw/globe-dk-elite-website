import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  GraduationCap,
  Scale,
  Lock,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-slate-950 text-slate-200">
      {/* Top Pre-Footer Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white">
                  GlobeDk Elite Academy Admissions
                </h3>
                <p className="text-sm text-slate-400">
                  Online Virtual Classrooms, Harare Campus Lessons,
                  Homeschooling &amp; AI-Powered Exam Prep.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/263786053315?text=Hello%20GlobeDK%20Elite%20Academy,%20I%20would%20like%20to%20enroll%20for%20lessons"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <FaWhatsapp className="h-4 w-4" />
                WhatsApp Admissions
              </a>
              <Link
                href="/enroll"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
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
              <div className="flex h-16 w-16 shrink-0 items-start justify-center overflow-hidden rounded-2xl border border-amber-400/30 bg-[#f8f7f2] p-1.5 shadow-inner">
                <Image
                  src="/logo.png"
                  alt="GlobeDk Elite Academy crest"
                  width={80}
                  height={89}
                  className="h-auto w-full object-contain object-top"
                  priority
                />
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white block">
                  GlobeDk Elite
                </span>
                <span className="text-[10px] text-amber-300 uppercase tracking-[0.18em] font-bold">
                  Academy · Harare &amp; Online
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Zimbabwe&apos;s trusted educational center offering rigorous
              preparation for ZIMSEC &amp; Cambridge International O-Level and
              A-Level examinations through physical campus classes, live virtual
              instruction, and AI syllabus intelligence.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>
                Certified Faculty • Proven 95% Examination Pass Rate Track
                Record
              </span>
            </div>
          </div>

          {/* Institutional Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  Academy &amp; Leadership
                </Link>
              </li>
              <li>
                <Link
                  href="/subjects"
                  className="hover:text-white transition-colors"
                >
                  Curriculum &amp; Tuition
                </Link>
              </li>
              <li>
                <Link
                  href="/timetable"
                  className="hover:text-white transition-colors"
                >
                  Weekend Timetable
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="hover:text-white transition-colors"
                >
                  Honors &amp; Results
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Admissions Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Disciplines */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-slate-200">
              Programmes
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link
                  href="/subjects"
                  className="hover:text-white transition-colors"
                >
                  ZIMSEC O-Level &amp; A-Level
                </Link>
              </li>
              <li>
                <Link
                  href="/subjects"
                  className="hover:text-white transition-colors"
                >
                  Cambridge IGCSE &amp; A-Level
                </Link>
              </li>
              <li>
                <Link
                  href="/enroll"
                  className="hover:text-white transition-colors"
                >
                  Homeschooling Zimbabwe
                </Link>
              </li>
              <li>
                <Link
                  href="/enroll"
                  className="hover:text-white transition-colors"
                >
                  1-on-1 Mentorship
                </Link>
              </li>
              <li>
                <Link
                  href="/exam-predictor"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  AI Exam Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/payment"
                  className="hover:text-white transition-colors"
                >
                  Tuition Payment Methods
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-slate-200">
              Legal &amp; Policies
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Lock className="h-3.5 w-3.5 text-slate-400" />
                  Academic Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Scale className="h-3.5 w-3.5 text-slate-400" />
                  Terms of Enrollment
                </Link>
              </li>
              <li>
                <Link
                  href="/terms#conduct"
                  className="hover:text-white transition-colors"
                >
                  Student Code of Conduct
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy#minors"
                  className="hover:text-white transition-colors"
                >
                  Minor &amp; Guardian Consent
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Dispute &amp; Inquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Payment Badges */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} GlobeDk Elite Academy. All rights reserved.
            Directed by Dr. John Ariphios Daka.
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-slate-500">Accepted Payment Channels:</span>
            <span className="px-2 py-0.5 rounded-sm bg-slate-900 border border-slate-800 text-slate-300 font-medium">
              EcoCash
            </span>
            <span className="px-2 py-0.5 rounded-sm bg-slate-900 border border-slate-800 text-slate-300 font-medium">
              Innbucks
            </span>
            <span className="px-2 py-0.5 rounded-sm bg-slate-900 border border-slate-800 text-slate-300 font-medium">
              USD Cash
            </span>
            <span className="px-2 py-0.5 rounded-sm bg-slate-900 border border-slate-800 text-slate-300 font-medium">
              Bank Transfer
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
