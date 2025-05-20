"use client"

import { useState } from "react"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { BookOpen, GraduationCap, Target, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

const levels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
]

const goals = [
  { value: "flipping", label: "House Flipping" },
  { value: "rental", label: "Rental Properties" },
  { value: "commercial", label: "Commercial Real Estate" },
  { value: "reits", label: "REITs" },
]

const weeklyHours = [
  { value: "5", label: "5 hours/week" },
  { value: "10", label: "10 hours/week" },
  { value: "15", label: "15 hours/week" },
  { value: "20", label: "20+ hours/week" },
]

export default function EducationPage() {
  const { userId } = auth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState("beginner")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedHours, setSelectedHours] = useState("10")

  if (!userId) {
    redirect("/sign-in")
  }

  const handleGeneratePath = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/education/path", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level: selectedLevel,
          goals: selectedGoals,
          weeklyHours: parseInt(selectedHours),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate learning path")
      }

      toast({
        title: "Learning path generated",
        description: "Your personalized learning path has been created.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate learning path. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold">Education</h1>
          <p className="text-muted-foreground">
            Build your real estate investing knowledge with personalized learning paths.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Generate Learning Path</CardTitle>
              <CardDescription>
                Create a personalized learning path based on your goals and experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Experience Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {levels.map((level) => (
                    <Button
                      key={level.value}
                      variant={selectedLevel === level.value ? "default" : "outline"}
                      onClick={() => setSelectedLevel(level.value)}
                    >
                      {level.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Investment Goals</label>
                <div className="grid grid-cols-2 gap-2">
                  {goals.map((goal) => (
                    <Button
                      key={goal.value}
                      variant={selectedGoals.includes(goal.value) ? "default" : "outline"}
                      onClick={() => {
                        setSelectedGoals((prev) =>
                          prev.includes(goal.value)
                            ? prev.filter((g) => g !== goal.value)
                            : [...prev, goal.value]
                        )
                      }}
                    >
                      {goal.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Weekly Study Time</label>
                <div className="grid grid-cols-2 gap-2">
                  {weeklyHours.map((hours) => (
                    <Button
                      key={hours.value}
                      variant={selectedHours === hours.value ? "default" : "outline"}
                      onClick={() => setSelectedHours(hours.value)}
                    >
                      {hours.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGeneratePath}
                disabled={isLoading || selectedGoals.length === 0}
              >
                {isLoading ? "Generating..." : "Generate Learning Path"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>
                Explore curated resources to enhance your real estate knowledge.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">Books & Articles</h3>
                  <p className="text-sm text-muted-foreground">
                    Essential reading materials for real estate investors.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <GraduationCap className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">Courses & Workshops</h3>
                  <p className="text-sm text-muted-foreground">
                    Structured learning programs and hands-on workshops.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Target className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">Case Studies</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-world examples and success stories.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">Market Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Latest trends and market analysis.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 