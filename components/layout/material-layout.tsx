import React from "react";
import Link from "next/link";
import { MaterialAppBar, MaterialAppBarLeft, MaterialAppBarTitle, MaterialAppBarRight } from "@/components/ui/material-app-bar";
import { MaterialButton } from "@/components/ui/material-button";
import { Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "next-themes";

interface MaterialLayoutProps {
  children: React.ReactNode;
}

export function MaterialLayout({ children }: MaterialLayoutProps) {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-main dark:bg-dark-surface-main">
      <MaterialAppBar position="sticky">
        <MaterialAppBarLeft>
          <MaterialButton variant="text" size="icon" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </MaterialButton>
          <MaterialAppBarTitle>
            <Link href="/" className="hover:opacity-80 transition-opacity">
              Real Estate Investor Toolkit
            </Link>
          </MaterialAppBarTitle>
        </MaterialAppBarLeft>
        <MaterialAppBarRight>
          <MaterialButton 
            variant="text" 
            size="icon" 
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </MaterialButton>
          <Link href="/sign-in">
            <MaterialButton variant="tonal" size="sm">
              Log In
            </MaterialButton>
          </Link>
          <Link href="/sign-up">
            <MaterialButton variant="filled" size="sm">
              Sign Up
            </MaterialButton>
          </Link>
        </MaterialAppBarRight>
      </MaterialAppBar>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 