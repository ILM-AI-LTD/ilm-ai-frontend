"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeToggleButtonProps = {
  className?: string;
  size?: "icon" | "sm" | "md" | "lg";
};

const ThemeToggleButton = ({ className, size }: ThemeToggleButtonProps) => {

  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent SSR flicker and hydration mismatch
  if (!mounted) {
    return <Button size="icon" className="rounded-full" />;
  }

  return (
    <Button
      size="icon"
      className={cn(`rounded-full ${resolvedTheme === "dark" ? 'bg-[#212638] hover:bg-[#212638]' : 'bg-[#E8E8E8] hover:bg-[#E8E8E8]'} cursor-pointer`, className)}
      onClick={toggleTheme}
    >
      {resolvedTheme === "dark" ? <MoonIcon color="white" /> : <SunIcon color="black" />}
    </Button>
  );
};

export default ThemeToggleButton;
