"use client"

import { useState } from "react";
import { account } from "@/lib/appwrite";

export default function SignInPage() {
  const [result, setResult] = useState<string>("");

  async function testAppwriteConnection() {
    try {
      const session = await account.get();
      setResult("Connected! User ID: " + session.$id);
    } catch (err: any) {
      setResult("Appwrite connection failed: " + (err.message || err.toString()));
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      {/* TODO: Replace with Appwrite sign-in form */}
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <p className="text-text-secondary mb-8">Sign in functionality will be provided by Appwrite soon.</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={testAppwriteConnection}
        >
          Test Appwrite Connection
        </button>
        {result && <div className="mt-4 text-sm text-gray-700">{result}</div>}
      </div>
    </div>
  );
} 