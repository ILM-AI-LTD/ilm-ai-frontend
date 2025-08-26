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
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Circle,
  // RotateCcw,
  XCircle,
} from "lucide-react";
// import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DescriptiveQuestionComponent from "./DescriptiveQuestionComponent";
import { useMathEvaluateAnswer } from "@/feature/students/math-question/hooks/useMathEvaluateAnswer";

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

  // const handleAnswerChange = (field, value) => {
  //   setUserAnswers((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  // const handleSubmitStep = () => {
  //   // Mock evaluation - replace with your API call
  //   const isCorrect = Math.random() > 0.3; // 70% chance of being correct for demo
  //   setStepStatus(isCorrect ? "correct" : "incorrect");
  // };

  // const handleNextStep = () => {
  //   if (currentStep < currentQuestion?.stepCount) {
  //     setCurrentStep((prev) => prev + 1);
  //     setStepStatus("pending");
  //     setUserAnswers({});
  //     setShowHint(false);
  //   } else {
  //     // Move to next question
  //     if (currentQuestionIndex < questions.length - 1) {
  //       setCurrentQuestionIndex((prev) => prev + 1);
  //       setCurrentStep(1);
  //       setStepStatus("pending");
  //       setUserAnswers({});
  //       setShowHint(false);
  //     }
  //   }
  // };

  // const handleTryAgain = () => {
  //   setStepStatus("pending");
  //   setUserAnswers({});
  // };

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

  const DynamicMathRenderer = dynamic(() => import("./markdown"), {
    ssr: false,
    loading: () => <div>Loading math...</div>,
  });

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
    // <div className="flex flex-col w-full h-full">
    //   <div className="flex flex-col md:flex-row w-full flex-1 mt-2 gap-4 md:gap-0">
    //     <div className="md:hidden flex flex-row justify-end relative overflow-visible">
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <CustomButton label="Goals" active={false} />
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent
    //           align="end"
    //           side="bottom"
    //           sideOffset={8}
    //           avoidCollisions={true}
    //           collisionPadding={16}
    //           className="p-0 rounded-2xl"
    //         >
    //           <GoalsCompletion
    //             chapter={chapter as string}
    //             subChapters={slug as string}
    //             goals={goals}
    //             selectedGoalId={selectedGoalId}
    //             onSelectGoal={setSelectedGoalId}
    //           />
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     </div>
    //     <div className="basis-4/4 md:basis-3/4 md:mr-4">
    //       <MainContent
    //         // subject={subject as string}
    //         subject={"physics"}
    //         // topic={chapter as string}
    //         topic={"energy"}
    //         // subtopic={slug as string}
    //         subtopic={"energy-stores-and-systems"}
    //         paper={1}
    //         board={board}
    //         goals={goals}
    //         isLoading={isLoading}
    //         selectedGoalId={selectedGoalId}
    //         onEvaluateAnswer={handleEvaluateAnswer}
    //         isEvaluating={isEvaluating}
    //         evaluationResult={evaluationResult}
    //         showEvaluationButtons={showEvaluationButtons}
    //         setCompletionStatus={setCompletionStatus}
    //         totalSets={totalSets}
    //         setTotalSets={setTotalSets}
    //         resetSetCompletion={resetSetCompletion}
    //         areAllSetsCompleted={areAllSetsCompleted}
    //         onAllQuestionsCompleted={handleAllQuestionsCompleted}
    //         setSelectedGoalId={setSelectedGoalId}
    //       />
    //     </div>

    //     <div className="hidden md:basis-1/4 md:flex flex-col items-end">
    //       {isLoading && <GoalsCompletionSkeleton />}

    //       {isError && (
    //         <Alert variant="destructive">
    //           <AlertTitle>Something went wrong</AlertTitle>
    //           <AlertDescription>
    //             {(error as Error)?.message || "Failed to load goals."}
    //           </AlertDescription>
    //         </Alert>
    //       )}

    //       {!isLoading && !isError && goals.length > 0 && (
    //         <GoalsCompletion
    //           chapter={chapter as string}
    //           subChapters={slug as string}
    //           goals={goals}
    //           selectedGoalId={selectedGoalId}
    //           onSelectGoal={setSelectedGoalId}
    //         />
    //       )}
    //     </div>

    //     <ChatbotWidget
    //       data={{
    //         board,
    //         subject: subject as string,
    //         paper,
    //         topic: chapter as string,
    //         subtopic: slug as string,
    //       }}
    //       position="bottom-right"
    //       size="small"
    //       placeholder="Ask what's on your mind"
    //       offset={{ x: 30, y: 75 }}
    //     />
    //   </div>

    //   {renderEvaluationFooter()}

    //   {showEvaluationButtons && <div className="h-24" />}
    // </div>
    <div className="min-h-screen text-white">
      <div className="flex">
        {/* Left Section - Mascot */}
        <div className="p-8 flex flex-col items-center justify-start pt-20">
          <div className="mb-6">
            {/* <ILMIAssistantv2 height={40} width={40} className="mt-2" /> */}
            <ILMIAssistantv2
              height={80}
              width={80}
              // className="h-[351px] w-[232px]"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 max-w-5xl">
          <div className="mb-8">
            {/* <div className="border-slate-600 rounded-lg p-6 mb-6"> */}
            <div className=" mb-6">
              <div className=" mb-6">
                <div className=" mb-2">
                  {/* {currentQuestion.questionText} */}
                  <DynamicMathRenderer content={currentQuestion.questionText} />
                </div>
              </div>
              {/* <div className="text-slate-300 mb-4"></div> */}
              <div>
                {attempts.map((attempt, index) => (
                  <Card
                    key={attempt.id}
                    className="border-0 p-0 mb-4"
                    //   className={` p-0
                    //   ${
                    //     attempt.is_finished === false
                    //       ? "border-red-500 bg-red-50/5"
                    //       : ""
                    //   }
                    //   ${
                    //     attempt.is_finished === true
                    //       ? "border-green-500 bg-green-50/5"
                    //       : ""
                    //   }
                    // `}
                  >
                    <CardContent className="px-0">
                      <div>
                        {/* <h3 className="font-semibold text-blue-400 mb-2">
                          Step {attempt.currentStep} - Attempt {index + 1}
                        </h3> */}

                        {/* Show evaluation result if this attempt has been evaluated */}
                        {attempt.evaluation && (
                          <div
                            className={`mb-4 p-3 rounded-lg border ${
                              attempt.is_finished
                                ? "border-green-500 bg-green-900/20"
                                : "border-red-500 bg-red-900/20"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {attempt.is_finished ? (
                                <CheckCircle
                                  className="text-green-400"
                                  size={16}
                                />
                              ) : (
                                <XCircle className="text-red-400" size={16} />
                              )}
                              <span
                                className={`font-medium ${
                                  attempt.is_finished
                                    ? "text-green-400"
                                    : "text-red-400"
                                }`}
                              >
                                {attempt.is_finished ? "Correct!" : "Incorrect"}
                              </span>
                            </div>
                            <p
                              className={`text-sm ${
                                attempt.is_finished
                                  ? "text-green-300"
                                  : "text-red-300"
                              }`}
                            >
                              {attempt.evaluation}
                            </p>
                          </div>
                        )}
                      </div>

                      <div >
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

                          // Disable interaction for previous attempts
                          // disabled={
                          //   index < attempts.length - 1 ||
                          //   attempt.is_finished === true
                          // }
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

        {/* Right Sidebar - Progress */}
        <div className="w-80 h-[75%] p-6 bg-slate-800 border-l border-slate-700 border-r-4">
          <div className="mb-6">
            <h3 className="font-semibold text-white mb-2">Progress Goal</h3>
            <p className="text-slate-400 text-sm">You have 10 Goals</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
              <CheckCircle className="text-green-400" size={20} />
              <div>
                <div className="text-sm font-medium">
                  Linear equations in math
                </div>
                <div className="text-xs text-slate-400">1</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
              <Circle className="text-yellow-400" size={20} />
              <div>
                <div className="text-sm font-medium">Quadratic function</div>
                <div className="text-xs text-slate-400">2</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg opacity-50">
              <Circle className="text-slate-500" size={20} />
              <div>
                <div className="text-sm font-medium">
                  Learn the solutions of quadratic function
                </div>
                <div className="text-xs text-slate-400">3</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg opacity-50">
              <Circle className="text-slate-500" size={20} />
              <div>
                <div className="text-sm font-medium">
                  Identify domain and range of a function
                </div>
                <div className="text-xs text-slate-400">4</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg opacity-50">
              <Circle className="text-slate-500" size={20} />
              <div>
                <div className="text-sm font-medium">
                  Use function notation f(x)
                </div>
                <div className="text-xs text-slate-400">5</div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="text-red-400" size={16} />
              <span className="text-sm font-medium text-red-400">
                Always follow what the
              </span>
            </div>
            <p className="text-xs text-slate-400">question is asking for.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

