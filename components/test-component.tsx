import React from 'react';
import { MaterialButton } from './ui/material-button';
import { MaterialCard, MaterialCardContent, MaterialCardHeader, MaterialCardTitle } from './ui/material-card';

export function TestComponent() {
  return (
    <div className="space-y-4">
      <h1>Test Material UI Components</h1>
      
      <div className="space-y-2">
        <h2>Buttons</h2>
        <div className="flex space-x-2">
          <MaterialButton variant="primary">Primary</MaterialButton>
          <MaterialButton variant="secondary">Secondary</MaterialButton>
          <MaterialButton variant="outlined">Outlined</MaterialButton>
          <MaterialButton variant="text">Text</MaterialButton>
        </div>
      </div>
      
      <div className="space-y-2">
        <h2>Cards</h2>
        <div className="grid grid-cols-2 gap-4">
          <MaterialCard>
            <MaterialCardHeader>
              <MaterialCardTitle>Card Title</MaterialCardTitle>
            </MaterialCardHeader>
            <MaterialCardContent>
              This is a basic card with header and content.
            </MaterialCardContent>
          </MaterialCard>
          
          <MaterialCard variant="outlined">
            <MaterialCardHeader>
              <MaterialCardTitle>Outlined Card</MaterialCardTitle>
            </MaterialCardHeader>
            <MaterialCardContent>
              This is an outlined card variant.
            </MaterialCardContent>
          </MaterialCard>
        </div>
      </div>
    </div>
  );
} 