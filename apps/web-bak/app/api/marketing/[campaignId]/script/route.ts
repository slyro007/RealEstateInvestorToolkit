import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import OpenAI from "openai"
import { prisma } from "@/lib/db"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(
  request: Request,
  { params }: { params: { campaignId: string } }
) {
  try {
    const { userId: clerkId } = auth()

    if (!clerkId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId },
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    // Get campaign from database
    const campaign = await prisma.campaign.findUnique({
      where: { id: params.campaignId },
    })

    if (!campaign) {
      return new NextResponse("Campaign not found", { status: 404 })
    }

    // Generate script based on campaign type and target area
    const prompt = generatePrompt(campaign.type, campaign.targetArea)
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert real estate investor specializing in off-market properties. Your task is to create compelling marketing scripts that resonate with property owners in specific situations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const script = completion.choices[0].message.content

    // Save script to database
    const savedScript = await prisma.script.create({
      data: {
        content: script || "",
        campaignId: campaign.id,
        userId: user.id,
      },
    })

    return NextResponse.json({ script: savedScript.content })
  } catch (error) {
    console.error("[SCRIPT_GENERATION_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

function generatePrompt(type: string, targetArea: string): string {
  const basePrompt = `Create a marketing script for a ${type} campaign targeting ${targetArea}. 
  The script should be professional, empathetic, and focused on providing value to the property owner.
  Include specific talking points and responses to common objections.`

  switch (type) {
    case "direct-mail":
      return `${basePrompt}
      Format the script as a letter with:
      1. Attention-grabbing headline
      2. Personal connection
      3. Value proposition
      4. Call to action
      5. Professional signature`
    
    case "cold-calling":
      return `${basePrompt}
      Format the script with:
      1. Introduction
      2. Value proposition
      3. Key questions to ask
      4. Common objections and responses
      5. Call to action`
    
    case "driving-for-dollars":
      return `${basePrompt}
      Format the script with:
      1. Property observation notes
      2. Door hanger text
      3. Follow-up letter template
      4. Key points to document`
    
    default:
      return basePrompt
  }
} 