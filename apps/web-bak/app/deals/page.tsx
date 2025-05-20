"use client"

import { useState } from "react"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Building2, DollarSign, TrendingUp, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

const dealTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
  { value: "industrial", label: "Industrial" },
]

const dealStatus = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "closed", label: "Closed" },
  { value: "rejected", label: "Rejected" },
]

const mockDeals = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    type: "residential",
    status: "active",
    price: 450000,
    roi: 12.5,
    location: "New York, NY",
    description: "2-bedroom apartment in prime downtown location",
  },
  {
    id: 2,
    title: "Commercial Office Space",
    type: "commercial",
    status: "pending",
    price: 1200000,
    roi: 8.2,
    location: "Chicago, IL",
    description: "Class A office building with long-term tenants",
  },
  {
    id: 3,
    title: "Industrial Warehouse",
    type: "industrial",
    status: "active",
    price: 850000,
    roi: 15.7,
    location: "Houston, TX",
    description: "10,000 sq ft warehouse with loading docks",
  },
]

export default function DealsPage() {
  const { userId } = auth()
  const { toast } = useToast()
  const [selectedType, setSelectedType] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])

  if (!userId) {
    redirect("/sign-in")
  }

  const handleAnalyzeDeal = async (dealId: number) => {
    try {
      const response = await fetch(`/api/deals/${dealId}/analyze`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to analyze deal")
      }

      toast({
        title: "Deal analysis started",
        description: "We'll notify you when the analysis is complete.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze deal. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredDeals = mockDeals.filter(
    (deal) =>
      (selectedType.length === 0 || selectedType.includes(deal.type)) &&
      (selectedStatus.length === 0 || selectedStatus.includes(deal.status))
  )

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold">Deals</h1>
          <p className="text-muted-foreground">
            Manage and analyze your real estate investment opportunities.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>
                Filter deals by type and status.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Deal Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {dealTypes.map((type) => (
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
                <label className="text-sm font-medium">Status</label>
                <div className="grid grid-cols-4 gap-2">
                  {dealStatus.map((status) => (
                    <Button
                      key={status.value}
                      variant={selectedStatus.includes(status.value) ? "default" : "outline"}
                      onClick={() => {
                        setSelectedStatus((prev) =>
                          prev.includes(status.value)
                            ? prev.filter((s) => s !== status.value)
                            : [...prev, status.value]
                        )
                      }}
                    >
                      {status.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {filteredDeals.map((deal) => (
              <Card key={deal.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="grid gap-1">
                      <h3 className="text-lg font-semibold">{deal.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {deal.location}
                      </p>
                      <p className="text-sm">{deal.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAnalyzeDeal(deal.id)}
                      >
                        Analyze Deal
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm capitalize">{deal.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        ${deal.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{deal.roi}% ROI</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 