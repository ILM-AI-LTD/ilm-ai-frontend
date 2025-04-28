import React from "react";
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  loaderSizes?: number;
  ref?: React.Ref<HTMLButtonElement>;
  variant?: "outline" | "default" | "link" | "destructive" | "secondary" | "ghost" | null | undefined
}

const CustomButton: React.FC<ButtonProps> = ({
  disabled,
  label,
  icon,
  className,
  children,
  isLoading = false,
  variant,
  loaderSizes = 18,
  ref,
  ...rest
}) => {

  const buttonVariant = icon && !variant ? "outline" : (variant || "default");

  return (
    <Button
      disabled={disabled}
      className={cn("rounded-3xl cursor-pointer", className)}
      variant={buttonVariant}
      {...rest}
      ref={ref}
    >
      <>
        <span>
          {isLoading ? (
            <Loader2 size={loaderSizes} className="mr-2 animate-spin " />
          ) : (
            icon
          )}
        </span>
        {label || children}
      </>
    </Button>
  );
};

export default CustomButton;


