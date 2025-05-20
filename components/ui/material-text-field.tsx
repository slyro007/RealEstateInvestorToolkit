import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const materialTextFieldVariants = cva(
  "relative w-full font-sans",
  {
    variants: {
      variant: {
        filled: "",
        outlined: "",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      fullWidth: {
        true: "w-full",
      },
      error: {
        true: "",
      },
      disabled: {
        true: "opacity-60 cursor-not-allowed",
      }
    },
    defaultVariants: {
      variant: "outlined",
      size: "md",
      fullWidth: true,
      error: false,
      disabled: false,
    },
  }
);

export interface MaterialTextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "disabled"> & 
  VariantProps<typeof materialTextFieldVariants> {
  label?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const MaterialTextField = React.forwardRef<HTMLInputElement, MaterialTextFieldProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth, 
    error, 
    disabled,
    label, 
    helperText, 
    startIcon, 
    endIcon, 
    type = "text",
    id,
    ...props 
  }, ref) => {
    const [focused, setFocused] = React.useState(false);
    const [filled, setFilled] = React.useState(!!props.value || !!props.defaultValue);
    const inputId = id || React.useId();
    
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!disabled) {
        setFocused(true);
        props.onFocus?.(e);
      }
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      props.onBlur?.(e);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilled(!!e.target.value);
      props.onChange?.(e);
    };
    
    const getContainerStyles = () => {
      const base = "transition-all duration-200";
      
      if (variant === "filled") {
        return cn(
          base,
          "bg-surface-containerLow dark:bg-dark-surface-containerLow rounded-t-md overflow-hidden",
          focused && !disabled && "bg-surface-containerHigh dark:bg-dark-surface-containerHigh",
          error && !disabled && "bg-error-container/20 dark:bg-dark-error-container/20",
          disabled && "bg-surface-container/60 dark:bg-dark-surface-container/60"
        );
      }
      
      // Outlined variant (default)
      return cn(
        base,
        "border rounded-md bg-surface-main dark:bg-dark-surface-main overflow-hidden",
        !error && !disabled && !focused && "border-outline-main dark:border-dark-outline-main",
        focused && !error && !disabled && "border-primary-main dark:border-dark-primary-main border-2",
        error && !disabled && "border-error-main dark:border-dark-error-main border-2",
        disabled && "border-outline-main/40 dark:border-dark-outline-main/40"
      );
    };
    
    const getLabelStyles = () => {
      const base = "absolute pointer-events-none transition-all duration-200";
      
      if (variant === "filled") {
        return cn(
          base,
          "left-3",
          (focused || filled) ? "text-xs top-2" : "text-base top-4",
          focused && !error && !disabled && "text-primary-main dark:text-dark-primary-main",
          error && !disabled && "text-error-main dark:text-dark-error-main",
          disabled && "text-text-disabled dark:text-dark-text-disabled"
        );
      }
      
      // Outlined variant (default)
      return cn(
        base,
        "bg-surface-main dark:bg-dark-surface-main px-1",
        (focused || filled) ? "-top-2 text-xs left-2 z-10" : "top-1/2 -translate-y-1/2 left-3 text-base",
        focused && !error && !disabled && "text-primary-main dark:text-dark-primary-main",
        error && !disabled && "text-error-main dark:text-dark-error-main",
        disabled && "text-text-disabled dark:text-dark-text-disabled"
      );
    };
    
    const getInputWrapperStyles = () => {
      const base = "flex items-center gap-2";
      
      if (variant === "filled") {
        return cn(
          base,
          "px-3 pt-6 pb-2"
        );
      }
      
      // Outlined variant (default)
      return cn(
        base,
        "px-3 py-3",
        label && "pt-2 pb-2"
      );
    };
    
    const getInputStyles = () => {
      const base = "bg-transparent outline-none flex-1 placeholder:text-text-secondary/70";
      
      if (variant === "filled") {
        return cn(
          base,
          "border-b-2",
          !error && !disabled && !focused && "border-outline-main dark:border-dark-outline-main",
          focused && !error && !disabled && "border-primary-main dark:border-dark-primary-main",
          error && !disabled && "border-error-main dark:border-dark-error-main",
          disabled && "border-outline-main/40 dark:border-dark-outline-main/40 text-text-disabled dark:text-dark-text-disabled"
        );
      }
      
      return cn(
        base,
        disabled && "text-text-disabled dark:text-dark-text-disabled"
      );
    };
    
    const getHelperTextStyles = () => {
      return cn(
        "text-xs mt-1 ml-1 min-h-[1.25rem]",
        error && !disabled ? "text-error-main dark:text-dark-error-main" : "text-text-secondary dark:text-dark-text-secondary",
        disabled && "text-text-disabled dark:text-dark-text-disabled"
      );
    };
    
    const getIconStyles = () => {
      return cn(
        "text-text-secondary flex items-center justify-center",
        focused && !error && !disabled && "text-primary-main dark:text-dark-primary-main",
        error && !disabled && "text-error-main dark:text-dark-error-main",
        disabled && "text-text-disabled dark:text-dark-text-disabled"
      );
    };

    return (
      <div className={cn(materialTextFieldVariants({ variant, size, fullWidth, error, disabled, className }))}>
        <div className={getContainerStyles()}>
          {label && (
            <label htmlFor={inputId} className={getLabelStyles()}>
              {label}
            </label>
          )}
          <div className={getInputWrapperStyles()}>
            {startIcon && <span className={getIconStyles()}>{startIcon}</span>}
            <input
              id={inputId}
              ref={ref}
              type={type}
              disabled={disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              className={getInputStyles()}
              {...props}
            />
            {endIcon && <span className={getIconStyles()}>{endIcon}</span>}
          </div>
        </div>
        <div className={getHelperTextStyles()}>
          {helperText}
        </div>
      </div>
    );
  }
);

MaterialTextField.displayName = "MaterialTextField";

export { MaterialTextField, materialTextFieldVariants }; 