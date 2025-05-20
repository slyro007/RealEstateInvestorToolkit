import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
      clerkId: "test_clerk_id",
    },
  })

  // Create a test project
  const project = await prisma.project.upsert({
    where: { id: "project1" },
    update: {},
    create: {
      id: "project1",
      name: "Demo Property Acquisition Project",
      description: "A sample project for acquiring distressed properties in the North County area",
      status: "active",
      userId: user.id,
    },
  })

  // Create sample campaigns
  const campaigns = [
    {
      id: "campaign1",
      title: "Direct Mail - Distressed Properties",
      type: "direct-mail",
      targetArea: "distressed",
      status: "active",
      description: "Targeting homeowners with distressed properties in North County",
      sent: 500,
      responses: 12,
      leads: 5,
      projectId: project.id,
    },
    {
      id: "campaign2",
      title: "Cold Calling - Vacant Homes",
      type: "cold-calling",
      targetArea: "vacant",
      status: "active",
      description: "Systematic calling campaign for vacant properties",
      calls: 200,
      responses: 25,
      leads: 8,
      projectId: project.id,
    },
    {
      id: "campaign3",
      title: "Driving for Dollars - Tax Delinquent",
      type: "driving-for-dollars",
      targetArea: "tax-delinquent",
      status: "pending",
      description: "Physical inspection of tax-delinquent properties",
      properties: 150,
      responses: 10,
      leads: 3,
      projectId: project.id,
    },
  ]

  for (const campaign of campaigns) {
    await prisma.campaign.upsert({
      where: { id: campaign.id },
      update: {},
      create: {
        ...campaign,
        userId: user.id,
      },
    })
  }

  console.log("Database seeded successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 