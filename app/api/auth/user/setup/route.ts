import { getAuth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST() {
  try {
    // Get the clerk user ID
    const { userId: clerkId } = getAuth();
    if (!clerkId) return new NextResponse("Unauthorized", { status: 401 });

    // Get user details from Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) return new NextResponse("User details not found", { status: 404 });

    // Use primary email from Clerk
    const email = clerkUser.emailAddresses[0]?.emailAddress || `${clerkId}@example.com`;
    const name = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || "New User";

    // Check if this user already exists
    const existingUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (existingUser) {
      return NextResponse.json(existingUser);
    }

    console.log(`Creating new user for clerkId: ${clerkId}, email: ${email}, name: ${name}`);

    // Create a new user record
    const newUser = await prisma.user.create({
      data: {
        clerkId,
        email,
        name,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("[USER_SETUP_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 