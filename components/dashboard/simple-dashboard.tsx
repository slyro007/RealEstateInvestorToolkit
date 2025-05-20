import React from "react";
import { MaterialButton } from "@/components/ui/material-button";
import { MaterialCard, MaterialCardContent, MaterialCardHeader, MaterialCardTitle } from "@/components/ui/material-card";
import { ExternalLink } from "lucide-react";

export function SimpleDashboard() {
  return (
    <div className="container mx-auto px-4 py-12">
      <MaterialCard className="mb-6">
        <MaterialCardHeader>
          <MaterialCardTitle>Welcome to the Real Estate Investor Toolkit</MaterialCardTitle>
        </MaterialCardHeader>
        <MaterialCardContent>
          <p className="mb-4">This is a placeholder dashboard component. The main landing page is being displayed now.</p>
          <MaterialButton 
            variant="tonal" 
            endIcon={<ExternalLink className="h-4 w-4" />}
          >
            Explore Features
          </MaterialButton>
        </MaterialCardContent>
      </MaterialCard>
    </div>
  );
} 