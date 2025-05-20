import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { elevation } from "@/lib/material-theme";

const materialAppBarVariants = cva(
  "w-full flex items-center transition-all duration-300 z-20 relative",
  {
    variants: {
      variant: {
        filled: "bg-primary-main dark:bg-dark-primary-main text-white dark:text-dark-primary-contrastText",
        elevated: "bg-surface-container dark:bg-dark-surface-container text-primary-main dark:text-dark-primary-main",
        surface: "bg-surface-main dark:bg-dark-surface-main text-primary-main dark:text-dark-primary-main",
      },
      position: {
        static: "relative",
        sticky: "sticky top-0",
        fixed: "fixed top-0 left-0 right-0",
      },
      size: {
        small: "h-12 px-3", // 48px
        medium: "h-16 px-4", // 64px
        large: "h-20 px-6", // 80px
      },
      scrollBehavior: {
        standard: "",
        elevate: "",
        shrink: "",
        hide: "",
      },
    },
    defaultVariants: {
      variant: "filled",
      position: "static",
      size: "medium",
      scrollBehavior: "standard",
    },
  }
);

export interface MaterialAppBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof materialAppBarVariants> {
  asChild?: boolean;
}

const MaterialAppBar = React.forwardRef<HTMLDivElement, MaterialAppBarProps>(
  ({ className, variant, position, size, scrollBehavior, ...props }, ref) => {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(true);
    const lastScrollY = React.useRef(0);
    
    React.useEffect(() => {
      if (position === "static" || !scrollBehavior || scrollBehavior === "standard") {
        return;
      }
      
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY.current;
        
        // For all non-standard behaviors, we want to know if we've scrolled at all
        if (scrollBehavior !== "standard") {
          setIsScrolled(currentScrollY > 0);
        }
        
        // Hide on scroll down, show on scroll up
        if (scrollBehavior === "hide") {
          setIsVisible(!isScrolled || !isScrollingDown);
        }
        
        lastScrollY.current = currentScrollY;
      };
      
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [position, scrollBehavior, isScrolled]);
    
    const getElevation = () => {
      if (variant === "filled") {
        return "";
      }
      
      if (variant === "elevated" || (scrollBehavior === "elevate" && isScrolled)) {
        return elevation.level2;
      }
      
      return "";
    };
    
    const getShrinkStyles = () => {
      if (scrollBehavior === "shrink" && isScrolled) {
        return size === "large" ? "h-16" : "h-12";
      }
      return "";
    };
    
    const getTransformStyles = () => {
      if (scrollBehavior === "hide" && !isVisible) {
        return "transform -translate-y-full";
      }
      return "";
    };

    return (
      <div
        ref={ref}
        className={cn(
          materialAppBarVariants({ 
            variant, 
            position, 
            size, 
            scrollBehavior,
          }),
          getElevation(),
          getShrinkStyles(),
          getTransformStyles(),
          className
        )}
        {...props}
      />
    );
  }
);

MaterialAppBar.displayName = "MaterialAppBar";

const MaterialAppBarLeft = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-4", className)}
    {...props}
  />
));

MaterialAppBarLeft.displayName = "MaterialAppBarLeft";

const MaterialAppBarTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xl font-medium leading-8 tracking-[0.15px] overflow-hidden overflow-ellipsis whitespace-nowrap", className)}
    {...props}
  />
));

MaterialAppBarTitle.displayName = "MaterialAppBarTitle";

const MaterialAppBarCenter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 flex items-center justify-center", className)}
    {...props}
  />
));

MaterialAppBarCenter.displayName = "MaterialAppBarCenter";

const MaterialAppBarRight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 ml-auto", className)}
    {...props}
  />
));

MaterialAppBarRight.displayName = "MaterialAppBarRight";

export {
  MaterialAppBar,
  MaterialAppBarLeft,
  MaterialAppBarTitle,
  MaterialAppBarCenter,
  MaterialAppBarRight,
  materialAppBarVariants,
}; 