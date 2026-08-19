"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Sparkles,
  Phone,
  GraduationCap,
  BookOpen,
  Calendar,
  Star,
  Mail,
  ArrowRight,
  MessageCircle,
} from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home", icon: GraduationCap },
    { href: "/about", label: "About", icon: BookOpen },
    { href: "/subjects", label: "Subjects & Fees", icon: BookOpen },
    {
      href: "/exam-predictor",
      label: "AI Exam Predictor",
      icon: Sparkles,
      ai: true,
      badge: "AI Powered",
    },
    { href: "/timetable", label: "Timetable", icon: Calendar },
    { href: "/testimonials", label: "Success Stories", icon: Star },
    { href: "/contact", label: "Contact", icon: Mail },
  ]

  const closeMobileMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/60"
          : "bg-background/90 backdrop-blur-sm border-b border-border/40"
      }`}
    >
      {/* Top micro bar for quick contact */}
      <div className="bg-primary text-primary-foreground text-xs py-1.5 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 opacity-90">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Enrolments Open for ZIMSEC &amp; Cambridge 2026 / 2027
            </span>
            <span className="opacity-75">|</span>
            <span className="opacity-90">📍 Physical Center: Epworth, Harare &amp; Online Nationwide</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <a
              href="https://wa.me/263786053315?text=Hello%20GlobeDK%20Elite%20Academy,%20I%20would%20like%20more%20information%20about%20enrolling"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
              WhatsApp: +263 78 605 3315
            </a>
            <span className="opacity-75">|</span>
            <Link href="/login" className="hover:underline opacity-90 hover:opacity-100">
              Student Portal
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={closeMobileMenu}
          >
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-border/50 p-1 transition-transform group-hover:scale-105">
              <Image
                src="/Logo.png"
                alt="GlobeDk Elite Academy Logo"
                width={44}
                height={44}
                className="object-contain"
                priority
              />
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors">
                GlobeDk Elite Academy
              </span>
              <span className="text-[11px] text-muted-foreground font-medium hidden xs:inline">
                ZIMSEC &amp; Cambridge Tutors
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/70"
                  }`}
                >
                  {link.ai && (
                    <Sparkles className="h-3.5 w-3.5 text-amber-500 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                  )}

                  <span>{link.label}</span>

                  {link.badge && (
                    <span className="ml-1 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs">
                      {link.badge}
                    </span>
                  )}

                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hidden xl:inline-flex border-emerald-600/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
            >
              <a
                href="https://wa.me/263786053315"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 mr-1 text-emerald-600" />
                WhatsApp
              </a>
            </Button>

            <Button
              asChild
              size="sm"
              className="font-medium shadow-sm bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/enroll">
                Enroll Now
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              asChild
              size="sm"
              className="text-xs px-3 h-8 sm:hidden bg-primary text-primary-foreground"
            >
              <Link href="/enroll">Enroll</Link>
            </Button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground rounded-lg border border-border/50 transition-colors hover:bg-muted focus:outline-hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-1.5 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/90 hover:bg-muted"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${isActive ? "text-primary-foreground" : "text-primary"}`} />
                      <span>{link.label}</span>
                    </div>

                    {link.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Actions */}
            <div className="pt-3 mt-2 border-t border-border/40 space-y-2">
              <Button
                asChild
                className="w-full justify-center h-11 font-semibold"
                onClick={closeMobileMenu}
              >
                <Link href="/enroll">
                  Enroll Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  asChild
                  className="w-full text-xs h-9 border-emerald-600/30 text-emerald-700 dark:text-emerald-400"
                >
                  <a
                    href="https://wa.me/263786053315"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                    WhatsApp
                  </a>
                </Button>

                <Button
                  variant="outline"
                  asChild
                  className="w-full text-xs h-9"
                  onClick={closeMobileMenu}
                >
                  <Link href="/login">Student Login</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
