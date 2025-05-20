"use client"

import { useState } from "react"
import { Copy, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

interface ScriptModalProps {
  isOpen: boolean
  onClose: () => void
  script: string
  campaignTitle: string
}

export function ScriptModal({
  isOpen,
  onClose,
  script,
  campaignTitle,
}: ScriptModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script)
      toast({
        title: "Copied to clipboard",
        description: "The script has been copied to your clipboard.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy script. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      const blob = new Blob([script], { type: "text/plain" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${campaignTitle.toLowerCase().replace(/\s+/g, "-")}-script.txt`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast({
        title: "Downloaded",
        description: "The script has been downloaded.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download script. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{campaignTitle} - Marketing Script</DialogTitle>
          <DialogDescription>
            Use this script for your marketing campaign. You can copy it to your clipboard or download it as a text file.
          </DialogDescription>
        </DialogHeader>
        <div className="relative mt-4">
          <div className="absolute right-4 top-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={isLoading}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
          <div className="rounded-md border bg-muted p-4">
            <pre className="whitespace-pre-wrap text-sm">
              {script}
            </pre>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 