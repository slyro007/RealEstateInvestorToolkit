import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { level, goals, weeklyHours } = body

    if (!level || !goals || !weeklyHours) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const response = await fetch(`${process.env.API_URL}/api/education/path`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        user_id: userId,
        level,
        goals,
        weekly_hours: weeklyHours,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate learning path")
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("[EDUCATION_PATH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 