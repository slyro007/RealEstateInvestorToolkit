"use client"

import { useState } from "react"
// import { auth } from "@clerk/nextjs"
// import { redirect } from "next/navigation"
import { BookOpen, GraduationCap, Target, Clock, ArrowLeft, ChevronRight, BookMarked, Award } from "lucide-react"
import Link from "next/link"

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

const recommendedCourses = [
  {
    title: "Real Estate Fundamentals",
    description: "Learn the core principles of real estate investing",
    level: "Beginner",
    duration: "4 weeks",
    rating: 4.8,
    students: 1243,
    image: "bg-gradient-to-br from-blue-400 to-blue-600"
  },
  {
    title: "Advanced Rental Analysis",
    description: "Master the financial analysis of rental properties",
    level: "Intermediate",
    duration: "6 weeks",
    rating: 4.9,
    students: 856,
    image: "bg-gradient-to-br from-purple-400 to-purple-600"
  },
  {
    title: "Commercial Deal Structuring",
    description: "Complex deal structures for commercial properties",
    level: "Advanced",
    duration: "8 weeks",
    rating: 4.7,
    students: 532,
    image: "bg-gradient-to-br from-amber-400 to-amber-600"
  }
];

export default function EducationPage() {
  // const { userId } = auth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState("beginner")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedHours, setSelectedHours] = useState("10")

  // Temporarily disabled authentication check
  // if (!userId) {
  //   redirect("/sign-in")
  // }

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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <div className="flex h-16 items-center px-6 md:px-10 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        {/* Hero section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Strategy & Education</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            Build your real estate investing knowledge with personalized learning paths and AI-powered resources tailored to your goals.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">200+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Lessons</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Courses</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-100 dark:border-green-800">
              <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">12k+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Students</div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-100 dark:border-amber-800">
              <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">4.9</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Learning Path Generator */}
          <div className="md:col-span-2 lg:col-span-2">
            <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20 shadow-sm overflow-hidden">
              <div className="absolute right-0 top-0 h-16 w-16">
                <div className="absolute transform rotate-45 bg-blue-600 text-white text-xs font-semibold py-1 right-[-35px] top-[15px] w-[130px] text-center">
                  Personalized
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Award className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Generate Learning Path
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Create a personalized learning path based on your goals and experience.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {levels.map((level) => (
                      <Button
                        key={level.value}
                        variant={selectedLevel === level.value ? "default" : "outline"}
                        onClick={() => setSelectedLevel(level.value)}
                        className={selectedLevel === level.value ? "bg-blue-600 hover:bg-blue-700" : "hover:border-blue-300 dark:hover:border-blue-600"}
                      >
                        {level.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Investment Goals</label>
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
                        className={selectedGoals.includes(goal.value) ? "bg-blue-600 hover:bg-blue-700" : "hover:border-blue-300 dark:hover:border-blue-600"}
                      >
                        {goal.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Weekly Study Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    {weeklyHours.map((hours) => (
                      <Button
                        key={hours.value}
                        variant={selectedHours === hours.value ? "default" : "outline"}
                        onClick={() => setSelectedHours(hours.value)}
                        className={selectedHours === hours.value ? "bg-blue-600 hover:bg-blue-700" : "hover:border-blue-300 dark:hover:border-blue-600"}
                      >
                        {hours.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGeneratePath}
                  disabled={isLoading || selectedGoals.length === 0}
                  className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                >
                  {isLoading ? "Generating..." : "Generate Learning Path"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Learning Resources */}
          <div className="lg:row-span-2">
            <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20 shadow-sm h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <BookMarked className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Learning Resources
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Explore curated resources to enhance your real estate knowledge.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="group flex items-center gap-4 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-colors">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">Books & Articles</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Essential reading materials for real estate investors.
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>

                <div className="group flex items-center gap-4 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-colors">
                  <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">Courses & Workshops</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Structured learning programs and hands-on workshops.
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                </div>

                <div className="group flex items-center gap-4 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-colors">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                    <Target className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">Case Studies</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Real-world examples and success stories.
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                </div>

                <div className="group flex items-center gap-4 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-colors">
                  <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">Market Updates</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Latest trends and market analysis.
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Popular Courses Section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recommended Courses</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {recommendedCourses.map((course, index) => (
                <div key={index} className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`h-32 ${course.image} flex items-center justify-center p-4`}>
                    <GraduationCap className="h-12 w-12 text-white" />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full px-2 py-1">
                        {course.level}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{course.duration}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-3">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm ml-1 text-gray-600 dark:text-gray-300">{course.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{course.students} students</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to accelerate your real estate education?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Upgrade to our Pro plan for unlimited access to all courses, personalized coaching, and exclusive resources.
          </p>
          <Button className="bg-white text-blue-600 hover:bg-blue-50 shadow-md">
            Upgrade to Pro
          </Button>
        </div>
      </div>
      
      <footer className="bg-gray-100 dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2023 Real Estate Investor Toolkit. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Terms</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 