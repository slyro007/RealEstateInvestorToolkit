import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId: clerkId } = getAuth()

    if (!clerkId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const body = await request.json()
    const { title, type, targetArea, description, projectId } = body

    if (!title || !type || !targetArea || !description || !projectId) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Verify project exists and belongs to user
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: user.id }
    })

    if (!project) {
      return new NextResponse("Project not found", { status: 404 })
    }

    const campaign = await prisma.campaign.create({
      data: {
        title,
        type,
        targetArea,
        description,
        status: "active",
        responses: 0,
        leads: 0,
        userId: user.id,
        projectId: project.id,
      },
    })

    return NextResponse.json(campaign)
  } catch (error) {
    console.error("[CAMPAIGN_CREATION_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { userId: clerkId } = getAuth()

    if (!clerkId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    const where: any = { userId: user.id };
    if (projectId) where.projectId = projectId;

    const campaigns = await prisma.campaign.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(campaigns)
  } catch (error) {
    console.error("[CAMPAIGNS_FETCH_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 