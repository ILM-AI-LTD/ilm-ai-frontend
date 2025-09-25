"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Lightbulb } from "lucide-react";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import CustomButton from "@/components/global/CustomButton";

interface OddOneOutOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

interface OddOneOutQuestion {
  id: string;
  text: string;
  options: OddOneOutOption[];
  correctAnswer: string; // ID of the correct (odd one out) option
  explanation?: string;
}

interface OddOneOutProps {
  title: string;
  instructions: string;
  questions: OddOneOutQuestion[];
  onComplete: (answers: Record<string, string>) => void;
  isCompleted?: boolean;
  showFeedback?: boolean;
}

const OddOneOut: React.FC<OddOneOutProps> = ({
  title,
  instructions,
  questions,
  onComplete,
  isCompleted = false,
  showFeedback = false,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAnswerChange = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmit = () => {
    onComplete(answers);
    setShowSuccess(true);
  };

  const isAnswerCorrect = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    return question && answers[questionId] === question.correctAnswer;
  };

  const getOptionStyle = (questionId: string, optionId: string) => {
    const isSelected = answers[questionId] === optionId;
    const isCorrect = showFeedback && isAnswerCorrect(questionId);
    const isWrong = showFeedback && !isCorrect && isSelected;
    
    let baseStyle = "w-full p-4 rounded-lg border-2 font-medium text-sm transition-all duration-200 cursor-pointer hover:scale-[1.02] text-left";
    
    if (isCompleted) {
      baseStyle += " cursor-not-allowed opacity-70";
    }
    
    if (isCorrect && isSelected) {
      baseStyle += " border-green-500 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300";
    } else if (isWrong) {
      baseStyle += " border-red-500 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300";
    } else if (isSelected) {
      baseStyle += " border-primary bg-primary/10 text-primary";
    } else {
      baseStyle += " border-border bg-background text-foreground hover:bg-accent";
    }
    
    return baseStyle;
  };

  const getOptionLabel = (index: number) => {
    return String.fromCharCode(97 + index); // a, b, c, d, etc.
  };

  return (
    <div className="w-full">
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <ILMIAssistantv2 height={40} width={40} className="flex-shrink-0" />
            <div>
              <CardTitle className="text-2xl font-bold text-foreground mb-2">
                {title}
              </CardTitle>
              <p className="text-foreground/80 text-sm leading-relaxed">
                {instructions}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="space-y-4">
                <div className="text-base sm:text-lg text-foreground leading-relaxed font-medium">
                  {question.text}
                </div>
                
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <div
                      key={option.id}
                      onClick={() => handleAnswerChange(question.id, option.id)}
                      className={getOptionStyle(question.id, option.id)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-sm mt-0.5 min-w-[20px]">
                          {getOptionLabel(index)})
                        </span>
                        <span className="flex-1">{option.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show correct answer if feedback is enabled and answer is wrong */}
                {showFeedback && !isAnswerCorrect(question.id) && answers[question.id] && (
                  <div className="text-sm text-foreground/70 bg-muted/50 rounded-lg p-3 border border-border">
                    <span className="font-medium">Correct answer: </span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {getOptionLabel(question.options.findIndex(opt => opt.id === question.correctAnswer))}) {question.options.find(opt => opt.id === question.correctAnswer)?.text}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {showSuccess && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle size={20} />
              <span className="font-semibold text-foreground">Good!</span>
            </div>
          )}

          {/* Explanation */}
          {questions[0]?.explanation && showFeedback && (
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={16} className="text-blue-500" />
                <span className="font-semibold text-blue-600 dark:text-blue-400">Explanation</span>
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed">
                {questions[0].explanation}
              </p>
            </div>
          )}

          {!isCompleted && (
            <div className="flex justify-end">
              <CustomButton
                onClick={handleSubmit}
                icon={<ArrowRight size={16} />}
                label="Let's move"
                active={Object.keys(answers).length === questions.length}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OddOneOut;
