"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()
  
  const routes = [
    {
      href: "/",
      label: "Dashboard",
      active: pathname === "/"
    },
    {
      href: "/marketing",
      label: "Marketing",
      active: pathname === "/marketing" || pathname.startsWith("/marketing/")
    },
    {
      href: "/deals",
      label: "Deals",
      active: pathname === "/deals" || pathname.startsWith("/deals/")
    },
    {
      href: "/education",
      label: "Education",
      active: pathname === "/education" || pathname.startsWith("/education/")
    }
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active 
              ? "text-black dark:text-white" 
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
} 