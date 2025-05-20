import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { elevation, shape } from "@/lib/material-theme";

// Material Card variants
const materialCardVariants = cva(
  "overflow-hidden transition-all",
  {
    variants: {
      variant: {
        elevated: "bg-surface-main dark:bg-dark-surface-container",
        filled: "bg-surface-containerLow dark:bg-dark-surface-containerLow",
        outlined: "bg-surface-main border border-outline-main dark:bg-dark-surface-main dark:border-dark-outline-main",
      },
      radius: {
        none: "rounded-none",
        small: `rounded-${shape.small}`,
        medium: `rounded-${shape.medium}`,
        large: `rounded-${shape.large}`,
        extraLarge: `rounded-${shape.extraLarge}`,
      },
      elevation: {
        level0: elevation.level0,
        level1: elevation.level1,
        level2: elevation.level2,
        level3: elevation.level3,
        level4: elevation.level4,
        level5: elevation.level5,
      },
      fullWidth: {
        true: "w-full",
      },
      clickable: {
        true: "cursor-pointer hover:shadow-md transition-shadow duration-300",
      },
    },
    defaultVariants: {
      variant: "elevated",
      radius: "medium",
      elevation: "level1",
      fullWidth: false,
      clickable: false,
    },
    compoundVariants: [
      {
        variant: "elevated",
        elevation: "level0",
        className: elevation.level1,
      },
      {
        variant: "elevated",
        clickable: true,
        className: `hover:${elevation.level2}`,
      },
      {
        variant: "filled",
        clickable: true,
        className: `hover:${elevation.level1}`,
      },
      {
        variant: "outlined",
        clickable: true,
        className: `hover:${elevation.level1}`,
      },
    ],
  }
);

export interface MaterialCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof materialCardVariants> {
  asChild?: boolean;
}

// Card Root component
const MaterialCard = React.forwardRef<HTMLDivElement, MaterialCardProps>(
  ({ className, variant, radius, elevation, fullWidth, clickable, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(materialCardVariants({ variant, radius, elevation, fullWidth, clickable, className }))}
        {...props}
      />
    );
  }
);

MaterialCard.displayName = "MaterialCard";

// Card Header Component
const MaterialCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col p-6 pb-0", className)}
    {...props}
  />
));

MaterialCardHeader.displayName = "MaterialCardHeader";

// Card Title Component
const MaterialCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-medium text-xl leading-7 tracking-[0.15px] text-primary-main dark:text-dark-primary-main", className)}
    {...props}
  />
));

MaterialCardTitle.displayName = "MaterialCardTitle";

// Card Description Component
const MaterialCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm leading-5 text-text-secondary dark:text-dark-text-secondary mt-1", className)}
    {...props}
  />
));

MaterialCardDescription.displayName = "MaterialCardDescription";

// Card Content Component
const MaterialCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));

MaterialCardContent.displayName = "MaterialCardContent";

// Card Media Component
const MaterialCardMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { aspectRatio?: "video" | "square" | "portrait" | "landscape" }
>(({ className, aspectRatio = "landscape", ...props }, ref) => {
  const aspectMap = {
    video: "aspect-video", // 16:9
    square: "aspect-square", // 1:1
    portrait: "aspect-[2/3]", // 2:3
    landscape: "aspect-[3/2]", // 3:2
  };

  return (
    <div 
      ref={ref} 
      className={cn(
        "overflow-hidden", 
        aspectMap[aspectRatio],
        className
      )} 
      {...props} 
    />
  );
});

MaterialCardMedia.displayName = "MaterialCardMedia";

// Card Footer Component
const MaterialCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

MaterialCardFooter.displayName = "MaterialCardFooter";

export {
  MaterialCard,
  MaterialCardHeader,
  MaterialCardTitle,
  MaterialCardDescription,
  MaterialCardContent,
  MaterialCardMedia,
  MaterialCardFooter,
  materialCardVariants,
}; 