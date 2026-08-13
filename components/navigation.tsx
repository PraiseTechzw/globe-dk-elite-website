
"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/subjects", label: "Subjects" },
    {
      href: "/login",
      label: "AI Exam Predictor",
      ai: true,
    },
    { href: "/timetable", label: "Timetable" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ]

  const handleEnrollClick = () => {
    router.push("/enroll")
  }

  const closeMobileMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl"
            onClick={closeMobileMenu}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg overflow-hidden">
              <Image
                src="/Logo.png"
                alt="GlobeDk Elite Academy Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>

            <span className="hidden sm:inline">
              GlobeDk Elite Academy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.ai && (
                  <Sparkles className="h-3.5 w-3.5 text-primary transition-transform group-hover:rotate-12" />
                )}

                <span>{link.label}</span>
              </Link>
            ))}

            {/* Enrollment CTA */}
            <Button
              onClick={handleEnrollClick}
              size="sm"
              className="ml-1"
            >
              Enroll Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground rounded-md transition-colors hover:bg-muted"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/40">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-md px-3 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                onClick={closeMobileMenu}
              >
                {link.ai && (
                  <Sparkles className="h-4 w-4 text-primary" />
                )}

                <span>{link.label}</span>
              </Link>
            ))}

            {/* Mobile Enrollment CTA */}
            <Button
              onClick={() => {
                closeMobileMenu()
                handleEnrollClick()
              }}
              className="w-full mt-3"
            >
              Enroll Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}

