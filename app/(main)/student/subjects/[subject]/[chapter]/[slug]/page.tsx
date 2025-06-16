'use client'

import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area'; // Import from shadcn components
import GoalsCompletion from '@/feature/students/chapters-stream/components/GoalsCompletion';
import { Check } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function Page() {
  const { subject, chapter, slug } = useParams();

  const goals = [
    {
      id: 1,
      title: "State the law of conservation of energy",
      isCompleted: true
    },
    {
      id: 2,
      title: "8 main types of energy",
      isCompleted: false
    },
    {
      id: 3,
      title: "4 ways energy can be transferred",
      isCompleted: false
    },
    {
      id: 4,
      title: "Show how energy converted",
      isCompleted: false
    },
  ];

  return (
    <div className="flex flex-row size-full p-4">
      <div className='flex-1 basis-3/4'>

      </div>

      <div className='flex flex-col items-center basis-1/4'>
        <GoalsCompletion
          chapter={chapter as string}
          subChapters={slug as string}
          goals={goals}
        />
      </div>
    </div>
  );
}