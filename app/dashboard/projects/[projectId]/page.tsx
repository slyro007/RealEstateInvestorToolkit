"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

interface Project {
  id: string;
  name: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectDashboardPage() {
  const params = useParams();
  const projectId = params?.projectId as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) fetchProject();
    // eslint-disable-next-line
  }, [projectId]);

  async function fetchProject() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/projects?id=${projectId}`);
      if (!res.ok) throw new Error("Failed to fetch project");
      const data = await res.json();
      setProject(Array.isArray(data) ? data[0] : data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="max-w-2xl mx-auto py-10 px-4">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : !project ? (
            <div>Project not found.</div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
              <div className="mb-2 text-gray-600">{project.description}</div>
              <div className="mb-6 text-xs text-gray-400">Status: {project.status}</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href={`/dashboard/marketing?projectId=${project.id}`} className="block p-6 bg-blue-50 rounded shadow hover:bg-blue-100">
                  <div className="font-semibold text-lg mb-1">Marketing</div>
                  <div className="text-sm text-gray-600">Manage campaigns, scripts, and outreach for this project.</div>
                </Link>
                <Link href={`/dashboard/education?projectId=${project.id}`} className="block p-6 bg-green-50 rounded shadow hover:bg-green-100">
                  <div className="font-semibold text-lg mb-1">Education</div>
                  <div className="text-sm text-gray-600">Learning resources and progress for this project.</div>
                </Link>
                <Link href={`/dashboard/deals?projectId=${project.id}`} className="block p-6 bg-yellow-50 rounded shadow hover:bg-yellow-100">
                  <div className="font-semibold text-lg mb-1">Deals</div>
                  <div className="text-sm text-gray-600">Track and analyze deals for this project.</div>
                </Link>
              </div>
            </>
          )}
        </div>
      </SignedIn>
    </>
  );
} 