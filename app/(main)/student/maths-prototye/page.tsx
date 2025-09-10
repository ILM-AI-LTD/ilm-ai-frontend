"use client";

// import CustomButton from "@/components/global/CustomButton";
// import ChatbotWidget from "@/components/global/CustomChatbotWidget";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { usePaper } from "@/context/PaperContext";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
// import GoalsCompletion from "@/feature/students/math-question/components/GoalsCompletion";
// import GoalsCompletionSkeleton from "@/feature/students/math-question/components/GoalsCompletionSkeleton";
// import MainContent from "@/feature/students/math-question/components/MainContents";
// import { useEvaluateAnswer } from "@/feature/students/math-question/hooks/useEvaluateAnswer";
import { useGetMathQuestions } from "@/feature/students/math-question/hooks/useGetMathQuestions";
// import { useGoals } from "@/feature/students/math-question/hooks/useGoals";
// import { useMarkGoalCompleted } from "@/feature/students/math-question/hooks/useMarkGoalComplete";
import { MathFormattedQuestion } from "@/types/student";
import {
  // AlertCircle,
  ArrowRight,
  // CheckCircle,
  // Circle,
  // RotateCcw,
  // XCircle,
} from "lucide-react";
// import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import DescriptiveQuestionComponent from "./DescriptiveQuestionComponent";
import { useMathEvaluateAnswer } from "@/feature/students/math-question/hooks/useMathEvaluateAnswer";
import MarkdownRenderer from "@/feature/students/math-question/components/MarkdownRenderer";
import QuestionsNavbar from "@/feature/students/math-question/components/QuestionsNavbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import CustomButton from "@/components/global/CustomButton";

// interface EvaluationResult {
//   is_finished: boolean;
//   score?: number;
//   feedback?: string;
// }

interface AttemptData {
  id: string;
  currentStep: number;
  hint: string;
  evaluation?: string;
  is_finished?: boolean;
  nextStepCount?: string | number;
}

export default function Page() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  // const [userAnswers, setUserAnswers] = useState({});
  // const [showHint, setShowHint] = useState(false);
  // const [stepStatus, setStepStatus] = useState("pending"); // 'pending', 'correct', 'incorrect'
  const [questions, setQuestions] = useState<MathFormattedQuestion[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState<AttemptData[]>([]);
  const [canProceedToNext, setCanProceedToNext] = useState(false);

  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(
    new Set()
  );

  const { mutate: evaluateAnswer, isPending: isEvaluating } =
    useMathEvaluateAnswer();

  // const { data, isLoading, isError, error } = useGetMathQuestions();
  const { data, isLoading } = useGetMathQuestions();

  useEffect(() => {
    // console.log(isLoading ? "loading----------" : data);
    setQuestions(data?.data || []);
    setLoading(isLoading);
  }, [data, isLoading]);

  const currentQuestion = questions[currentQuestionIndex];

  // Initialize first attempt when question changes
  useEffect(() => {
    if (currentQuestion) {
      setAttempts([
        {
          id: `attempt-${Date.now()}`,
          currentStep: currentStep,
          hint: currentQuestion.hint || "",
        },
      ]);
      setCanProceedToNext(false);
      // setStepStatus("pending");
    }
  }, [currentQuestionIndex, currentQuestion]);

  const handleQuestionSelect = (questionIndex: number) => {
    setCurrentQuestionIndex(questionIndex);
    setCurrentStep(1);
    setCanProceedToNext(false);
  };

  const handleNextStep = () => {
    if (currentStep < currentQuestion?.stepCount) {
      setCurrentStep((prev) => prev + 1);
      // setStepStatus("pending");
      // setUserAnswers({});
      // setShowHint(false);
      // Reset attempts for new step
      setAttempts([
        {
          id: `attempt-${Date.now()}`,
          currentStep: currentStep + 1,
          hint: currentQuestion.hint || "",
        },
      ]);
      setCanProceedToNext(false);
    } else {
      setCompletedQuestions((prev) => new Set([...prev, currentQuestionIndex]));
      // Move to next question
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setCurrentStep(1);
        // setStepStatus("pending");
        // setUserAnswers({});
        // setShowHint(false);
        setCanProceedToNext(false);
        // Attempts will be reset in the useEffect above
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading questions...</div>
      </div>
    );
  }

  const handleEvaluateAnswer = (image: Blob | null) => {
    console.log(image);

    evaluateAnswer(
      {
        question: currentQuestion.questionText,
        // correctAnswer: currentQuestion.correctAnswer,
        correctAnswer: "",
        currentStepCount: currentQuestion.stepCount.toString(),
        image: image,
      },
      {
        onSuccess: (res) => {
          // console.log("res ---------- ", res);
          const { is_finished, evaluation, hint, nextStepCount } = res.data;

          // Update current attempt with evaluation result
          setAttempts((prevAttempts) => {
            const updatedAttempts = [...prevAttempts];
            const lastAttemptIndex = updatedAttempts.length - 1;

            updatedAttempts[lastAttemptIndex] = {
              ...updatedAttempts[lastAttemptIndex],
              evaluation,
              is_finished,
              nextStepCount,
            };

            return updatedAttempts;
          });

          if (is_finished) {
            setCanProceedToNext(true);
          } else {
            // Add new attempt below with new hint
            setAttempts((prevAttempts) => [
              ...prevAttempts,
              {
                id: `attempt-${Date.now()}`,
                currentStep: Number(nextStepCount) || currentStep,
                hint: hint || "",
              },
            ]);
          }

          // const isCorrect =
          //   res.data?.is_correct ?? selectedOption === questionData.answer;
          // setEvaluationResult({
          //   isCorrect,
          //   score: res.data?.score,
          //   feedback: res.data?.explanation,
          // });

          // if (isCorrect) {
          //   const newStatus = {
          //     ...setCompletionStatusRef.current,
          //     [currentSetIndex]: true,
          //   };
          //   setCompletionStatusRef.current = newStatus;
          //   setSetCompletionStatus(newStatus);

          //   let completedCount = 0;
          //   for (let i = 0; i < totalSetsCount; i++) {
          //     if (newStatus[i] === true) {
          //       completedCount++;
          //     }
          //   }

          //   if (completedCount === totalSetsCount) {
          //     markGoalCompleted(
          //       {
          //         board,
          //         subject: subject as string,
          //         paper,
          //         topic: chapter as string,
          //         subtopic: slug as string,
          //         goalName: selectedGoal.title,
          //       },
          //       {
          //         onSuccess: () => {
          //           setAllQuestionsCompleted(true);
          //           setShouldMarkGoalCompleted(true);
          //         },
          //         onError: (error: any) => {
          //           setAllQuestionsCompleted(true);
          //           setShouldMarkGoalCompleted(false);
          //         },
          //       }
          //     );
          //   }
          // }

          // setShowEvaluationButtons(true);
        },
      }
    );
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col md:flex-row w-full flex-1 mt-2 gap-4 md:gap-0">
        {/* Pop up Question btn for smaller screen */}
        <div className="md:hidden flex flex-row justify-end relative overflow-visible">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CustomButton label="Questions" active={false} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="bottom"
              sideOffset={8}
              avoidCollisions={true}
              collisionPadding={16}
              className="p-0 rounded-2xl z-10"
            >
              <QuestionsNavbar
                questions={questions}
                completedQuestions={completedQuestions}
                currentQuestionIndex={currentQuestionIndex}
                onQuestionSelect={handleQuestionSelect}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Left Side */}
        <div className="basis-4/4 md:basis-3/4 md:mr-4">
          <div className="w-full h-full flex flex-col justify-start">
            <div className="w-full">
              {/* Logo + TLDraw */}
              <div className="flex flex-row items-start gap-4">
                <ILMIAssistantv2 height={60} width={60} className="mt-2" />
                <div className="mb-8 w-full">
                  <div className=" mb-6">
                    <div className=" mb-6">
                      <div className=" mb-2">
                        <MarkdownRenderer
                          content={currentQuestion.questionText}
                        />
                      </div>
                    </div>
                    <div>
                      {attempts.map((attempt, index) => (
                        <Card key={attempt.id} className="border-0 p-0 mb-4">
                          <CardContent className="px-0">
                            <div>
                              <DescriptiveQuestionComponent
                                data={{
                                  ...currentQuestion,
                                  hint: attempt.hint,
                                  evaluation: attempt.evaluation,
                                  is_finished: attempt.is_finished,
                                  stepCount:
                                    Number(attempt.nextStepCount) ||
                                    currentQuestion.stepCount,
                                }}
                                onEvaluate={handleEvaluateAnswer}
                                currentStep={attempt.currentStep}
                                isEvaluating={isEvaluating}
                                index={index}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Show "Next Step" or "Let's Move" button when answer is correct */}
                    {canProceedToNext && (
                      <div className="mt-6 flex justify-center">
                        <Button
                          onClick={handleNextStep}
                          className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                        >
                          {currentStep < currentQuestion?.stepCount
                            ? "Next Step"
                            : "Let's move"}
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Progress */}
        <div className="hidden md:basis-1/4 md:flex flex-col items-end">
          <QuestionsNavbar
            questions={questions}
            completedQuestions={completedQuestions}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionSelect={handleQuestionSelect}
          />
        </div>
      </div>
    </div>
  );
}
