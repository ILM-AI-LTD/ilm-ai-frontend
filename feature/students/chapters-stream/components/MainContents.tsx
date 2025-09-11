"use client";

import CustomButton from "@/components/global/CustomButton";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import { useGenerateScript } from "@/feature/students/chapters-stream/hooks/useGenerateScript";
import { useSampleQuestions } from "@/feature/students/chapters-stream/hooks/useSampleQuestions";
import { Play } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import CalloutContentHistory from "./CalloutContentHistory";
import CalloutScriptStream from "./CalloutScriptStream";
import UniversalQuestionComponent from "./UniversalQuestionComponent";

interface Goal {
  id: number;
  title: string;
  goalHistory: any[];
  isCompleted: boolean;
  isStarted: boolean;
}

interface MainContentProps {
  subject: string;
  topic: string;
  subtopic: string;
  paper: number;
  board: string;
  goals: Goal[];
  isLoading: boolean;
  selectedGoalId: number;
  onEvaluateAnswer: (
    selectedOption: string,
    questionData: any,
    onTryAgain: () => void,
    onMoveNext: () => void,
    currentSetIndex: number,
    totalSetsCount: number,
    question_type: string,
    image: Blob | null
  ) => void;
  isEvaluating: boolean;
  evaluationResult?: {
    isCorrect: boolean;
    score?: number;
    feedback?: string;
  } | null;
  showEvaluationButtons?: boolean;
  setCompletionStatus: Record<number, boolean>;
  totalSets: number;
  setTotalSets: (count: number) => void;
  resetSetCompletion: () => void;
  areAllSetsCompleted: () => boolean;
  onAllQuestionsCompleted: (totalSets?: number) => void;
  setSelectedGoalId: (id: number) => void; // *** FIX: Added prop ***
}

const MainContent: React.FC<MainContentProps> = ({
  subject,
  topic,
  subtopic,
  paper,
  board,
  goals,
  isLoading,
  selectedGoalId,
  onEvaluateAnswer,
  isEvaluating,
  evaluationResult,
  // showEvaluationButtons,
  // setCompletionStatus,
  // totalSets,
  setTotalSets,
  resetSetCompletion,
  // areAllSetsCompleted,
  onAllQuestionsCompleted,
  setSelectedGoalId,
}) => {
  const allNotStarted = goals.every((g) => !g.isStarted);
  const selectedGoal = goals.find((g) => g.id === selectedGoalId);

  const { mutate: generateScriptMutation, isPending: loadingScript } =
    useGenerateScript();
  const { mutate: fetchQuestions, isPending: loadingQuestions } =
    useSampleQuestions();

  const [scriptData, setScriptData] = useState<string>("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [questionsMap, setQuestionsMap] = useState<Record<string, any>>({});
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isStreamingNextGoal, setIsStreamingNextGoal] = useState(false);
  const [streamingKey, setStreamingKey] = useState(0);
  const [pendingNextGoal, setPendingNextGoal] = useState<any>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    scriptData,
    currentSetIndex,
    currentQuestionIndex,
    questionsMap,
    showNextButton,
  ]);

  const currentQuestions = selectedGoal
    ? questionsMap[selectedGoal.title]
    : null;

  const handleGenerateScript = () => {
    const firstGoal = goals[0];
    if (!firstGoal) return;

    generateScriptMutation(
      {
        board,
        subject,
        paper,
        topic,
        subtopic,
        goal: firstGoal.title,
      },
      {
        onSuccess: (res) => {
          setScriptData(res.data);
          setStreamingKey((prev) => prev + 1);
        },
        onError: (err) => {
          console.error("Script generation failed", err);
        },
      }
    );
  };

  const handleFetchQuestions = () => {
    if (!selectedGoal) return;

    fetchQuestions(
      {
        board,
        subject,
        paper,
        topic,
        subtopic,
        goal: selectedGoal.title,
      },
      {
        onSuccess: (res) => {
          setQuestionsMap((prev) => ({
            ...prev,
            [selectedGoal.title]: res.data,
          }));
          setShowNextButton(false);
          setCurrentSetIndex(0);
          setCurrentQuestionIndex(0);

          const totalSetsCount = res.data?.questions?.length || 0;
          setTotalSets(totalSetsCount);
          resetSetCompletion();
        },
        onError: (err) => {
          console.error("Failed to load questions", err);
        },
      }
    );
  };

  const handleEvaluateAnswer = (
    selectedOption: string,
    question_type: string,
    image: Blob | null
  ) => {
    if (!selectedGoal || !currentQuestions) return;

    const currentSet = currentQuestions.questions[currentSetIndex];
    const currentQuestion = currentSet.question_list[currentQuestionIndex];

    const totalSetsCount = currentQuestions.questions.length;

    onEvaluateAnswer(
      selectedOption,
      currentQuestion,
      handleTryAgain,
      handleMoveToNextSet,
      currentSetIndex,
      totalSetsCount,
      question_type,
      image
    );
  };

  const handleTryAgain = () => {
    const currentSet = currentQuestions.questions[currentSetIndex];
    if (currentQuestionIndex < currentSet.question_list.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleMoveToNextSet();
    }
  };

  const handleMoveToNextSet = () => {
    if (currentSetIndex < currentQuestions.questions.length - 1) {
      setCurrentSetIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      const totalSetsFromData = currentQuestions.questions.length;
      onAllQuestionsCompleted(totalSetsFromData);
    }
  };

  useEffect(() => {
    if (
      currentQuestions &&
      currentSetIndex === currentQuestions.questions.length - 1
    ) {
      const totalSetsFromData = currentQuestions.questions.length;
      onAllQuestionsCompleted(totalSetsFromData);
    }
  }, [currentSetIndex, currentQuestions]);

  const startNextGoal = () => {
    if (!pendingNextGoal) {
      return;
    }

    setIsStreamingNextGoal(true);

    generateScriptMutation(
      {
        board,
        subject,
        paper,
        topic,
        subtopic,
        goal: pendingNextGoal.title,
      },
      {
        onSuccess: (res) => {
          setSelectedGoalId(pendingNextGoal.id);
          setQuestionsMap({});
          setScriptData(res.data);
          setShowNextButton(false);
          setIsStreamingNextGoal(false);
          setStreamingKey((prev) => prev + 1);

          resetSetCompletion();
          setCurrentSetIndex(0);
          setCurrentQuestionIndex(0);
        },
        onError: (err) => {
          setIsStreamingNextGoal(false);
        },
      }
    );
  };

  useEffect(() => {
    if (pendingNextGoal) {
      startNextGoal();
      setPendingNextGoal(null);
    }
  }, [pendingNextGoal]);

  const triggerNextGoal = (nextGoalInfo?: any) => {
    if (nextGoalInfo) {
      setPendingNextGoal(nextGoalInfo);
    } else {
      const currentGoalIndex = goals.findIndex((g) => g.id === selectedGoalId);
      const nextGoal = goals[currentGoalIndex + 1];
      if (nextGoal) {
        setPendingNextGoal(nextGoal);
      }
    }
  };

  useEffect(() => {
    (window as any).triggerNextGoal = triggerNextGoal;
    return () => {
      delete (window as any).triggerNextGoal;
    };
  }, [selectedGoalId, goals]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (allNotStarted && !scriptData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        {loadingScript ? (
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
          <button
            className="size-20 bg-primary rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
            onClick={handleGenerateScript}
          >
            <Play size={40} fill="white" className="mx-auto" />
          </button>
        )}
      </div>
    );
  }

  if (isStreamingNextGoal) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-primary">Starting next goal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-start">
      {scriptData && !isStreamingNextGoal ? (
        <div className="pb-8">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <ILMIAssistantv2 height={40} width={40} className="mt-2" />
              <CalloutScriptStream
                key={`goal-${selectedGoalId}-${streamingKey}`}
                title={selectedGoal?.title || "Goal"}
                message={scriptData}
                orientation="left"
                className="grow"
                onStreamEnd={() => setShowNextButton(true)}
              />
            </div>

            {showNextButton && !currentQuestions && (
              <div className="flex justify-end mt-4">
                <CustomButton
                  label="Let's go to question"
                  isLoading={loadingQuestions}
                  onClick={handleFetchQuestions}
                />
              </div>
            )}

            {currentQuestions && (
              <div className="mt-6 w-full">
                <div className="flex flex-row items-start gap-4">
                  <ILMIAssistantv2 height={40} width={40} className="mt-2" />
                  <UniversalQuestionComponent
                    data={currentQuestions}
                    onEvaluate={handleEvaluateAnswer}
                    isEvaluating={isEvaluating}
                    currentSetIndex={currentSetIndex}
                    currentQuestionIndex={currentQuestionIndex}
                    evaluationResult={evaluationResult}
                  />
                </div>
              </div>
            )}
          </div>
          <div ref={bottomRef} />
        </div>
      ) : selectedGoal && selectedGoal.goalHistory.length > 0 ? (
        <div className="pb-8">
          {selectedGoal.goalHistory.map((entry, index) => (
            <div key={index} className="space-y-8">
              <div className="flex items-start gap-4">
                <ILMIAssistantv2 height={40} width={40} className="mt-2" />
                <CalloutContentHistory
                  title={selectedGoal.title}
                  message={
                    typeof entry === "string"
                      ? entry
                      : entry?.message || JSON.stringify(entry, null, 2)
                  }
                  orientation="left"
                  className="w-full"
                />
              </div>
            </div>
          ))}

          {!currentQuestions && (
            <div className="flex justify-end mt-4">
              <CustomButton
                label="Let's go to question"
                onClick={handleFetchQuestions}
                isLoading={loadingQuestions}
              />
            </div>
          )}

          {currentQuestions && (
            <div className="mt-6 w-full">
              <div className="flex flex-row items-start gap-4">
                <ILMIAssistantv2 height={40} width={40} className="mt-2" />
                <UniversalQuestionComponent
                  data={currentQuestions}
                  onEvaluate={handleEvaluateAnswer}
                  isEvaluating={isEvaluating}
                  currentSetIndex={currentSetIndex}
                  currentQuestionIndex={currentQuestionIndex}
                  evaluationResult={evaluationResult}
                />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted">
            Select an available goal to see its content.
          </p>
        </div>
      )}
    </div>
  );
};

export default MainContent;
