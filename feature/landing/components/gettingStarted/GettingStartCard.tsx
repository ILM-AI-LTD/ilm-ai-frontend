import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

export interface GettingStartedCardProps {
    index: number;
    title: string;
    description: string;
    imgSrc: string;
}

export const GettingStartedCard: React.FC<GettingStartedCardProps> = ({ index, title, description, imgSrc }) => (
    <Card className='bg-primary-bg-color border-0 p-5 md:p-8'>
        <CardHeader className='inline-flex items-center justify-between px-0'>
            <Image
                src={`/${imgSrc}`}
                height={90}
                width={90}
                alt={imgSrc}
            />
            <p className='text-brand-color opacity-20 text-8xl font-bold'>{index + 1}</p>

        </CardHeader>

        <CardTitle className='text-[28px] font-semibold text-white'>
            {title}
        </CardTitle>

        <CardDescription className='text-lg font-normal text-white'>
            {description}
        </CardDescription>
    </Card>
);