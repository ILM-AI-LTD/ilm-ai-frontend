import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  loaderSizes?: number;
  ref?: React.Ref<HTMLButtonElement>;
  variant?:
  | "outline"
  | "default"
  | "link"
  | "destructive"
  | "secondary"
  | "ghost"
  | null
  | undefined;
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
  const buttonVariant = icon && !variant ? "outline" : variant || "default";

  return (
    <Button
      disabled={disabled}
      // className={cn(
      //   `rounded-3xl cursor-pointer border-none  ${
      //     active
      //       ? "bg-gradient-to-t from-[#004D6C] to-[#006C98] shadow-[0px_6px_0px_0px_#006C98]"
      //       : "bg-secondary-button hover:bg-secondary-button/70 shadow-[0px_6px_0px_0px_##004F6E] text-primary hover:text-primary"
      //   }`,
      //   className
      // )}
      className={cn(
        `rounded-3xl cursor-pointer border-none  ${active
          ? "text-white bg-gradient-to-t from-[#004D6C] to-[#006C98] hover:from-[#018dc4] hover:to-[#018dc4] shadow-[0px_6px_0px_0px_#006C98]"
          : " font-bold text-button-foreground bg-gradient-to-b from-[#E8E8E8] dark:from-[#1D2840] dark:to-[#000000] hover:text-white hover:from-[#018dc4] hover:to-[#018dc4] dark:hover:from-[#018dc4] dark:hover:to-[#018dc4]  shadow-[0px_6px_0px_0px_#004F6E] dark:shadow-[0px_6px_0px_0px_#373C4E] hover:shadow-[0px_6px_0px_0px_#006C98] dark:hover:shadow-[0px_6px_0px_0px_#006C98]"
        }`,
        className
      )}
      variant={buttonVariant}
      {...rest}
      ref={ref}
    >
      <>
        {isLoading ? (
          <Loader2 size={loaderSizes} className="mr-2 animate-spin " />
        ) : (
          icon
        )}
        {label || children}
      </>
    </Button>
  );
};

export default CustomButton;
