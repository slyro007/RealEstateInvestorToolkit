import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET: List all projects for the signed-in user
export async function GET(request: Request) {
  try {
    const { userId: clerkId } = getAuth(request);
    if (!clerkId) return new NextResponse("Unauthorized", { status: 401 });
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) return new NextResponse("User not found", { status: 404 });
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      const project = await prisma.project.findFirst({ where: { id, userId: user.id }, include: { campaigns: true } });
      if (!project) return new NextResponse("Project not found", { status: 404 });
      return NextResponse.json(project);
    }
    const projects = await prisma.project.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: { campaigns: true },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("[PROJECTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// POST: Create a new project
export async function POST(request: Request) {
  try {
    const { userId: clerkId } = getAuth(request);
    if (!clerkId) return new NextResponse("Unauthorized", { status: 401 });
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) return new NextResponse("User not found", { status: 404 });
    const body = await request.json();
    const { name, description, status } = body;
    if (!name || !status) return new NextResponse("Missing required fields", { status: 400 });
    const project = await prisma.project.create({
      data: {
        name,
        description,
        status,
        userId: user.id,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// PUT: Update a project (expects id in body)
export async function PUT(request: Request) {
  try {
    const { userId: clerkId } = getAuth(request);
    if (!clerkId) return new NextResponse("Unauthorized", { status: 401 });
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) return new NextResponse("User not found", { status: 404 });
    const body = await request.json();
    const { id, name, description, status } = body;
    if (!id) return new NextResponse("Missing project id", { status: 400 });
    const project = await prisma.project.update({
      where: { id, userId: user.id },
      data: { name, description, status },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECTS_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// DELETE: Delete a project (expects id in body)
export async function DELETE(request: Request) {
  try {
    const { userId: clerkId } = getAuth(request);
    if (!clerkId) return new NextResponse("Unauthorized", { status: 401 });
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) return new NextResponse("User not found", { status: 404 });
    const body = await request.json();
    const { id } = body;
    if (!id) return new NextResponse("Missing project id", { status: 400 });
    await prisma.project.delete({ where: { id, userId: user.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[PROJECTS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 