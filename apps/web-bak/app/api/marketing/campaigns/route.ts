import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId: clerkId } = auth()

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
    const { title, type, targetArea, description } = body

    if (!title || !type || !targetArea || !description) {
      return new NextResponse("Missing required fields", { status: 400 })
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
    const { userId: clerkId } = auth()

    if (!clerkId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const campaigns = await prisma.campaign.findMany({
      where: {
        userId: user.id,
      },
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