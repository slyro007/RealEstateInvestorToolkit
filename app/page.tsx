"use client"

import { MaterialLayout } from "@/components/layout/material-layout"
import { MaterialButton } from "@/components/ui/material-button"
import { MaterialCard, MaterialCardContent } from "@/components/ui/material-card"
import { ArrowRight, BarChart2, Building, Home, ChevronRight, Lightbulb, TrendingUp, Check, Star, ArrowUpRight, Sparkles, Rocket, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <MaterialLayout>
      <main className="min-h-screen flex flex-col items-center justify-start pt-24 px-4">
        {/* Hero Section */}
        <section className="w-full max-w-3xl text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-main">Real Estate Investor Toolkit</h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8">
            The all-in-one platform for off-market real estate investing: AI-powered marketing, deal analysis, and education. Empower your investment journey with modern tools and insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-in" className="inline-block px-8 py-3 rounded-lg border border-primary-main text-primary-main font-semibold shadow-md hover:bg-primary-main hover:text-white transition">Sign In</Link>
          </div>
        </section>
        {/* Features/Benefits Section */}
        <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl bg-white dark:bg-card shadow-md-1">
            <Rocket className="mx-auto mb-2 h-8 w-8 text-primary-main" />
            <h3 className="font-bold text-lg mb-1 text-primary-main">AI-Powered Marketing</h3>
            <p className="text-text-secondary">Automate campaigns, generate scripts, and track results with smart analytics.</p>
          </div>
          <div className="p-6 rounded-xl bg-white dark:bg-card shadow-md-1">
            <BarChart2 className="mx-auto mb-2 h-8 w-8 text-primary-main" />
            <h3 className="font-bold text-lg mb-1 text-primary-main">Deal Analysis</h3>
            <p className="text-text-secondary">Evaluate properties, calculate ROI, and make data-driven investment decisions.</p>
          </div>
          <div className="p-6 rounded-xl bg-white dark:bg-card shadow-md-1">
            <BookOpen className="mx-auto mb-2 h-8 w-8 text-primary-main" />
            <h3 className="font-bold text-lg mb-1 text-primary-main">Education & Insights</h3>
            <p className="text-text-secondary">Access learning paths, guides, and market insights to grow your expertise.</p>
          </div>
        </section>
      </main>
    </MaterialLayout>
  );
} 