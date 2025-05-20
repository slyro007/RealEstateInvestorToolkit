"use client";

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function EducationPage() {
  return (
    <>
      <SignedIn>
        <div className="p-10">
          <h1 className="text-3xl font-bold mb-4 text-primary-main">Education Module</h1>
          <p className="text-lg text-text-secondary">Access learning paths, strategy guides, market insights, and investment techniques here.</p>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
} 