"use client"

import { useEffect, useState } from "react";
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

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampaigns() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/marketing/campaigns");
        if (!res.ok) throw new Error("Failed to fetch campaigns");
        const data = await res.json();
        setCampaigns(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);

  return (
    <>
      <SignedIn>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Marketing Campaigns</h2>
              <Link 
                href="/marketing/create"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                New Campaign
              </Link>
            </div>
            {loading ? (
              <div>Loading campaigns...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : campaigns.length === 0 ? (
              <div>No campaigns found. Create your first campaign!</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-900 rounded shadow">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Title</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Target Area</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Responses</th>
                      <th className="px-4 py-2 text-left">Leads</th>
                      <th className="px-4 py-2 text-left">Created</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((c) => (
                      <tr key={c.id} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-2 font-medium">{c.title}</td>
                        <td className="px-4 py-2">{c.type}</td>
                        <td className="px-4 py-2">{c.targetArea}</td>
                        <td className="px-4 py-2">{c.status}</td>
                        <td className="px-4 py-2">{c.responses}</td>
                        <td className="px-4 py-2">{c.leads}</td>
                        <td className="px-4 py-2">{new Date(c.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-2">
                          <Link href={`/marketing/campaign/${c.id}`} className="text-blue-600 hover:underline">View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
} 