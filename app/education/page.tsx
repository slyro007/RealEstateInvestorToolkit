"use client"

import { useState } from "react"
// import { auth } from "@clerk/nextjs"
// import { redirect } from "next/navigation"
import { BookOpen, GraduationCap, Target, Clock, ArrowLeft, ChevronRight, BookMarked, Award } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { MaterialLayout } from "@/components/layout/material-layout"

const levels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
]

const goals = [
  { value: "flipping", label: "House Flipping" },
  { value: "rental", label: "Rental Properties" },
  { value: "commercial", label: "Commercial Real Estate" },
  { value: "reits", label: "REITs" },
]

const weeklyHours = [
  { value: "5", label: "5 hours/week" },
  { value: "10", label: "10 hours/week" },
  { value: "15", label: "15 hours/week" },
  { value: "20", label: "20+ hours/week" },
]

const recommendedCourses = [
  {
    title: "Real Estate Fundamentals",
    description: "Learn the core principles of real estate investing",
    level: "Beginner",
    duration: "4 weeks",
    rating: 4.8,
    students: 1243,
    image: "bg-gradient-to-br from-blue-400 to-blue-600"
  },
  {
    title: "Advanced Rental Analysis",
    description: "Master the financial analysis of rental properties",
    level: "Intermediate",
    duration: "6 weeks",
    rating: 4.9,
    students: 856,
    image: "bg-gradient-to-br from-purple-400 to-purple-600"
  },
  {
    title: "Commercial Deal Structuring",
    description: "Complex deal structures for commercial properties",
    level: "Advanced",
    duration: "8 weeks",
    rating: 4.7,
    students: 532,
    image: "bg-gradient-to-br from-amber-400 to-amber-600"
  }
];

export default function EducationInsightsPage() {
  return (
    <MaterialLayout>
      <main className="relative min-h-screen flex flex-col items-center justify-start pt-24 px-4 overflow-hidden">
        {/* Decorative SVG Background */}
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 z-0 opacity-30" width="900" height="300" viewBox="0 0 900 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="450" cy="150" rx="400" ry="80" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(450 150) scale(400 80)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" />
              <stop offset="1" stopColor="#a78bfa" stopOpacity="0.2" />
            </radialGradient>
          </defs>
        </svg>
        {/* Hero Section */}
        <section className="w-full max-w-3xl text-center mb-16 relative z-10">
          <span className="inline-block animate-bounce-slow">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-primary-main drop-shadow-lg" />
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-main">Education & Insights</h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8">
            Grow your expertise with curated learning paths, actionable guides, and up-to-date market insights tailored for real estate investors.
          </p>
        </section>
        {/* Features Section */}
        <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 text-center relative z-10">
          <div className="p-6 rounded-xl bg-white dark:bg-card shadow-md-1 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h3 className="font-bold text-lg mb-1 text-primary-main">Learning Paths</h3>
            <p className="text-text-secondary">Follow step-by-step paths for beginners, intermediates, and advanced investors.</p>
          </div>
          <div className="p-6 rounded-xl bg-white dark:bg-card shadow-md-1 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <h3 className="font-bold text-lg mb-1 text-primary-main">Expert Guides</h3>
            <p className="text-text-secondary">Access in-depth guides on deal sourcing, negotiation, financing, and more.</p>
          </div>
          <div className="p-6 rounded-xl bg-white dark:bg-card shadow-md-1 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <h3 className="font-bold text-lg mb-1 text-primary-main">Market Insights</h3>
            <p className="text-text-secondary">Stay ahead with the latest trends, data, and forecasts for your target markets.</p>
          </div>
          <div className="p-6 rounded-xl bg-white dark:bg-card shadow-md-1 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <h3 className="font-bold text-lg mb-1 text-primary-main">Community & Support</h3>
            <p className="text-text-secondary">Join a community of investors, share experiences, and get expert support.</p>
          </div>
        </section>
        <style jsx global>{`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-16px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2.5s infinite;
          }
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
        `}</style>
      </main>
    </MaterialLayout>
  )
} 