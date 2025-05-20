"use client";

import { MaterialLayout } from "@/components/layout/material-layout";
import { Rocket } from "lucide-react";

export default function MarketingAboutPage() {
  return (
    <MaterialLayout>
      <main className="relative min-h-screen flex flex-col items-center justify-start pt-24 px-4 overflow-hidden">
        {/* Decorative SVG Background */}
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 z-0 opacity-30" width="900" height="300" viewBox="0 0 900 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="450" cy="150" rx="400" ry="80" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(450 150) scale(400 80)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a78bfa" />
              <stop offset="1" stopColor="#38bdf8" stopOpacity="0.2" />
            </radialGradient>
          </defs>
        </svg>
        {/* Hero Section */}
        <section className="w-full max-w-3xl text-center mb-16 relative z-10">
          <span className="inline-block animate-bounce-slow">
            <Rocket className="mx-auto mb-4 h-12 w-12 text-primary-main drop-shadow-lg" />
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-main">AI-Powered Marketing</h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8">
            Supercharge your real estate marketing with automation, smart analytics, and AI-generated content. Reach more leads, save time, and optimize your campaigns effortlessly.
          </p>
        </section>
        {/* Features Section */}
        <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 text-center relative z-10">
          <div className="p-6 rounded-xl bg-white dark:bg-card shadow-md-1 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h3 className="font-bold text-lg mb-1 text-primary-main">Automated Campaigns</h3>
            <p className="text-text-secondary">Launch and manage multi-channel campaigns (email, SMS, direct mail) with just a few clicks.</p>
          </div>
          <div className="p-6 rounded-xl bg-white dark:bg-card shadow-md-1 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <h3 className="font-bold text-lg mb-1 text-primary-main">AI Script Generation</h3>
            <p className="text-text-secondary">Instantly generate high-converting marketing scripts tailored to your target audience and property type.</p>
          </div>
          <div className="p-6 rounded-xl bg-white dark:bg-card shadow-md-1 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <h3 className="font-bold text-lg mb-1 text-primary-main">Smart Analytics</h3>
            <p className="text-text-secondary">Track open rates, responses, and campaign ROI with real-time dashboards and actionable insights.</p>
          </div>
          <div className="p-6 rounded-xl bg-white dark:bg-card shadow-md-1 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <h3 className="font-bold text-lg mb-1 text-primary-main">Lead Management</h3>
            <p className="text-text-secondary">Organize, segment, and nurture your leads automatically for maximum conversion.</p>
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
  );
} 