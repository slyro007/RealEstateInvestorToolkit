"use client";

import { useEffect, useState } from "react";
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

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", status: "active" });

  useEffect(() => {
    setupUserAndFetchProjects();
  }, []);

  async function setupUserAndFetchProjects() {
    try {
      // First ensure user exists in our database
      await fetch('/api/auth/user/setup', {
        method: 'POST',
      });
      // Then fetch projects
      await fetchProjects();
    } catch (e: any) {
      console.error("Error setting up user:", e);
      // Still try to fetch projects even if setup fails
      fetchProjects();
    }
  }

  async function fetchProjects() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function createProject(e: React.FormEvent) {
    e.preventDefault();
    try {
      console.log("Creating project:", form);
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Failed to create project" }));
        throw new Error(errorData.message || "Failed to create project");
      }
      
      setForm({ name: "", description: "", status: "active" });
      setShowForm(false);
      fetchProjects();
    } catch (e: any) {
      console.error("Project creation error:", e);
      setError(e.message);
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete project");
      fetchProjects();
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="max-w-3xl mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold mb-6">Your Projects</h1>
          <button
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setShowForm((v) => !v)}
          >
            {showForm ? "Cancel" : "New Project"}
          </button>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          {showForm && (
            <form onSubmit={createProject} className="mb-6 bg-gray-50 p-4 rounded shadow">
              <input
                className="block w-full mb-2 p-2 border rounded"
                placeholder="Project Name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <textarea
                className="block w-full mb-2 p-2 border rounded"
                placeholder="Description (optional)"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
              <select
                className="block w-full mb-2 p-2 border rounded"
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              >
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" type="submit">
                Create
              </button>
            </form>
          )}
          {loading ? (
            <div>Loading...</div>
          ) : projects.length === 0 ? (
            <div>No projects yet.</div>
          ) : (
            <ul className="space-y-4">
              {projects.map((project) => (
                <li key={project.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-lg">{project.name}</div>
                    <div className="text-gray-600 text-sm">{project.description}</div>
                    <div className="text-xs text-gray-400">Status: {project.status}</div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/projects/${project.id}`} className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                      Open
                    </Link>
                    <button
                      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                      onClick={() => deleteProject(project.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SignedIn>
    </>
  );
} 