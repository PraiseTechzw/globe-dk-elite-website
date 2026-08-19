"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  GraduationCap,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const contactCards = [
    {
      icon: Phone,
      title: "Direct Calling & WhatsApp",
      details: ["+263 78 605 3315", "+263 71 322 5707"],
      action: "Call or chat anytime for enrollment details",
    },
    {
      icon: Mail,
      title: "Official Email",
      details: ["admission@globedk.co.zw", "johnariphiosd@gmail.com"],
      action: "Expect response within 24 hours",
    },
    {
      icon: MapPin,
      title: "Physical Learning Center",
      details: ["Epworth StopOver, Harare", "Zimbabwe"],
      action: "Physical weekend & holiday lessons",
    },
    {
      icon: Clock,
      title: "Academy Working Hours",
      details: ["Saturday: 8:00 AM - 6:00 PM", "Sunday: 8:00 AM - 4:00 PM"],
      action: "Online platform active 24/7",
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = encodeURIComponent(
      `Hello Dr. Daka, I am contacting you from the GlobeDk Elite website.\n\n` +
        `*Name:* ${formData.name}\n` +
        `*Phone:* ${formData.phone}\n` +
        `*Email:* ${formData.email || "N/A"}\n` +
        `*Subject:* ${formData.subject}\n` +
        `*Message:* ${formData.message}`
    );
    window.open(`https://wa.me/263786053315?text=${whatsappMsg}`, "_blank");
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-950 text-white py-16 md:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl space-y-4">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
            Get in Touch
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Contact Senior Tutor &amp; Admissions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Have questions regarding lesson schedules, subject offerings, fees, or homeschooling? Reach out to Senior Tutor &amp; Founder <strong>Dr. John Ariphios Daka</strong>.
          </p>
        </div>
      </section>

      {/* Senior Tutor Feature Profile */}
      <section className="py-12 bg-muted/20 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-border shadow-md overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-primary shadow-lg shrink-0">
                  <Image
                    src="/john-ariphios.jpg.JPG"
                    alt="Dr John Ariphios Daka"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <Badge variant="secondary" className="text-xs">
                    CEO, Founder &amp; Senior Tutor
                  </Badge>
                  <h2 className="text-2xl font-bold">Dr John Ariphios Daka</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Passionate educator specializing in <strong>Mathematics, Pure Mathematics, Computer Science, and Geography</strong> for ZIMSEC &amp; Cambridge O-Level and A-Level students.
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                    <Button
                      size="sm"
                      asChild
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    >
                      <a
                        href="https://wa.me/263786053315?text=Hello%20Dr%20Daka,%20I%20would%20like%20to%20inquire%20about%20GlobeDK%20lessons"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="mr-1.5 h-4 w-4" />
                        WhatsApp: +263 78 605 3315
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href="tel:+263786053315">
                        <Phone className="mr-1.5 h-4 w-4" />
                        Call Now
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((info, idx) => {
              const Icon = info.icon;
              return (
                <Card key={idx} className="border-border hover:shadow-lg transition-all text-center">
                  <CardContent className="pt-6 space-y-3">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-sm text-foreground">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((d, i) => (
                        <p key={i} className="text-xs sm:text-sm text-muted-foreground font-medium">
                          {d}
                        </p>
                      ))}
                    </div>
                    <p className="text-[11px] text-primary font-semibold pt-1">{info.action}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inquiry Form & WhatsApp Quick Chat Section */}
      <section className="py-12 bg-muted/20 border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <Card className="md:col-span-7 border-border shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Send Us an Inquiry Message</CardTitle>
                <CardDescription>
                  Fill in your question and we will respond promptly on WhatsApp or Email.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sent ? (
                  <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-emerald-900 dark:text-emerald-200">Message Dispatched!</h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      Thank you for contacting GlobeDk Elite Academy. If your WhatsApp did not open automatically, you can message us directly at +263 78 605 3315.
                    </p>
                    <Button
                      size="sm"
                      onClick={() => setSent(false)}
                      variant="outline"
                      className="mt-2 text-xs"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="c-name">Your Full Name *</Label>
                        <Input
                          id="c-name"
                          placeholder="e.g. Tendai Moyo"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="c-phone">Phone / WhatsApp Number *</Label>
                        <Input
                          id="c-phone"
                          placeholder="e.g. +263 78 XXX XXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="c-email">Email Address (Optional)</Label>
                        <Input
                          id="c-email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="c-subject">Subject of Inquiry</Label>
                        <select
                          id="c-subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                        >
                          <option value="Enrollment for Lessons">Enrollment for Lessons</option>
                          <option value="Online Virtual Classes">Online Virtual Classes</option>
                          <option value="Homeschooling Program">Homeschooling Program</option>
                          <option value="1-on-1 Tutoring">1-on-1 Tutoring</option>
                          <option value="AI Exam Predictor">AI Exam Predictor</option>
                          <option value="Tuition Fees & Payments">Tuition Fees &amp; Payments</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="c-message">Your Message / Questions *</Label>
                      <Textarea
                        id="c-message"
                        rows={4}
                        placeholder="Tell us about the student's level, subjects needed, or any specific questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full font-bold h-11 bg-primary text-primary-foreground">
                      <Send className="mr-2 h-4 w-4" />
                      Send Inquiry via WhatsApp
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Direct Quick WhatsApp Card */}
            <div className="md:col-span-5 space-y-6">
              <Card className="border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-emerald-900 dark:text-emerald-100 text-lg">
                        Fast WhatsApp Chat
                      </CardTitle>
                      <CardDescription className="text-emerald-700 dark:text-emerald-300 text-xs">
                        Direct communication with Dr. Daka
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">
                  <p>
                    For fastest response times on lesson fees, timetable slots, and immediate enrollment, send a direct WhatsApp message.
                  </p>
                  <div className="space-y-2 pt-2">
                    <Button
                      asChild
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs"
                    >
                      <a href="https://wa.me/263786053315" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Chat +263 78 605 3315
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-emerald-600 text-emerald-700 dark:text-emerald-300 bg-transparent text-xs"
                    >
                      <a href="https://wa.me/263713225707" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Chat +263 71 322 5707
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Ready To Enroll Online?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-muted-foreground">
                  <p>
                    You can complete our official enrollment application in under 2 minutes with automated tuition calculations.
                  </p>
                  <Button asChild variant="outline" className="w-full text-xs">
                    <Link href="/enroll">
                      Go to Enrollment Form
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl space-y-4">
          <div className="text-center space-y-1">
            <h3 className="font-bold text-xl text-foreground">Find Our Physical Learning Center</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Epworth StopOver, Harare, Zimbabwe</p>
          </div>

          <Card className="border-border overflow-hidden shadow-md">
            <div className="aspect-video">
              <iframe
                title="GlobeDk Elite Academy Epworth Harare Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.567156142828!2d31.0698!3d-17.8002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931d6f7db0e3e1f%3A0x0!2sEpworth%2C%20Harare%2C%20Zimbabwe!5e0!3m2!1sen!2szw!4v1701072000000!5m2!1sen!2szw"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
