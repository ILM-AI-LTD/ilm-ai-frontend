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
  <Card className=" bg-gradient-to-b from-[#0F172A] border-3 border-[#1B2130]s p-6">
    <CardHeader className="inline-flex items-center justify-between px-0">
      <Image
        src={`${imgSrc}`}
        height={80}
        width={80}
        alt={imgSrc}
        className="w-[60px] h-[60px] 2xl:w-[80px] 2xl:h-[80px]"
      />
      <p className="text-brand-color opacity-20 text-7xl font-bold">
        {index + 1}
      </p>
    </CardHeader>

    <CardTitle className="text-[28px] font-semibold text-white">
      {title}
    </CardTitle>

    <CardDescription className="text-lg font-normal text-white">
      {description}
    </CardDescription>
  </Card>
);
