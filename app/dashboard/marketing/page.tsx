"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

interface Campaign {
  id: string;
  title: string;
  type: string;
  targetArea: string;
  status: string;
  responses: number;
  leads: number;
  createdAt: string;
}

export default function MarketingDashboard() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    type: "direct-mail",
    targetArea: "distressed",
    description: "",
    projectId: projectId || "",
  });

  useEffect(() => {
    if (projectId) {
      fetchCampaigns();
      setForm(prev => ({ ...prev, projectId }));
    }
    // eslint-disable-next-line
  }, [projectId]);

  async function fetchCampaigns() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/marketing/campaigns?projectId=${projectId}`);
      if (!res.ok) throw new Error("Failed to fetch campaigns");
      const data = await res.json();
      setCampaigns(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function createCampaign(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      console.log("Creating campaign:", form);
      const res = await fetch(`/api/marketing/campaigns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Failed to create campaign" }));
        throw new Error(errorData.message || "Failed to create campaign");
      }
      
      setShowForm(false);
      setForm({
        title: "",
        type: "direct-mail",
        targetArea: "distressed",
        description: "",
        projectId: projectId || "",
      });
      fetchCampaigns();
    } catch (e: any) {
      setError(e.message);
      console.error("Campaign creation error:", e);
    }
  }

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="max-w-3xl mx-auto py-10 px-4">
          <h1 className="text-2xl font-bold mb-6">Marketing Campaigns</h1>
          {!projectId ? (
            <div>Please select a project from your <Link href="/dashboard" className="text-blue-600 underline">dashboard</Link>.</div>
          ) : (
            <>
              <button
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setShowForm((v) => !v)}
              >
                {showForm ? "Cancel" : "New Campaign"}
              </button>
              
              {showForm && (
                <form onSubmit={createCampaign} className="mb-6 bg-gray-50 p-4 rounded shadow">
                  <input
                    className="block w-full mb-2 p-2 border rounded"
                    placeholder="Campaign Title"
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    required
                  />
                  
                  <select
                    className="block w-full mb-2 p-2 border rounded"
                    value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    required
                  >
                    <option value="direct-mail">Direct Mail</option>
                    <option value="cold-calling">Cold Calling</option>
                    <option value="driving-for-dollars">Driving for Dollars</option>
                    <option value="social-media">Social Media</option>
                  </select>
                  
                  <select
                    className="block w-full mb-2 p-2 border rounded"
                    value={form.targetArea}
                    onChange={e => setForm(f => ({ ...f, targetArea: e.target.value }))}
                    required
                  >
                    <option value="distressed">Distressed Properties</option>
                    <option value="vacant">Vacant Properties</option>
                    <option value="inheritance">Inheritance</option>
                    <option value="divorce">Divorce</option>
                    <option value="tax-delinquent">Tax Delinquent</option>
                    <option value="probate">Probate</option>
                  </select>
                  
                  <textarea
                    className="block w-full mb-2 p-2 border rounded"
                    placeholder="Description"
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    required
                  />
                  
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Create Campaign
                  </button>
                </form>
              )}
              
              {error && <div className="text-red-600 mb-4">{error}</div>}
              
              {loading ? (
                <div>Loading...</div>
              ) : campaigns.length === 0 ? (
                <div>No campaigns for this project yet.</div>
              ) : (
                <ul className="space-y-4">
                  {campaigns.map((c) => (
                    <li key={c.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-lg">{c.title}</div>
                        <div className="text-gray-600 text-sm">{c.type} | {c.targetArea}</div>
                        <div className="text-xs text-gray-400">Status: {c.status}</div>
                      </div>
                      <Link href={`/dashboard/marketing/${c.id}`} className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                        View
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </SignedIn>
    </>
  );
} 