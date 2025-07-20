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
import { useMarkGoalCompleted } from '@/feature/students/chapters-stream/hooks/useMarkGoalComplete';
import { CheckCircle, XCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';

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

  // *** FIX: Completion tracking with persistent refs ***
  const setCompletionStatusRef = useRef<Record<number, boolean>>({});
  const [setCompletionStatus, setSetCompletionStatus] = useState<Record<number, boolean>>({});
  const [totalSets, setTotalSets] = useState<number>(0);

  // *** FIX: Use refs for completion flags to prevent them from being reset ***
  const allQuestionsCompletedRef = useRef<boolean>(false);
  const shouldMarkGoalCompletedRef = useRef<boolean>(false);
  const [allQuestionsCompleted, setAllQuestionsCompleted] = useState<boolean>(false);
  const [shouldMarkGoalCompleted, setShouldMarkGoalCompleted] = useState<boolean>(false);

  const { mutate: evaluateAnswer, isPending: isEvaluating } = useEvaluateAnswer();
  const { mutate: markGoalCompleted, isPending: isMarkingCompleted } = useMarkGoalCompleted();

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

  const updateSetCompletion = useCallback((setIndex: number, isCorrect: boolean) => {
    if (isCorrect) {
      console.log(`*** Marking set ${setIndex} as completed ***`);
      const newStatus = {
        ...setCompletionStatusRef.current,
        [setIndex]: true
      };
      setCompletionStatusRef.current = newStatus;
      setSetCompletionStatus(newStatus);
      console.log('*** Updated completion status:', newStatus);
    }
  }, []);

  const checkIfAllSetsCompleted = useCallback((currentStatus: Record<number, boolean>, totalSetsCount: number) => {
    console.log('*** Immediate check - totalSets:', totalSetsCount, 'currentStatus:', currentStatus);

    if (totalSetsCount === 0) return false;

    let completedCount = 0;
    for (let i = 0; i < totalSetsCount; i++) {
      if (currentStatus[i] === true) {
        completedCount++;
      }
    }

    const result = completedCount === totalSetsCount;
    console.log(`*** Immediate check result: ${completedCount}/${totalSetsCount} = ${result} ***`);
    return result;
  }, []);

  const handleEvaluateAnswer = (selectedOption: string, questionData: any, onTryAgain: () => void, onMoveNext: () => void, currentSetIndex: number, totalSetsCount: number) => {
    if (!selectedGoal) return;

    setCurrentQuestion({ data: questionData, onTryAgain, onMoveNext, setIndex: currentSetIndex });

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

          console.log(`*** Answer evaluation: setIndex=${currentSetIndex}, isCorrect=${isCorrect} ***`);

          // *** FIX: Update completion status and check immediately ***
          if (isCorrect) {
            const newStatus = {
              ...setCompletionStatusRef.current,
              [currentSetIndex]: true
            };
            setCompletionStatusRef.current = newStatus;
            setSetCompletionStatus(newStatus);

            console.log('*** Updated completion status:', newStatus);
            console.log('*** Total sets:', totalSetsCount);

            // *** FIX: Check if all sets are completed immediately ***
            let completedCount = 0;
            for (let i = 0; i < totalSetsCount; i++) {
              if (newStatus[i] === true) {
                completedCount++;
              }
            }

            console.log(`*** Completion check: ${completedCount}/${totalSetsCount} ***`);

            if (completedCount === totalSetsCount) {
              console.log('*** All sets completed! Calling goal completion API immediately ***');

              // *** FIX: Call goal completion API immediately ***
              markGoalCompleted({
                board,
                subject: subject as string,
                paper,
                topic: chapter as string,
                subtopic: slug as string,
                goalName: selectedGoal.title
              }, {
                onSuccess: () => {
                  console.log('*** Goal marked as completed successfully ***');
                  setAllQuestionsCompleted(true);
                  setShouldMarkGoalCompleted(true);
                },
                onError: (error: any) => {
                  console.error('Failed to mark goal as completed:', error);
                  setAllQuestionsCompleted(true);
                  setShouldMarkGoalCompleted(false);
                }
              });
            }
          }

          setShowEvaluationButtons(true);
        },
        onError: (err) => {
          console.error('Failed to evaluate answer', err);
          const isCorrect = selectedOption === questionData.answer;
          setEvaluationResult({
            isCorrect,
            feedback: "Unable to get feedback from server"
          });

          // *** FIX: Same logic for error case ***
          if (isCorrect) {
            const newStatus = {
              ...setCompletionStatusRef.current,
              [currentSetIndex]: true
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
              console.log('*** All sets completed! Calling goal completion API immediately (error case) ***');

              markGoalCompleted({
                board,
                subject: subject as string,
                paper,
                topic: chapter as string,
                subtopic: slug as string,
                goalName: selectedGoal.title
              }, {
                onSuccess: () => {
                  console.log('*** Goal marked as completed successfully ***');
                  setAllQuestionsCompleted(true);
                  setShouldMarkGoalCompleted(true);
                },
                onError: (error: any) => {
                  console.error('Failed to mark goal as completed:', error);
                  setAllQuestionsCompleted(true);
                  setShouldMarkGoalCompleted(false);
                }
              });
            }
          }

          setShowEvaluationButtons(true);
        },
      }
    );
  };

  const handleTryAgain = () => {
    // *** FIX: Check ref instead of state ***
    if (allQuestionsCompletedRef.current) {
      console.log('*** All questions completed - ignoring try again ***');
      return;
    }

    setEvaluationResult(null);
    setShowEvaluationButtons(false);
    if (currentQuestion?.onTryAgain) {
      currentQuestion.onTryAgain();
    }
  };

  const handleMoveNext = () => {
    console.log('*** handleMoveNext called ***');
    console.log('*** allQuestionsCompleted:', allQuestionsCompleted);

    setEvaluationResult(null);
    setShowEvaluationButtons(false);

    if (allQuestionsCompleted) {
      console.log('*** All questions completed - starting next goal ***');
      finishAndStartNextGoal();
    } else {
      console.log('*** Moving to next question ***');
      if (currentQuestion?.onMoveNext) {
        currentQuestion.onMoveNext();
      }
    }
  };

  const finishAndStartNextGoal = () => {
    console.log('*** Finishing current goal and starting next ***');
    console.log('*** Current selectedGoalId:', selectedGoalId);

    const currentGoalIndex = goals.findIndex(g => g.id === selectedGoalId);
    const nextGoal = goals[currentGoalIndex + 1];

    console.log('*** Current goal index:', currentGoalIndex);
    console.log('*** Next goal:', nextGoal);

    if (nextGoal) {
      console.log('*** Moving to next goal:', nextGoal.title, 'ID:', nextGoal.id);

      // *** FIX: DON'T update selectedGoalId here ***
      // setSelectedGoalId(nextGoal.id); // REMOVE THIS LINE

      // Reset completion state
      allQuestionsCompletedRef.current = false;
      shouldMarkGoalCompletedRef.current = false;
      setCurrentQuestion(null);
      setAllQuestionsCompleted(false);
      setShouldMarkGoalCompleted(false);

      setCompletionStatusRef.current = {};
      setSetCompletionStatus({});

      // *** FIX: Pass the next goal info to MainContent ***
      if ((window as any).triggerNextGoal) {
        (window as any).triggerNextGoal(nextGoal);
      }
    } else {
      console.log('*** All goals completed! ***');
    }
  };

  // *** FIX: Updated to set both refs and state ***
  const handleAllQuestionsCompleted = (totalSetsFromQuestions?: number) => {
    console.log('*** All questions completed callback received ***');
    console.log('*** Current completion status at time of completion:', setCompletionStatusRef.current);
    console.log('*** Total sets passed from MainContent:', totalSetsFromQuestions);
    console.log('*** Total sets state at time of completion:', totalSets);

    const actualTotalSets = totalSetsFromQuestions || totalSets || 0;
    console.log('*** Using total sets for completion check:', actualTotalSets);

    const shouldComplete = checkIfAllSetsCompleted(setCompletionStatusRef.current, actualTotalSets);
    console.log('*** Should mark goal as completed?', shouldComplete);

    // *** FIX: Set both refs and state ***
    allQuestionsCompletedRef.current = true;
    shouldMarkGoalCompletedRef.current = shouldComplete;
    setAllQuestionsCompleted(true);
    setShouldMarkGoalCompleted(shouldComplete);

    console.log('*** Flags set - allQuestionsCompletedRef:', allQuestionsCompletedRef.current);
    console.log('*** Flags set - shouldMarkGoalCompletedRef:', shouldMarkGoalCompletedRef.current);
  };

  const resetSetCompletion = useCallback(() => {
    console.log('*** Resetting set completion status ***');
    setCompletionStatusRef.current = {};
    setSetCompletionStatus({});
    setTotalSets(0);

    // *** FIX: Reset refs too ***
    allQuestionsCompletedRef.current = false;
    shouldMarkGoalCompletedRef.current = false;
    setAllQuestionsCompleted(false);
    setShouldMarkGoalCompleted(false);
  }, []);

  const areAllSetsCompleted = useCallback(() => {
    return false; // Not used anymore
  }, []);

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
                  isLoading={isMarkingCompleted}
                  className="px-8 py-3 bg-[#049F6C] text-white rounded-lg hover:bg-[#049F6C] transition-colors duration-200 font-medium shadow-[0px_6px_0px_0px_#007851] text-base"
                >
                  {isMarkingCompleted ? 'Processing...' : "Let's Move"}
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
                    isLoading={isMarkingCompleted}
                    className="px-6 py-3 bg-[#049F6C] text-white rounded-lg hover:bg-[#049F6C] transition-colors duration-200 font-medium shadow-[0px_6px_0px_0px_#007851] text-base"
                  >
                    {isMarkingCompleted ? 'Processing...' : "Let's Move"}
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
            setCompletionStatus={setCompletionStatus}
            totalSets={totalSets}
            setTotalSets={setTotalSets}
            resetSetCompletion={resetSetCompletion}
            areAllSetsCompleted={areAllSetsCompleted}
            onAllQuestionsCompleted={handleAllQuestionsCompleted}
            setSelectedGoalId={setSelectedGoalId} // *** FIX: Add this prop ***
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