"use client";

import CustomButton from "@/components/global/CustomButton";
import ChatbotWidget from "@/components/global/CustomChatbotWidget";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePaper } from "@/context/PaperContext";
import GoalsCompletion from "@/feature/students/chapters-stream/components/GoalsCompletion";
import GoalsCompletionSkeleton from "@/feature/students/chapters-stream/components/GoalsCompletionSkeleton";
import MainContent from "@/feature/students/chapters-stream/components/MainContents";
import { useEvaluateAnswer } from "@/feature/students/chapters-stream/hooks/useEvaluateAnswer";
import { useGoals } from "@/feature/students/chapters-stream/hooks/useGoals";
import { useMarkGoalCompleted } from "@/feature/students/chapters-stream/hooks/useMarkGoalComplete";
import { CheckCircle, XCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";

interface EvaluationResult {
  isCorrect: boolean;
  score?: number;
  feedback?: string;
}

export default function Page() {
  const { subject, chapter, slug } = useParams();
  const { selectedPaper } = usePaper();
  const paper = selectedPaper === "paper1" ? 1 : 2;
  const board = "AQA";
  const [selectedGoalId, setSelectedGoalId] = useState<number>(1);

  const [evaluationResult, setEvaluationResult] =
    useState<EvaluationResult | null>(null);
  const [showEvaluationButtons, setShowEvaluationButtons] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  const setCompletionStatusRef = useRef<Record<number, boolean>>({});
  const [setCompletionStatus, setSetCompletionStatus] = useState<
    Record<number, boolean>
  >({});
  const [totalSets, setTotalSets] = useState<number>(0);

  const allQuestionsCompletedRef = useRef<boolean>(false);
  const shouldMarkGoalCompletedRef = useRef<boolean>(false);
  const [allQuestionsCompleted, setAllQuestionsCompleted] =
    useState<boolean>(false);
  const [shouldMarkGoalCompleted, setShouldMarkGoalCompleted] =
    useState<boolean>(false);

  const { mutate: evaluateAnswer, isPending: isEvaluating } =
    useEvaluateAnswer();
  const { mutate: markGoalCompleted, isPending: isMarkingCompleted } =
    useMarkGoalCompleted();

  const { data, isLoading, isError, error } = useGoals({
    board,
    subject: subject as string,
    paper,
    topic: chapter as string,
    subtopic: slug as string,
  });

  const goals =
    !isLoading && !isError && data?.data?.goals
      ? data.data.goals.map((goal: any, index: number) => ({
          id: index + 1,
          title: goal.goal_name,
          goalHistory: goal.script_history,
          isCompleted: goal.is_completed,
          isStarted: goal.is_started,
          hasHistory:
            Array.isArray(goal.script_history) &&
            goal.script_history.length > 0,
        }))
      : [];

  const selectedGoal = goals.find((g) => g.id === selectedGoalId);


  const checkIfAllSetsCompleted = useCallback(
    (currentStatus: Record<number, boolean>, totalSetsCount: number) => {
      if (totalSetsCount === 0) return false;

      let completedCount = 0;
      for (let i = 0; i < totalSetsCount; i++) {
        if (currentStatus[i] === true) {
          completedCount++;
        }
      }

      const result = completedCount === totalSetsCount;
      return result;
    },
    []
  );

  const handleEvaluateAnswer = (
    selectedOption: string,
    questionData: any,
    onTryAgain: () => void,
    onMoveNext: () => void,
    currentSetIndex: number,
    totalSetsCount: number,
    question_type: string,
    image: Blob | null
  ) => {

    if (!selectedGoal) return;

    setCurrentQuestion({
      data: questionData,
      onTryAgain,
      onMoveNext,
      setIndex: currentSetIndex,
    });

    evaluateAnswer(
      {
        question: questionData.question,
        student_answer: selectedOption,
        correct_answer: questionData.answer,
        question_type: question_type,
        image: image,
      },
      {
        onSuccess: (res) => {
          const isCorrect =
            res.data?.is_correct ?? selectedOption === questionData.answer;
          setEvaluationResult({
            isCorrect,
            score: res.data?.score,
            feedback: res.data?.explanation,
          });

          if (isCorrect) {
            const newStatus = {
              ...setCompletionStatusRef.current,
              [currentSetIndex]: true,
            };
            setCompletionStatusRef.current = newStatus;
            setSetCompletionStatus(newStatus);

            let completedCount = 0;
            for (let i = 0; i < totalSetsCount; i++) {
              if (newStatus[i] === true) {
                completedCount++;
              }
            }

            if (completedCount === totalSetsCount) {
              markGoalCompleted(
                {
                  board,
                  subject: subject as string,
                  paper,
                  topic: chapter as string,
                  subtopic: slug as string,
                  goalName: selectedGoal.title,
                },
                {
                  onSuccess: () => {
                    setAllQuestionsCompleted(true);
                    setShouldMarkGoalCompleted(true);
                  },
                  onError: () => {
                    setAllQuestionsCompleted(true);
                    setShouldMarkGoalCompleted(false);
                  },
                }
              );
            }
          }

          setShowEvaluationButtons(true);
        },
        onError: () => {
          const isCorrect = selectedOption === questionData.answer;
          setEvaluationResult({
            isCorrect,
            feedback: "Unable to get feedback from server",
          });

          if (isCorrect) {
            const newStatus = {
              ...setCompletionStatusRef.current,
              [currentSetIndex]: true,
            };
            setCompletionStatusRef.current = newStatus;
            setSetCompletionStatus(newStatus);

            let completedCount = 0;
            for (let i = 0; i < totalSetsCount; i++) {
              if (newStatus[i] === true) {
                completedCount++;
              }
            }

            if (completedCount === totalSetsCount) {
              markGoalCompleted(
                {
                  board,
                  subject: subject as string,
                  paper,
                  topic: chapter as string,
                  subtopic: slug as string,
                  goalName: selectedGoal.title,
                },
                {
                  onSuccess: () => {
                    setAllQuestionsCompleted(true);
                    setShouldMarkGoalCompleted(true);
                  },
                  onError: () => {
                    setAllQuestionsCompleted(true);
                    setShouldMarkGoalCompleted(false);
                  },
                }
              );
            }
          }

          setShowEvaluationButtons(true);
        },
      }
    );
  };

  const handleTryAgain = () => {
    if (allQuestionsCompletedRef.current) {
      return;
    }

    setEvaluationResult(null);
    setShowEvaluationButtons(false);
    if (currentQuestion?.onTryAgain) {
      currentQuestion.onTryAgain();
    }
  };

  const handleMoveNext = () => {
    setEvaluationResult(null);
    setShowEvaluationButtons(false);

    if (allQuestionsCompleted) {
      finishAndStartNextGoal();
    } else {
      if (currentQuestion?.onMoveNext) {
        currentQuestion.onMoveNext();
      }
    }
  };

  const finishAndStartNextGoal = () => {
    const currentGoalIndex = goals.findIndex((g) => g.id === selectedGoalId);
    const nextGoal = goals[currentGoalIndex + 1];

    if (nextGoal) {
      allQuestionsCompletedRef.current = false;
      shouldMarkGoalCompletedRef.current = false;
      setCurrentQuestion(null);
      setAllQuestionsCompleted(false);
      setShouldMarkGoalCompleted(false);

      setCompletionStatusRef.current = {};
      setSetCompletionStatus({});

      if ((window as any).triggerNextGoal) {
        (window as any).triggerNextGoal(nextGoal);
      }
    } else {
      console.log("*** All goals completed! ***");
    }
  };

  const handleAllQuestionsCompleted = (totalSetsFromQuestions?: number) => {
    const actualTotalSets = totalSetsFromQuestions || totalSets || 0;

    const shouldComplete = checkIfAllSetsCompleted(
      setCompletionStatusRef.current,
      actualTotalSets
    );

    allQuestionsCompletedRef.current = true;
    shouldMarkGoalCompletedRef.current = shouldComplete;
    setAllQuestionsCompleted(true);
    setShouldMarkGoalCompleted(shouldComplete);
  };

  const resetSetCompletion = useCallback(() => {
    setCompletionStatusRef.current = {};
    setSetCompletionStatus({});
    setTotalSets(0);

    allQuestionsCompletedRef.current = false;
    shouldMarkGoalCompletedRef.current = false;
    setAllQuestionsCompleted(false);
    setShouldMarkGoalCompleted(false);
  }, []);

  const areAllSetsCompleted = useCallback(() => {
    return false;
  }, []);

  const renderEvaluationFooter = () => {
    if (!showEvaluationButtons || !evaluationResult) return null;

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-[99999]">
        <div className="w-full mx-auto px-4 md:px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {evaluationResult.isCorrect ? (
                <>
                  <CheckCircle className="w-6 h-6 text-[#049F6C]" />
                  <span className="text-[#049F6C] font-semibold text-lg">
                    {evaluationResult.score !== undefined
                      ? `Marks : ${evaluationResult.score} / 5`
                      : "Correct !"}
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-[#DF1C41]" />
                  <span className="text-[#DF1C41] font-semibold text-lg">
                    {evaluationResult.score !== undefined
                      ? `Marks : ${evaluationResult.score} / 5`
                      : "Incorrect !"}
                  </span>
                </>
              )}
            </div>

            <div className="flex gap-3">
              {evaluationResult.isCorrect ? (
                <CustomButton
                  onClick={handleMoveNext}
                  isLoading={isMarkingCompleted}
                  className="px-4 md:px-8 py-3 bg-[#049F6C] text-white rounded-lg hover:bg-[#049F6C] transition-colors duration-200 font-medium shadow-[0px_6px_0px_0px_#007851] text-base"
                >
                  {isMarkingCompleted ? "Processing..." : "Let's Move"}
                </CustomButton>
              ) : (
                <>
                  <CustomButton
                    onClick={handleTryAgain}
                    className="px-4 md:px-8 py-3 bg-[#DF1C41] text-white rounded-lg hover:bg-[#DF1C41] transition-colors duration-200 font-medium shadow-[0px_6px_0px_0px_#A20825] text-base"
                  >
                    Try Again
                  </CustomButton>
                  <CustomButton
                    onClick={handleMoveNext}
                    isLoading={isMarkingCompleted}
                    className="px-4 md:px-8 py-3 bg-[#049F6C] text-white rounded-lg hover:bg-[#049F6C] transition-colors duration-200 font-medium shadow-[0px_6px_0px_0px_#007851] text-base"
                  >
                    {isMarkingCompleted ? "Processing..." : "Let's Move"}
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
      <div className="flex flex-col md:flex-row w-full flex-1 mt-2 gap-4 md:gap-0">
        <div className="md:hidden flex flex-row justify-end relative overflow-visible">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CustomButton label="Goals" active={false} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="bottom"
              sideOffset={8}
              avoidCollisions={true}
              collisionPadding={16}
              className="p-0 rounded-2xl"
            >
              <GoalsCompletion
                chapter={chapter as string}
                subChapters={slug as string}
                goals={goals}
                selectedGoalId={selectedGoalId}
                onSelectGoal={setSelectedGoalId}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="basis-4/4 md:basis-3/4 md:mr-4">
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
            setCompletionStatus={setCompletionStatus}
            totalSets={totalSets}
            setTotalSets={setTotalSets}
            resetSetCompletion={resetSetCompletion}
            areAllSetsCompleted={areAllSetsCompleted}
            onAllQuestionsCompleted={handleAllQuestionsCompleted}
            setSelectedGoalId={setSelectedGoalId}
          />
        </div>

        <div className="hidden md:basis-1/4 md:flex flex-col items-end">
          {isLoading && <GoalsCompletionSkeleton />}

          {isError && (
            <Alert variant="destructive">
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>
                {(error as Error)?.message || "Failed to load goals."}
              </AlertDescription>
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
          data={{
            board,
            subject: subject as string,
            paper,
            topic: chapter as string,
            subtopic: slug as string,
          }}
          position="bottom-right"
          size="small"
          placeholder="Ask what's on your mind"
          offset={{ x: 30, y: 75 }}
        />
      </div>

      {renderEvaluationFooter()}

      {showEvaluationButtons && <div className="h-24" />}
    </div>
  );
}
