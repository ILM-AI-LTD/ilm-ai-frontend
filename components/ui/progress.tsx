"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value: number
  color?: string,
  hoverColor?: string
}

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

function CustomProgress({
  className,
  value,
  color = "indigo",
  // hoverColor = "blue",
  ...props
}: ProgressProps) {
  const colorClass = `bg-${color}-500`
  // const hoverColorClass = hoverColor ? `group-hover:bg-${hoverColor}-950` : ''

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-gray-200 dark:bg-gray-700 relative h-2 w-2/4 overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn("h-full transition-all", colorClass)}
        style={{
          width: `${value}%`
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress, CustomProgress }
