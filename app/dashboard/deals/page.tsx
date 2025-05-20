"use client";

// import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function DealsPage() {
  return (
    <>
      <SignedIn>
        <div className="p-10">
          <h1 className="text-3xl font-bold mb-4 text-primary-main">Deals Module</h1>
          <p className="text-lg text-text-secondary">Analyze deals, calculate ROI, evaluate properties, and conduct market research here.</p>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
} 