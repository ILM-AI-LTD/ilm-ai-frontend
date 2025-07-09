"use client";

import ChatbotWidget from "@/components/global/CustomChatbotWidget";
import { usePaper } from "@/context/PaperContext";
import GoalsCompletion from "@/feature/students/chapters-stream/components/GoalsCompletion";
import { useGoals } from "@/feature/students/chapters-stream/hooks/useGoals";
import { useParams } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import GoalsCompletionSkeleton from "@/feature/students/chapters-stream/components/GoalsCompletionSkeleton";
import Test from "@/feature/students/chapters-stream/components/Test";

export default function Page() {
  const { subject, chapter, slug } = useParams();
  const { selectedPaper } = usePaper();
  const paper = selectedPaper === "paper1" ? 1 : 2;
  const board = "AQA";

  const { data, isLoading, isError, error } = useGoals({
    board,
    subject: subject as string,
    paper: Number(paper),
    topic: chapter as string,
    subtopic: slug as string,
  });

  return (
    <div className="flex flex-row size-full px-10 py-4">
      <div className="flex-1 basis-3/4">
        {/* reserved for main content */}
        <Test></Test>
      </div>

      <div className="flex flex-col items-end w-1/4">
        {isLoading && <GoalsCompletionSkeleton />}

        {isError && (
          <Alert variant="destructive">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>
              {(error as Error)?.message || "Failed to load goals."}
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !isError && data?.data?.goals && (
          <GoalsCompletion
            chapter={chapter as string}
            subChapters={slug as string}
            goals={data.data.goals.map((goal: any, index: number) => ({
              id: index + 1,
              title: goal.goal_name,
              isCompleted: goal.is_completed,
            }))}
          />
        )}
      </div>

      <ChatbotWidget
        position="bottom-right"
        size="small"
        placeholder="Ask what's on your mind"
        offset={{ x: 40, y: 20 }}
      />
    </div>
  );
}
