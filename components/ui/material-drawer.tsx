import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { elevation } from "@/lib/material-theme";

const materialDrawerVariants = cva(
  "fixed z-50 flex h-full flex-col bg-surface-main dark:bg-dark-surface-main outline-none overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        standard: "",
        modal: "",
        dismissible: "",
      },
      side: {
        left: "inset-y-0 left-0 border-r",
        right: "inset-y-0 right-0 border-l",
      },
      width: {
        default: "w-[360px] max-w-[calc(100vw-3rem)]",
        slim: "w-[80px] max-w-[calc(100vw-3rem)]",
        wide: "w-[400px] max-w-[calc(100vw-3rem)]",
      },
    },
    defaultVariants: {
      variant: "standard",
      side: "left",
      width: "default",
    },
    compoundVariants: [
      {
        variant: ["standard", "modal"],
        className: "border-outline-main dark:border-dark-outline-main",
      },
      {
        variant: "standard",
        className: elevation.level0,
      },
      {
        variant: ["modal", "dismissible"],
        className: elevation.level1,
      },
    ],
  }
);

const MaterialDrawerPortal = SheetPrimitive.Portal;

const MaterialDrawerOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
MaterialDrawerOverlay.displayName = SheetPrimitive.Overlay.displayName;

interface MaterialDrawerRootProps extends SheetPrimitive.DialogProps {
  variant?: VariantProps<typeof materialDrawerVariants>["variant"];
}

const MaterialDrawerRoot = ({ variant = "standard", ...props }: MaterialDrawerRootProps) => {
  return (
    <>
      {(variant === "modal" || variant === "dismissible") && <SheetPrimitive.Root {...props} />}
      {variant === "standard" && <div {...props} />}
    </>
  );
};

MaterialDrawerRoot.displayName = "MaterialDrawerRoot";

const MaterialDrawerTrigger = SheetPrimitive.Trigger;

interface MaterialDrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof materialDrawerVariants> {
  onOpenStateChange?: (open: boolean) => void;
}

const MaterialDrawerContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  MaterialDrawerContentProps
>(({ className, side = "left", width, variant = "standard", children, onOpenStateChange, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showOverlay, setShowOverlay] = React.useState(false);
  
  // For dismissible drawer, handle mouse enter/leave
  const handleMouseEnter = () => {
    if (variant === "dismissible" && !isOpen) {
      setIsOpen(true);
      onOpenStateChange?.(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (variant === "dismissible" && isOpen) {
      setIsOpen(false);
      onOpenStateChange?.(false);
    }
  };
  
  // For modal drawer, use Radix UI's onOpenChange
  const handleOpenChange = (open: boolean) => {
    if (variant === "modal") {
      onOpenStateChange?.(open);
    }
  };
  
  // For modal drawer, show overlay when open
  React.useEffect(() => {
    if (variant === "modal") {
      setShowOverlay(isOpen);
    } else {
      setShowOverlay(false);
    }
  }, [variant, isOpen]);
  
  // Standard drawer is always visible
  if (variant === "standard") {
    return (
      <div
        className={cn(materialDrawerVariants({ variant, side, width }), className)}
        ref={ref as React.Ref<HTMLDivElement>}
        {...props}
      >
        {children}
      </div>
    );
  }
  
  // Dismissible drawer can be open/closed but remains in the layout
  if (variant === "dismissible") {
    return (
      <div
        className={cn(
          materialDrawerVariants({ variant, side, width }), 
          isOpen ? "translate-x-0" : side === "left" ? "-translate-x-full" : "translate-x-full",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref as React.Ref<HTMLDivElement>}
        {...props}
      >
        {children}
      </div>
    );
  }
  
  // Modal drawer is a dialog that appears on demand
  return (
    <SheetPrimitive.Content
      onOpenChange={handleOpenChange}
      onOpenAutoFocus={(e) => e.preventDefault()}
      className={cn(
        materialDrawerVariants({ variant, side, width }),
        side === "left" ? "data-[state=closed]:-translate-x-full" : "data-[state=closed]:translate-x-full",
        "data-[state=open]:translate-x-0",
        "duration-300 ease-in-out",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </SheetPrimitive.Content>
  );
});

MaterialDrawerContent.displayName = "MaterialDrawerContent";

const MaterialDrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-16 min-h-16 flex items-center px-4 border-b border-outline-main/20 dark:border-dark-outline-main/20", className)}
    {...props}
  />
));

MaterialDrawerHeader.displayName = "MaterialDrawerHeader";

const MaterialDrawerBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto", className)}
    {...props}
  />
));

MaterialDrawerBody.displayName = "MaterialDrawerBody";

const MaterialDrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 border-t border-outline-main/20 dark:border-dark-outline-main/20", className)}
    {...props}
  />
));

MaterialDrawerFooter.displayName = "MaterialDrawerFooter";

const MaterialDrawerNavGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("py-2", className)}
    {...props}
  />
));

MaterialDrawerNavGroup.displayName = "MaterialDrawerNavGroup";

const MaterialDrawerNavItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean; icon?: React.ReactNode }
>(({ className, active, icon, children, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "flex items-center gap-3 px-4 py-3 text-text-primary dark:text-dark-text-primary rounded-r-full transition-colors relative",
      active ? "bg-primary-container dark:bg-dark-primary-container text-primary-onContainer dark:text-dark-primary-onContainer" 
             : "hover:bg-black/5 dark:hover:bg-white/10",
      className
    )}
    {...props}
  >
    {active && <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary-main dark:bg-dark-primary-main rounded-r-full" />}
    {icon && <span className={cn("text-lg", active ? "text-primary-main dark:text-dark-primary-main" : "text-text-primary dark:text-dark-text-primary")}>{icon}</span>}
    {children}
  </a>
));

MaterialDrawerNavItem.displayName = "MaterialDrawerNavItem";

const MaterialDrawerNavTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-4 py-2 text-sm text-text-secondary dark:text-dark-text-secondary font-medium", className)}
    {...props}
  />
));

MaterialDrawerNavTitle.displayName = "MaterialDrawerNavTitle";

const MaterialDrawerNavDivider = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("my-2 border-outline-main/20 dark:border-dark-outline-main/20", className)}
    {...props}
  />
));

MaterialDrawerNavDivider.displayName = "MaterialDrawerNavDivider";

export {
  MaterialDrawerRoot as MaterialDrawer,
  MaterialDrawerPortal,
  MaterialDrawerOverlay,
  MaterialDrawerTrigger,
  MaterialDrawerContent,
  MaterialDrawerHeader,
  MaterialDrawerBody,
  MaterialDrawerFooter,
  MaterialDrawerNavGroup,
  MaterialDrawerNavItem,
  MaterialDrawerNavTitle,
  MaterialDrawerNavDivider,
  materialDrawerVariants,
}; 