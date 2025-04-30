import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

export interface FeatureCardProps {
  index: number;
  title: string;
  description: string;
  imgSrc: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ index, title, description, imgSrc }) => (
  <Card className='bg-secondary-bg-color border-0 p-5 md:p-8'>
    <CardHeader className='inline-flex items-center justify-between px-0'>
      <p className='text-brand-color opacity-20 text-8xl font-bold'>{index+1}</p>
      <Image
        src={`/${imgSrc}`}
        height={120}
        width={120}
        alt={imgSrc}
      />
      <div className='w-12 hidden md:block'></div>
    </CardHeader>

    <CardTitle className='text-[28px] font-semibold text-white'>
      {title}
    </CardTitle>

    <CardDescription className='text-lg font-normal text-white'>
      {description}
    </CardDescription>
  </Card>
);