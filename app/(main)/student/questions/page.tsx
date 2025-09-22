"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import FillInTheBlanks from "@/components/questions/FillInTheBlanks";
import GapFillWithWordBank from "@/components/questions/GapFillWithWordBank";
import CustomButton from "@/components/global/CustomButton";


const fillInTheBlanksData = {
  title: "Fill in the blanks",
  instructions: "Fill in the blanks. Fill the correct answers.",
  questions: [
    {
      id: "q1",
      text: "The distance between the particles in steam is `blank` the distance between the particles in liquid water.",
      placeholder: "mass",
      correctAnswer: "greater than",
    },
    {
      id: "q2",
      text: "The density of steam is `blank` the density of liquid water.",
      placeholder: "acceleration",
      correctAnswer: "less than",
    },
  ],
};

const gapFillData = {
  title: "Gap-fill with Word Bank",
  instructions: "Gap-fill with Word Bank. Choose answers from the box.",
  wordBank: ["greater than", "less than", "the same as"],
  questions: [
    {
      id: "q1",
      text: "The distance between the particles in steam is `blank` the distance between the particles in liquid water.",
      correctAnswer: "greater than",
    },
    {
      id: "q2",
      text: "The density of steam is `blank` the density of liquid water.",
      correctAnswer: "less than",
    },
  ],
};

export default function QuestionsPage() {
  const [currentQuestionType, setCurrentQuestionType] = useState<"fill-blanks" | "word-bank">("fill-blanks");
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  const handleQuestionComplete = (answers: Record<string, string>) => {
    setUserAnswers(answers);
    setIsCompleted(true);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionType === "fill-blanks") {
      setCurrentQuestionType("word-bank");
    } else {
      // Reset for next question or go to next step
      setCurrentQuestionType("fill-blanks");
    }
    setIsCompleted(false);
    setShowFeedback(false);
    setUserAnswers({});
  };


  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-background">
      <div className="flex flex-col w-full flex-1 gap-4 p-2 sm:p-4">
        {/* Main Content Area */}
        <div className="flex-1 max-w-4xl mx-auto">
          <Card className="border-0 bg-transparent shadow-none">
            <CardContent className="p-4 sm:p-6">
              {currentQuestionType === "fill-blanks" ? (
                <FillInTheBlanks
                  title={fillInTheBlanksData.title}
                  instructions={fillInTheBlanksData.instructions}
                  questions={fillInTheBlanksData.questions}
                  onComplete={handleQuestionComplete}
                  isCompleted={isCompleted}
                  showFeedback={showFeedback}
                />
              ) : (
                <GapFillWithWordBank
                  title={gapFillData.title}
                  instructions={gapFillData.instructions}
                  wordBank={gapFillData.wordBank}
                  questions={gapFillData.questions}
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
                    label={currentQuestionType === "fill-blanks" ? "Next Question" : "Let's move"}
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
