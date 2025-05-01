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
  <Card className='bg-secondary-bg-color border-0 p-4 md:p-6 2xl:p-10'>
    <CardHeader className='inline-flex items-center justify-between px-0'>
      <p className='text-brand-color opacity-20 text-[80px] font-bold'>{index + 1}</p>
      <Image
        src={`/${imgSrc}`}
        height={160}
        width={160}
        alt={imgSrc}
        className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] 2xl:w-[160px] 2xl:h-[160px]'
      />
      <div className='w-12'></div>
    </CardHeader>

    <CardTitle className='text-[28px] font-semibold text-white'>
      {title}
    </CardTitle>

    <CardDescription className='text-lg font-normal text-white'>
      {description}
    </CardDescription>
  </Card>
);