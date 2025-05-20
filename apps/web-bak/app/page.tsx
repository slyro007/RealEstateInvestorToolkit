import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/header'
import { ModuleCard } from '@/components/dashboard/module-card'
import { 
  BookOpen, 
  Megaphone, 
  Handshake, 
  Calculator, 
  Wallet, 
  Settings 
} from 'lucide-react'

const modules = [
  {
    title: 'Strategy & Education',
    description: 'Personalized learning paths and AI-powered coaching',
    icon: BookOpen,
    href: '/education',
    color: 'text-blue-500',
  },
  {
    title: 'Marketing',
    description: 'Branding, content generation, and SEO tools',
    icon: Megaphone,
    href: '/marketing',
    color: 'text-purple-500',
  },
  {
    title: 'Sales & Negotiation',
    description: 'CRM, script builder, and negotiation simulator',
    icon: Handshake,
    href: '/sales',
    color: 'text-green-500',
  },
  {
    title: 'Analysis & Due Diligence',
    description: 'Deal analysis, comps, and property research',
    icon: Calculator,
    href: '/analysis',
    color: 'text-orange-500',
  },
  {
    title: 'Finance',
    description: 'Lender matching and financial tracking',
    icon: Wallet,
    href: '/finance',
    color: 'text-red-500',
  },
  {
    title: 'Operations',
    description: 'Entity setup, workflow automation, and contractor management',
    icon: Settings,
    href: '/operations',
    color: 'text-gray-500',
  },
]

export default async function DashboardPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <ModuleCard key={module.title} {...module} />
          ))}
        </div>
      </main>
    </div>
  )
} 