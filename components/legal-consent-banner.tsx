"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShieldCheck, X, Check, Cookie, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LegalConsentBanner() {
  const [showConsent, setShowConsent] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    learningTools: true,
  })

  useEffect(() => {
    const consent = localStorage.getItem("globedk_consent_accepted")
    if (!consent) {
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem("globedk_consent_accepted", "true")
    localStorage.setItem("globedk_consent_preferences", JSON.stringify(preferences))
    setShowConsent(false)
  }

  const handleSaveCustom = () => {
    localStorage.setItem("globedk_consent_accepted", "true")
    localStorage.setItem("globedk_consent_preferences", JSON.stringify(preferences))
    setShowConsent(false)
  }

  const handleDeclineNonEssential = () => {
    const minimal = { essential: true, analytics: false, learningTools: false }
    localStorage.setItem("globedk_consent_accepted", "true")
    localStorage.setItem("globedk_consent_preferences", JSON.stringify(minimal))
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <aside
      aria-label="Privacy and cookie consent"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-50 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-slate-950/95 text-slate-100 border border-amber-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-4 ring-1 ring-white/10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 text-amber-400">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white tracking-wide">
                Academic Privacy &amp; Data Consent
              </h4>
              <p className="text-[11px] text-slate-400">
                In accordance with the Zimbabwe Cyber &amp; Data Protection Act [Chapter 12:07]
              </p>
            </div>
          </div>

          <button
            onClick={handleDeclineNonEssential}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            aria-label="Close consent banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          GlobeDk Elite Academy uses essential student session records, encrypted authentication, and learning analytics to provide syllabus forecasting and exam preparation. By continuing, you agree to our{" "}
          <Link href="/privacy" className="text-amber-300 hover:underline font-medium">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-amber-300 hover:underline font-medium">
            Academic Terms of Service
          </Link>.
        </p>

        {showCustomize && (
          <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80">
              <div>
                <p className="font-semibold text-white">Essential Student Sessions</p>
                <p className="text-[10px] text-slate-400">Required for logins, syllabus progress, and security.</p>
              </div>
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Always Active</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80">
              <div>
                <p className="font-semibold text-white">AI Learning &amp; Prediction Analytics</p>
                <p className="text-[10px] text-slate-400">Personalized exam pattern analytics and revision tracking.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.learningTools}
                onChange={(e) => setPreferences({ ...preferences, learningTools: e.target.checked })}
                className="rounded-sm border-slate-700 text-amber-500 focus:ring-amber-400 h-4 w-4"
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={() => setShowCustomize(!showCustomize)}
            className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-2"
          >
            {showCustomize ? "Hide Preferences" : "Customize Preferences"}
          </button>

          <div className="flex items-center gap-2">
            {showCustomize ? (
              <Button
                size="sm"
                onClick={handleSaveCustom}
                className="bg-amber-600 hover:bg-amber-500 text-white text-xs h-8 px-3 font-semibold"
              >
                Save Preferences
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDeclineNonEssential}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs h-8 px-3"
                >
                  Essential Only
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8 px-3 font-semibold shadow-xs"
                >
                  Accept All
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
