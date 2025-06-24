'use client'

import ChatbotWidget from '@/components/global/CustomChatbotWidget';
import GoalsCompletion from '@/feature/students/chapters-stream/components/GoalsCompletion';
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
      isCompleted: true
    },
    {
      id: 3,
      title: "4 ways energy can be transferred",
      isCompleted: false
    },
    {
      id: 4,
      title: "Show how energy converted",
      isCompleted: true
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

      <ChatbotWidget
        position="bottom-right"
        size="small"
        iconColor="#ffffff"
        placeholder="Type your message..."
        offset={{ x: 20, y: 20 }}
      />
    </div>
  );
}