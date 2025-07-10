import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export interface GettingStartedCardProps {
  index: number;
  title: string;
  description: string;
  imgSrc: string;
}

export const GettingStartedCard: React.FC<GettingStartedCardProps> = ({
  index,
  title,
  description,
  imgSrc,
}) => (
  <Card className=" bg-gradient-to-b from-[#ffffff] dark:from-[#0F172A] border-3 border-bg-border p-6 shadow-lg">
    <CardHeader className="inline-flex items-center justify-between px-0 py-0">
      <Image
        src={`${imgSrc}`}
        height={80}
        width={80}
        alt={imgSrc}
        className="w-[60px] h-[60px] 2xl:w-[80px] 2xl:h-[80px]"
      />
      <h1 className="font-khand text-[#006C98] opacity-20 text-8xl ">
        {index + 1}
      </h1>
    </CardHeader>

    <CardTitle className="text-[24px] font-semibold text-foreground">
      {title}
    </CardTitle>

    <CardDescription className="text-lg font-normal text-foreground-subtitle">
      {description}
    </CardDescription>
  </Card>
);
