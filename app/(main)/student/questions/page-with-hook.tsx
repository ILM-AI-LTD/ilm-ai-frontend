"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";
import FillInTheBlanks from "@/components/questions/FillInTheBlanks";
import GapFillWithWordBank from "@/components/questions/GapFillWithWordBank";
import CustomButton from "@/components/global/CustomButton";
import { useQuestions } from "@/feature/students/questions/hooks/useQuestions";
import { type FillInTheBlanksData, type GapFillData } from "@/feature/students/questions/services/questionsService";

export default function QuestionsPageWithHook() {
  // Use the custom hook - you can pass parameters like subjectId and difficulty
  const {
    questionSets,
    currentQuestionIndex,
    currentQuestion,
    isLoading,
    error,
    isCompleted,
    showFeedback,
    userAnswers,
    handleQuestionComplete,
    handleNextQuestion,
    handleRetry,
  } = useQuestions({
    // subjectId: 'physics', // Uncomment to filter by subject
    // difficulty: 'medium', // Uncomment to filter by difficulty
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-full min-h-screen bg-background">
        <div className="flex flex-col w-full flex-1 gap-4 p-2 sm:p-4">
          <div className="flex-1 max-w-4xl mx-auto flex items-center justify-center">
            <Card className="border-0 bg-transparent shadow-none">
              <CardContent className="p-8 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-foreground/80">Loading questions...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col w-full h-full min-h-screen bg-background">
        <div className="flex flex-col w-full flex-1 gap-4 p-2 sm:p-4">
          <div className="flex-1 max-w-4xl mx-auto flex items-center justify-center">
            <Card className="border-0 bg-transparent shadow-none">
              <CardContent className="p-8 text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <CustomButton
                  onClick={handleRetry}
                  label="Try Again"
                  active={true}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // No questions available
  if (!currentQuestion) {
    return (
      <div className="flex flex-col w-full h-full min-h-screen bg-background">
        <div className="flex flex-col w-full flex-1 gap-4 p-2 sm:p-4">
          <div className="flex-1 max-w-4xl mx-auto flex items-center justify-center">
            <Card className="border-0 bg-transparent shadow-none">
              <CardContent className="p-8 text-center">
                <p className="text-foreground/80">No questions available.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-background">
      <div className="flex flex-col w-full flex-1 gap-4 p-2 sm:p-4">
        {/* Progress indicator */}
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-foreground/70">
              Question {currentQuestionIndex + 1} of {questionSets.length}
            </span>
            <span className="text-sm text-foreground/70">
              {currentQuestion.type === "fill-blanks" ? "Fill in the Blanks" : "Gap Fill with Word Bank"}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questionSets.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 max-w-4xl mx-auto">
          <Card className="border-0 bg-transparent shadow-none">
            <CardContent className="p-4 sm:p-6">
              {currentQuestion.type === "fill-blanks" ? (
                <FillInTheBlanks
                  title={(currentQuestion.data as FillInTheBlanksData).title}
                  instructions={(currentQuestion.data as FillInTheBlanksData).instructions}
                  questions={(currentQuestion.data as FillInTheBlanksData).questions}
                  onComplete={handleQuestionComplete}
                  isCompleted={isCompleted}
                  showFeedback={showFeedback}
                />
              ) : (
                <GapFillWithWordBank
                  title={(currentQuestion.data as GapFillData).title}
                  instructions={(currentQuestion.data as GapFillData).instructions}
                  wordBank={(currentQuestion.data as GapFillData).wordBank}
                  questions={(currentQuestion.data as GapFillData).questions}
                  onComplete={handleQuestionComplete}
                  isCompleted={isCompleted}
                  showFeedback={showFeedback}
                />
              )}

              {/* Navigation Button */}
              {isCompleted && (
                <div className="mt-6 flex justify-center">
                  <CustomButton
                    onClick={handleNextQuestion}
                    icon={<ArrowRight size={16} />}
                    label={currentQuestionIndex < questionSets.length - 1 ? "Next Question" : "Complete"}
                    active={true}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
