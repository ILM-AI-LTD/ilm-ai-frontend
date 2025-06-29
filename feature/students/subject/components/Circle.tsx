import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { forwardRef } from "react";

export const Circle = forwardRef<HTMLDivElement, {
    className?: string;
    children?: React.ReactNode;
    hidden?: boolean;
    top?: boolean;
    title?: string;
    href?: string;
    progress?: number;
    index?: number;
}>(({ className, children, hidden, top = false, title, href = "/#", progress = 0, index = 0 }, ref) => {
    // const borderFill = `conic-gradient(#005E83 ${progress * 3.6}deg, #929292 0deg)`;
    const isFirst = index === 0;
    const progressColor = isFirst ? "#91C83C" : "#005E83";
    const baseColor = isFirst ? "#005E83" : "#929292";

    const borderFill = `conic-gradient(${progressColor} ${progress * 3.6}deg, ${baseColor} 0deg)`;

    return (
        <Link href={href}>
            <div
                className={cn(
                    `relative size-32 z-1 flex flex-row justify-center items-center rounded-full`,
                    isFirst ? "p-[14px]" : "p-[6px]",
                    !isFirst && "shadow-[0px_11px_1px_rgba(0,_46,_56,_1)]",
                    className
                )}
                style={{
                    background: borderFill,
                }}
            >
                <div
                    ref={ref}
                    className="relative flex size-full items-center justify-center rounded-full  bg-background transition-transform"
                >
                    {children}
                    {!hidden && (
                        <div
                            className={cn(
                                "absolute size-2.5 rounded-full bg-muted-foreground",
                                top ? "-top-4" : "-right-4"
                            )}
                        />
                    )}
                </div>
            </div>
            {title && (
                <p className="text-foreground text-center w-32 text-lg font-bold mt-4 mx-auto">{title}</p>
            )}
        </Link>
    );
});

Circle.displayName = "Circle";