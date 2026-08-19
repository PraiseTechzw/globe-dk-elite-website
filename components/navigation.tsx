"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight, Menu, Sparkles, X } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa6"

const links = [
  { href: "/about", label: "Academy", eyebrow: "Our story" },
  { href: "/subjects", label: "Programmes", eyebrow: "What to study" },
  { href: "/timetable", label: "Learning", eyebrow: "Class schedule" },
  { href: "/testimonials", label: "Outcomes", eyebrow: "Student results" },
]

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-[0_10px_30px_rgba(15,23,42,0.15)]" : ""}`}>
      <div className="bg-[#071a35] text-slate-200">
        <div className="container mx-auto flex h-9 items-center justify-between px-4 text-[10px] font-semibold uppercase tracking-[0.08em] sm:text-[11px]">
          <span className="flex items-center gap-2 text-amber-200"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />Admissions open · 2026 academic year</span>
          <a href="https://wa.me/263786053315" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-emerald-300 transition-colors hover:text-emerald-200"><FaWhatsapp className="h-3.5 w-3.5" />Talk to admissions</a>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-[#fcfcfb]">
        <div className="container mx-auto flex h-[76px] items-center px-4">
          <Link href="/" className="group z-10 flex items-center gap-3" aria-label="GlobeDk Elite Academy home">
            <span className="block h-14 w-14 shrink-0 transition-transform group-hover:scale-105"><Image src="/logo.png" alt="GlobeDk Elite Academy" width={56} height={62} className="h-full w-full object-contain" priority /></span>
            <span className="leading-none"><span className="block font-serif text-xl font-bold tracking-tight text-[#071a35]">GlobeDk</span><span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Elite Academy</span></span>
          </Link>

          <nav className="mx-auto hidden h-full items-stretch xl:flex" aria-label="Primary navigation">
            <Link href="/" className={`flex items-center px-4 text-xs font-bold uppercase tracking-[0.09em] transition-colors ${pathname === "/" ? "border-b-2 border-amber-500 text-[#071a35]" : "text-slate-500 hover:bg-slate-100 hover:text-[#071a35]"}`}>Home</Link>
            {links.map((link) => {
              const active = pathname === link.href
              return <Link href={link.href} key={link.href} className={`group relative flex items-center px-4 transition-colors ${active ? "border-b-2 border-amber-500 bg-amber-50/40" : "hover:bg-slate-100"}`}>
                <span><span className={`block text-[9px] font-bold uppercase tracking-[0.12em] ${active ? "text-amber-700" : "text-slate-400"}`}>{link.eyebrow}</span><span className={`mt-0.5 block text-xs font-bold uppercase tracking-[0.07em] ${active ? "text-[#071a35]" : "text-slate-600 group-hover:text-[#071a35]"}`}>{link.label}</span></span>
              </Link>
            })}
            <Link href="/exam-predictor" className={`flex items-center gap-1.5 px-4 text-xs font-bold uppercase tracking-[0.07em] ${pathname === "/exam-predictor" ? "border-b-2 border-amber-500 bg-amber-50 text-amber-900" : "text-amber-800 hover:bg-amber-50"}`}><Sparkles className="h-3.5 w-3.5" />Exam Lab</Link>
          </nav>

          <div className="ml-auto hidden items-center gap-2 xl:flex">
            <a href="https://wa.me/263786053315" target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 transition-all hover:-translate-y-0.5 hover:bg-emerald-600 hover:text-white" aria-label="Chat with GlobeDk Elite Academy on WhatsApp"><FaWhatsapp className="h-5 w-5" /></a>
            <Link href="/enroll" className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#071a35] px-4 text-xs font-bold uppercase tracking-[0.06em] text-white shadow-sm transition-colors hover:bg-[#102b52]">Apply <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="ml-auto flex items-center gap-2 xl:hidden">
            <Link href="/enroll" className="hidden rounded-md bg-[#071a35] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white sm:block">Apply</Link>
            <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 text-[#071a35] hover:bg-slate-100" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
      </div>

      {open && <div className="border-b border-slate-200 bg-white px-4 py-4 shadow-xl xl:hidden"><nav className="container mx-auto grid gap-1" aria-label="Mobile navigation">
        <Link href="/" className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-bold ${pathname === "/" ? "bg-[#071a35] text-white" : "text-[#071a35] hover:bg-slate-50"}`}>Home <ChevronRight className="h-4 w-4" /></Link>
        {links.map((link) => <Link href={link.href} key={link.href} className={`flex items-center justify-between rounded-lg px-3 py-3 ${pathname === link.href ? "bg-[#071a35] text-white" : "text-[#071a35] hover:bg-slate-50"}`}><span><span className="block text-[10px] font-bold uppercase tracking-wider opacity-60">{link.eyebrow}</span><span className="text-sm font-bold">{link.label}</span></span><ChevronRight className="h-4 w-4" /></Link>)}
        <Link href="/exam-predictor" className="mt-1 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-3 text-sm font-bold text-amber-900"><Sparkles className="h-4 w-4" />Explore the Exam Lab</Link>
        <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4"><a href="https://wa.me/263786053315" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 text-sm font-bold text-emerald-700"><FaWhatsapp className="h-5 w-5" />WhatsApp</a><Link href="/enroll" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#071a35] text-sm font-bold text-white">Apply now <ArrowRight className="h-4 w-4" /></Link></div>
      </nav></div>}
    </header>
  )
}
