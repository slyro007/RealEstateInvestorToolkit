import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  { params }: { params: { dealId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const response = await fetch(
      `${process.env.API_URL}/api/deals/${params.dealId}/analyze`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify({
          user_id: userId,
        }),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to analyze deal")
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("[DEAL_ANALYZE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 