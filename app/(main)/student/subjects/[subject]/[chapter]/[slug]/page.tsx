'use client'

import CustomButton from '@/components/global/CustomButton';
import ChatbotWidget from '@/components/global/CustomChatbotWidget';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePaper } from '@/context/PaperContext';
import GoalsCompletion from '@/feature/students/chapters-stream/components/GoalsCompletion';
import GoalsCompletionSkeleton from '@/feature/students/chapters-stream/components/GoalsCompletionSkeleton';
import MainContent from '@/feature/students/chapters-stream/components/MainContents';
import { useEvaluateAnswer } from '@/feature/students/chapters-stream/hooks/useEvaluateAnswer';
import { useGoals } from '@/feature/students/chapters-stream/hooks/useGoals';
import { CheckCircle, XCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface EvaluationResult {
  isCorrect: boolean;
  score?: number;
  feedback?: string;
}

export default function Page() {
  const { subject, chapter, slug } = useParams();
  const { selectedPaper } = usePaper();
  const paper = selectedPaper === 'paper1' ? 1 : 2;
  const board = "AQA";
  const [selectedGoalId, setSelectedGoalId] = useState<number>(1);

  // Evaluation state
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [showEvaluationButtons, setShowEvaluationButtons] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  const { mutate: evaluateAnswer, isPending: isEvaluating } = useEvaluateAnswer();

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

  const selectedGoal = goals.find(g => g.id === selectedGoalId);

  const handleEvaluateAnswer = (selectedOption: string, questionData: any, onTryAgain: () => void, onMoveNext: () => void) => {
    if (!selectedGoal) return;

    setCurrentQuestion({ data: questionData, onTryAgain, onMoveNext });

    evaluateAnswer(
      {
        question: questionData.question,
        student_answer: selectedOption,
        correct_answer: questionData.answer,
      },
      {
        onSuccess: (res) => {
          const isCorrect = res.data?.is_correct ?? (selectedOption === questionData.answer);
          setEvaluationResult({
            isCorrect,
            score: res.data?.score,
            feedback: res.data?.explanation
          });
          setShowEvaluationButtons(true);
        },
        onError: (err) => {
          console.error('Failed to evaluate answer', err);
          const isCorrect = selectedOption === questionData.answer;
          setEvaluationResult({
            isCorrect,
            feedback: "Unable to get feedback from server"
          });
          setShowEvaluationButtons(true);
        },
      }
    );
  };

  const handleTryAgain = () => {
    setEvaluationResult(null);
    setShowEvaluationButtons(false);
    if (currentQuestion?.onTryAgain) {
      currentQuestion.onTryAgain();
    }
  };

  const handleMoveNext = () => {
    setEvaluationResult(null);
    setShowEvaluationButtons(false);
    if (currentQuestion?.onMoveNext) {
      currentQuestion.onMoveNext();
    }
  };

  const renderEvaluationFooter = () => {
    if (!showEvaluationButtons || !evaluationResult) return null;

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50">
        <div className="w- mx-auto px-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {evaluationResult.isCorrect ? (
                <>
                  <CheckCircle className="w-6 h-6 text-[#049F6C]" />
                  <span className="text-[#049F6C] font-semibold text-lg">
                    {
                      evaluationResult.score !== undefined
                        ? `Marks : ${evaluationResult.score} / 5`
                        : 'Correct !'
                    }
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-[#DF1C41]" />
                  <span className="text-[#DF1C41] font-semibold text-lg">
                    {
                      evaluationResult.score !== undefined
                        ? `Marks : ${evaluationResult.score} / 5`
                        : 'Incorrect !'
                    }</span>
                </>
              )}
            </div>

            <div className="flex gap-3">
              {evaluationResult.isCorrect ? (
                <CustomButton
                  onClick={handleMoveNext}
                  className="px-8 py-3 bg-[#049F6C] text-white rounded-lg hover:bg-[#049F6C] transition-colors duration-200 font-medium shadow-[0px_6px_0px_0px_#007851] text-base"
                >
                  Let's Move
                </CustomButton>
              ) : (
                <>
                  <CustomButton
                    onClick={handleTryAgain}
                    className="px-6 py-3 bg-[#DF1C41] text-white rounded-lg hover:bg-[#DF1C41] transition-colors duration-200 font-medium shadow-[0px_6px_0px_0px_#A20825] text-base"
                  >
                    Let's Try Again
                  </CustomButton>
                  <CustomButton
                    onClick={handleMoveNext}
                    className="px-6 py-3 bg-[#049F6C] text-white rounded-lg hover:bg-[#049F6C] transition-colors duration-200 font-medium shadow-[0px_6px_0px_0px_#007851] text-base"
                  >
                    Let's Move
                  </CustomButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row w-full flex-1 mt-2">
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
            onEvaluateAnswer={handleEvaluateAnswer}
            isEvaluating={isEvaluating}
            evaluationResult={evaluationResult}
            showEvaluationButtons={showEvaluationButtons}
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
          offset={{ x: 40, y: 90 }}
        />
      </div>

      {/* Evaluation Footer */}
      {renderEvaluationFooter()}

      {/* Add padding to prevent content from being hidden behind footer */}
      {showEvaluationButtons && <div className="h-24" />}
    </div>
  );
}