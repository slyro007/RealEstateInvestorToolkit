import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { elevation } from "@/lib/material-theme";

const materialButtonVariants = cva(
  "relative inline-flex items-center justify-center rounded-full whitespace-nowrap text-sm font-medium transition-all outline-none overflow-hidden",
  {
    variants: {
      variant: {
        filled: "bg-primary-main hover:bg-primary-dark text-white dark:bg-dark-primary-main dark:text-dark-primary-contrastText dark:hover:bg-dark-primary-dark",
        tonal: "bg-primary-container text-primary-onContainer hover:shadow-md dark:bg-dark-primary-container dark:text-dark-primary-onContainer",
        outlined: "border border-outline-main bg-transparent text-primary-main hover:bg-black/5 dark:text-dark-primary-main dark:hover:bg-white/10 dark:border-dark-outline-main",
        text: "bg-transparent text-primary-main hover:bg-black/5 dark:text-dark-primary-main dark:hover:bg-white/10",
        elevated: "bg-surface-main text-primary-main shadow-md hover:shadow-lg dark:bg-dark-surface-container dark:text-dark-primary-main",
        fab: "bg-primary-container text-primary-onContainer rounded-full shadow-lg hover:shadow-xl dark:bg-dark-primary-container dark:text-dark-primary-onContainer",
      },
      size: {
        sm: "min-h-9 px-3 py-1 text-xs gap-2",
        md: "min-h-10 px-6 py-2.5 gap-2",
        lg: "min-h-12 px-8 py-3 gap-3",
        icon: "h-10 w-10 p-2",
        fab: "h-14 w-14 p-4",
        fabSmall: "h-10 w-10 p-2",
        fabLarge: "h-24 w-24 p-6",
      },
      fullWidth: {
        true: "w-full",
      },
      withIcon: {
        true: "inline-flex items-center justify-center",
      }
    },
    defaultVariants: {
      variant: "filled",
      size: "md",
      fullWidth: false,
      withIcon: false,
    },
    compoundVariants: [
      {
        variant: "filled",
        className: `${elevation.level1} hover:${elevation.level2}`,
      },
      {
        variant: "tonal",
        className: `${elevation.level0} hover:${elevation.level1}`,
      },
      {
        variant: "elevated",
        className: `${elevation.level1} hover:${elevation.level2}`,
      },
      {
        variant: "fab",
        className: `${elevation.level3} hover:${elevation.level4}`,
      },
    ],
  }
);

// Material Design 3 State Layer - simulates the ripple effect
const StateLayer = ({ x, y, size }: { x: number; y: number; size: number }) => {
  return (
    <span
      className="absolute bg-current opacity-10 rounded-full animate-ripple pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        transform: "translate(-50%, -50%) scale(0)",
      }}
    />
  );
};

export interface MaterialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof materialButtonVariants> {
  asChild?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const MaterialButton = React.forwardRef<HTMLButtonElement, MaterialButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth, 
    withIcon,
    asChild = false, 
    startIcon, 
    endIcon,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    const [stateLayers, setStateLayers] = React.useState<{ x: number; y: number; size: number; id: number }[]>([]);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    
    const combinedRef = (node: HTMLButtonElement) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
      buttonRef.current = node;
    };
    
    // Create the state layer (ripple effect)
    const handleStateLayer = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const size = Math.max(rect.width, rect.height) * 2.5;
      const id = Date.now();
      
      setStateLayers([...stateLayers, { x, y, size, id }]);
      
      setTimeout(() => {
        setStateLayers((layers) => layers.filter((layer) => layer.id !== id));
      }, 650); // Match animation duration
    };

    // Determine if we should show start/end icons
    const hasStartIcon = startIcon !== undefined;
    const hasEndIcon = endIcon !== undefined;
    const effectiveWithIcon = withIcon || hasStartIcon || hasEndIcon;

    return (
      <Comp
        ref={combinedRef}
        className={cn(materialButtonVariants({ 
          variant, 
          size, 
          fullWidth, 
          withIcon: effectiveWithIcon,
          className 
        }))}
        onMouseDown={handleStateLayer}
        {...props}
      >
        {stateLayers.map((layer) => (
          <StateLayer key={layer.id} x={layer.x} y={layer.y} size={layer.size} />
        ))}
        {hasStartIcon && <span className="inline-flex shrink-0">{startIcon}</span>}
        {props.children}
        {hasEndIcon && <span className="inline-flex shrink-0">{endIcon}</span>}
      </Comp>
    );
  }
);

MaterialButton.displayName = "MaterialButton";

export { MaterialButton, materialButtonVariants }; 