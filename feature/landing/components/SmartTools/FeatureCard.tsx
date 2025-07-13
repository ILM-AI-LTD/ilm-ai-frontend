import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export interface FeatureCardProps {
  index: number;
  title: string;
  description: string;
  imgSrc: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  index,
  title,
  description,
  imgSrc,
}) => (
  // <Card className="bg-secondary-bg-color border-3 border-[#1B2130] p-4 md:p-6 2xl:p-10">
  <Card className="bg-gradient-to-t from-[#FFFFFF] dark:from-[#020617] border-3 border-card-border-1 p-4 md:p-6 2xl:p-10 shadow-lg">
    <CardHeader className="inline-flex items-center justify-between px-0">
      <p className="font-khand text-[#006C98] opacity-20 text-9xl">
        {index + 1}
      </p>
      <Image
        src={`${imgSrc}`}
        height={160}
        width={160}
        alt={imgSrc}
        className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] 2xl:w-[160px] 2xl:h-[160px]"
      />
      <div className="w-12"></div>
    </CardHeader>

    <CardTitle className="text-[32px] font-semibold text-foreground">
      {title}
    </CardTitle>

    <CardDescription className="text-lg font-normal text-[#677489]">
      {description}
    </CardDescription>
  </Card>
);
