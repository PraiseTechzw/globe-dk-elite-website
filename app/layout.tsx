import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { LegalConsentBanner } from "@/components/legal-consent-banner";
import "./globals.css";

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const _geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.globedk.co.zw"),

  title: {
    default:
      "GlobeDk Elite Academy | Online O-Level & A-Level Lessons | ZIMSEC & Cambridge Tutors Zimbabwe",
    template: "%s | GlobeDk Elite Academy",
  },

  description:
    "GlobeDk Elite Academy provides professional Online Lessons, Physical Lessons, Homeschooling, Live Virtual Classes and One-on-One Tutoring for ZIMSEC and Cambridge O-Level & A-Level students throughout Zimbabwe and internationally.",

  applicationName: "GlobeDk Elite Academy",

  authors: [
    {
      name: "Dr John Ariphios Daka",
    },
  ],

  creator: "Dr John Ariphios Daka",

  publisher: "GlobeDk Elite Academy",

  keywords: [
    "Online Lessons Zimbabwe",
    "Online Tutor Zimbabwe",
    "Online School Zimbabwe",
    "Online Classes Zimbabwe",
    "Virtual Classes Zimbabwe",
    "Homeschooling Zimbabwe",
    "Home School Zimbabwe",
    "Private Tutor Zimbabwe",
    "Tutoring Zimbabwe",
    "Zimbabwe Tutors",
    "O Level Tutors",
    "A Level Tutors",
    "ZIMSEC Tutors",
    "Cambridge Tutors",
    "Online Mathematics Tutor",
    "Mathematics Tutor Zimbabwe",
    "English Tutor Zimbabwe",
    "Computer Science Tutor",
    "Combined Science Tutor",
    "Physics Tutor Zimbabwe",
    "Chemistry Tutor Zimbabwe",
    "Biology Tutor Zimbabwe",
    "Geography Tutor Zimbabwe",
    "History Tutor Zimbabwe",
    "Heritage Studies Tutor",
    "Commerce Tutor",
    "Business Studies Tutor",
    "Economics Tutor",
    "Statistics Tutor",
    "Pure Mathematics Tutor",
    "Principles of Accounts Tutor",
    "Exam Preparation Zimbabwe",
    "Revision Classes",
    "Holiday Lessons",
    "Weekend Lessons",
    "Homework Assistance",
    "Physical Lessons Harare",
    "Epworth Tutoring",
    "Harare Tutoring",
    "Distance Learning Zimbabwe",
    "GlobeDk Elite Academy",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  openGraph: {
    title:
      "GlobeDk Elite Academy | Online O-Level & A-Level Lessons",

    description:
      "Professional Online Lessons, Physical Lessons, Homeschooling and Live Virtual Classes for ZIMSEC & Cambridge students across Zimbabwe.",

    url: "https://www.globedk.co.zw",

    siteName: "GlobeDk Elite Academy",

    locale: "en_ZW",

    type: "website",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "GlobeDk Elite Academy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "GlobeDk Elite Academy | Online Lessons Zimbabwe",

    description:
      "Professional Online Lessons, Physical Lessons and Homeschooling for ZIMSEC & Cambridge students.",

    images: ["/logo.png"],
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  category: "Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZW" className={`${_inter.variable} ${_playfair.variable} ${_geistMono.variable}`}>
      <head>
        <meta charSet="utf-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <meta
          name="theme-color"
          content="#0f172a"
        />

        <meta
          name="format-detection"
          content="telephone=no"
        />

        <link
          rel="icon"
          href="/logo.png"
        />

        <link
          rel="apple-touch-icon"
          href="/logo.png"
        />

        {/* Educational Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "GlobeDk Elite Academy",
              url: "https://www.globedk.co.zw",
              logo: "https://www.globedk.co.zw/logo.png",
              image: "https://www.globedk.co.zw/logo.png",
              email: "admission@globedk.co.zw",
              telephone: "+263786053315",

              founder: {
                "@type": "Person",
                name: "Dr John Ariphios Daka",
              },

              description:
                "Professional Online Lessons, Physical Lessons, Homeschooling, Live Virtual Classes and One-on-One Tutoring for ZIMSEC and Cambridge students.",

              address: {
                "@type": "PostalAddress",
                streetAddress: "Epworth StopOver",
                addressLocality: "Harare",
                addressCountry: "Zimbabwe",
              },

              areaServed: [
                "Zimbabwe",
                "South Africa",
                "Botswana",
                "Zambia",
                "Mozambique",
                "Worldwide",
              ],

              sameAs: [
                "https://www.facebook.com/profile.php?id=61582643098304",
              ],
            }),
          }}
        />

        {/* Local Business */}
        <Script
          id="localbusiness-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "GlobeDk Elite Academy",
              image: "https://www.globedk.co.zw/logo.png",
              url: "https://www.globedk.co.zw",
              telephone: "+263786053315",
              email: "admission@globedk.co.zw",

              openingHours: "Mo-Sa 08:00-18:00",

              address: {
                "@type": "PostalAddress",
                streetAddress: "Epworth StopOver",
                addressLocality: "Harare",
                addressCountry: "ZW",
              },
            }),
          }}
        />
      </head>

      <body className={`${_inter.className} font-sans antialiased`}>
        {children}
        <LegalConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
