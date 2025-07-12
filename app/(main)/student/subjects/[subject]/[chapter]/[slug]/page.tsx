// ✅ Updated: page.tsx
'use client'

import ChatbotWidget from '@/components/global/CustomChatbotWidget';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePaper } from '@/context/PaperContext';
import GoalsCompletion from '@/feature/students/chapters-stream/components/GoalsCompletion';
import GoalsCompletionSkeleton from '@/feature/students/chapters-stream/components/GoalsCompletionSkeleton';
import MainContent from '@/feature/students/chapters-stream/components/MainContents';
import { useGoals } from '@/feature/students/chapters-stream/hooks/useGoals';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const { subject, chapter, slug } = useParams();
  const { selectedPaper } = usePaper();
  const paper = selectedPaper === 'paper1' ? 1 : 2;
  const board = "AQA";
  const [selectedGoalId, setSelectedGoalId] = useState<number>(1);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGoals({ board, subject: subject as string, paper, topic: chapter as string, subtopic: slug as string });

  const goals = !isLoading && !isError && data?.data?.goals
    ? data.data.goals.map((goal: any, index: number) => ({
      id: index + 1,
      title: goal.goal_name,
      goalHistory: goal.script_history,
      isCompleted: goal.is_completed,
      isStarted: goal.is_started,
      hasHistory: Array.isArray(goal.script_history) && goal.script_history.length > 0
    }))
    : [];



  return (
    <div className="flex flex-row w-full h-full mt-2">
      <div className='basis-3/4 mr-4'>
        <MainContent
          subject={subject as string}
          topic={chapter as string}
          subtopic={slug as string}
          paper={paper}
          board={board}
          goals={goals}
          isLoading={isLoading}
          selectedGoalId={selectedGoalId}
        />
      </div>

      <div className='basis-1/4 flex flex-col items-end'>
        {isLoading && <GoalsCompletionSkeleton />}

        {isError && (
          <Alert variant="destructive">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{(error as Error)?.message || "Failed to load goals."}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !isError && goals.length > 0 && (
          <GoalsCompletion
            chapter={chapter as string}
            subChapters={slug as string}
            goals={goals}
            selectedGoalId={selectedGoalId}
            onSelectGoal={setSelectedGoalId}
          />
        )}
      </div>

      <ChatbotWidget
        data={{ board, subject: subject as string, paper, topic: chapter as string, subtopic: slug as string }}
        position="bottom-right"
        size="small"
        placeholder="Ask what's on your mind"
        offset={{ x: 40, y: 20 }}
      />
    </div>
  );
}
