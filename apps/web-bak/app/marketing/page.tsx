"use client"

import { useState, useEffect } from "react"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Mail, Phone, Target, BarChart, FileText, Users, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { ScriptModal } from "@/components/marketing/script-modal"
import { CampaignForm } from "@/components/marketing/campaign-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const campaignTypes = [
  { value: "direct-mail", label: "Direct Mail" },
  { value: "cold-calling", label: "Cold Calling" },
  { value: "driving-for-dollars", label: "Driving for Dollars" },
  { value: "social-media", label: "Social Media" },
]

const targetAreas = [
  { value: "distressed", label: "Distressed Properties" },
  { value: "vacant", label: "Vacant Homes" },
  { value: "inheritance", label: "Inheritance Properties" },
  { value: "divorce", label: "Divorce Situations" },
  { value: "tax-delinquent", label: "Tax Delinquent" },
  { value: "probate", label: "Probate" },
]

interface Campaign {
  id: string
  title: string
  type: string
  targetArea: string
  status: string
  description: string
  sent?: number
  calls?: number
  properties?: number
  responses: number
  leads: number
}

export default function MarketingPage() {
  const { userId } = auth()
  const { toast } = useToast()
  const [selectedType, setSelectedType] = useState<string[]>([])
  const [selectedArea, setSelectedArea] = useState<string[]>([])
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false)
  const [currentScript, setCurrentScript] = useState("")
  const [currentCampaignTitle, setCurrentCampaignTitle] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)

  if (!userId) {
    redirect("/sign-in")
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/marketing/campaigns")
      if (!response.ok) {
        throw new Error("Failed to fetch campaigns")
      }
      const data = await response.json()
      setCampaigns(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch campaigns. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateScript = async (campaignId: string, campaignTitle: string) => {
    setIsGenerating(true)
    try {
      const response = await fetch(`/api/marketing/${campaignId}/script`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to generate script")
      }

      const data = await response.json()
      setCurrentScript(data.script)
      setCurrentCampaignTitle(campaignTitle)
      setIsScriptModalOpen(true)

      toast({
        title: "Script generated",
        description: "Your marketing script has been created.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate script. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      (selectedType.length === 0 || selectedType.includes(campaign.type)) &&
      (selectedArea.length === 0 || selectedArea.includes(campaign.targetArea))
  )

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Marketing</h1>
            <p className="text-muted-foreground">
              Manage your off-market real estate marketing campaigns and lead generation.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>
                  Set up a new marketing campaign for off-market properties.
                </DialogDescription>
              </DialogHeader>
              <CampaignForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Filters</CardTitle>
              <CardDescription>
                Filter campaigns by type and target area.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Campaign Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {campaignTypes.map((type) => (
                    <Button
                      key={type.value}
                      variant={selectedType.includes(type.value) ? "default" : "outline"}
                      onClick={() => {
                        setSelectedType((prev) =>
                          prev.includes(type.value)
                            ? prev.filter((t) => t !== type.value)
                            : [...prev, type.value]
                        )
                      }}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Target Area</label>
                <div className="grid grid-cols-3 gap-2">
                  {targetAreas.map((area) => (
                    <Button
                      key={area.value}
                      variant={selectedArea.includes(area.value) ? "default" : "outline"}
                      onClick={() => {
                        setSelectedArea((prev) =>
                          prev.includes(area.value)
                            ? prev.filter((a) => a !== area.value)
                            : [...prev, area.value]
                        )
                      }}
                    >
                      {area.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {isLoading ? (
              <div className="text-center py-8">Loading campaigns...</div>
            ) : filteredCampaigns.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No campaigns found. Create a new campaign to get started.
              </div>
            ) : (
              filteredCampaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="grid gap-1">
                        <h3 className="text-lg font-semibold">{campaign.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {campaign.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGenerateScript(campaign.id, campaign.title)}
                          disabled={isGenerating}
                        >
                          {isGenerating ? "Generating..." : "Generate Script"}
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm capitalize">{campaign.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm capitalize">{campaign.targetArea}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {campaign.type === "direct-mail" && `${campaign.sent || 0} sent`}
                          {campaign.type === "cold-calling" && `${campaign.calls || 0} calls`}
                          {campaign.type === "driving-for-dollars" && `${campaign.properties || 0} properties`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{campaign.leads} leads</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Marketing Tools</CardTitle>
              <CardDescription>
                AI-powered tools to enhance your off-market marketing efforts.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">Script Generator</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate personalized scripts for cold calling and direct mail campaigns.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Target className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">Lead Scoring</h3>
                  <p className="text-sm text-muted-foreground">
                    AI-powered lead scoring to prioritize your most promising opportunities.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <BarChart className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">Campaign Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Track and analyze the performance of your marketing campaigns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ScriptModal
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
        script={currentScript}
        campaignTitle={currentCampaignTitle}
      />
    </div>
  )
} 