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
  variant?: "outline" | "default" | "link" | "destructive" | "secondary" | "ghost" | null | undefined;
  active?: boolean;
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
  active = true,
  ...rest
}) => {

  const buttonVariant = icon && !variant ? "outline" : (variant || "default");

  return (
    <Button
      disabled={disabled}
      className={cn(`rounded-3xl cursor-pointer border-none text-white hover:text-white ${active ? "bg-brand-color hover:bg-brand-color/90 shadow-[0px_6px_0px_0px_#004F6E] " : "bg-primary-bg-color hover:bg-primary-bg-color/70 shadow-[0px_6px_0px_0px_#373C4E]"}`, className)}
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


