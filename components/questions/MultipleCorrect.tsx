"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Volume2, Check } from "lucide-react";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import CustomButton from "@/components/global/CustomButton";

interface MultipleCorrectOption {
  id: string;
  text: string;
}

interface MultipleCorrectQuestion {
  id: string;
  text: string;
  options: MultipleCorrectOption[];
  correctAnswers: string[]; // Array of correct option IDs
  explanation?: string;
}

interface MultipleCorrectProps {
  title: string;
  instructions: string;
  questions: MultipleCorrectQuestion[];
  onComplete: (answers: Record<string, string[]>) => void;
  isCompleted?: boolean;
  showFeedback?: boolean;
}

const MultipleCorrect: React.FC<MultipleCorrectProps> = ({
  title,
  instructions,
  questions,
  onComplete,
  isCompleted = false,
  showFeedback = false,
}) => {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckboxChange = (questionId: string, optionId: string) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      const isSelected = currentAnswers.includes(optionId);
      
      if (isSelected) {
        // Remove the option
        return {
          ...prev,
          [questionId]: currentAnswers.filter(id => id !== optionId)
        };
      } else {
        // Add the option
        return {
          ...prev,
          [questionId]: [...currentAnswers, optionId]
        };
      }
    });
  };

  const handleSubmit = () => {
    onComplete(answers);
    setShowSuccess(true);
  };

  const isOptionSelected = (questionId: string, optionId: string) => {
    return answers[questionId]?.includes(optionId) || false;
  };

  const isAnswerCorrect = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return false;
    
    const userAnswers = answers[questionId] || [];
    const correctAnswers = question.correctAnswers;
    
    // Check if arrays have same length and same elements
    if (userAnswers.length !== correctAnswers.length) return false;
    
    return correctAnswers.every(ans => userAnswers.includes(ans));
  };

  const isOptionCorrect = (questionId: string, optionId: string) => {
    const question = questions.find(q => q.id === questionId);
    return question?.correctAnswers.includes(optionId) || false;
  };

  const getCheckboxStyle = (questionId: string, optionId: string) => {
    const isSelected = isOptionSelected(questionId, optionId);
    const isCorrect = isOptionCorrect(questionId, optionId);
    
    if (!showFeedback) {
      // Before feedback
      if (isSelected) {
        return "border-primary bg-primary";
      }
      return "border-border bg-background";
    }
    
    // After feedback
    if (isCorrect && isSelected) {
      return "border-green-500 bg-green-500";
    } else if (!isCorrect && isSelected) {
      return "border-red-500 bg-red-500";
    } else if (isCorrect && !isSelected) {
      // Show what should have been selected
      return "border-green-500 bg-green-500/20";
    }
    
    return "border-border bg-background";
  };

  const getOptionStyle = (questionId: string, optionId: string) => {
    const isSelected = isOptionSelected(questionId, optionId);
    const isCorrect = isOptionCorrect(questionId, optionId);
    
    let baseStyle = "w-full p-4 rounded-lg border-2 font-medium text-sm transition-all duration-200 cursor-pointer hover:scale-[1.02] text-left flex items-start gap-3";
    
    if (isCompleted) {
      baseStyle += " cursor-not-allowed opacity-70";
    }
    
    if (!showFeedback) {
      if (isSelected) {
        baseStyle += " border-primary bg-primary/10 text-foreground";
      } else {
        baseStyle += " border-border bg-background text-foreground hover:bg-accent";
      }
    } else {
      // Show feedback
      if (isCorrect && isSelected) {
        baseStyle += " border-green-500 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300";
      } else if (!isCorrect && isSelected) {
        baseStyle += " border-red-500 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300";
      } else if (isCorrect && !isSelected) {
        baseStyle += " border-green-500 bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300";
      } else {
        baseStyle += " border-border bg-background text-foreground";
      }
    }
    
    return baseStyle;
  };

  const allQuestionsAnswered = questions.every(q => 
    answers[q.id] && answers[q.id].length > 0
  );

  return (
    <div className="w-full">
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <ILMIAssistantv2 height={40} width={40} className="flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {title}
                </CardTitle>
                <Volume2 size={20} className="text-foreground/60 cursor-pointer hover:scale-110 transition-transform" />
              </div>
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
                  {question.options.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => !isCompleted && handleCheckboxChange(question.id, option.id)}
                      className={getOptionStyle(question.id, option.id)}
                    >
                      {/* Custom Checkbox */}
                      <div className={`
                        flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center
                        transition-all duration-200 mt-0.5
                        ${getCheckboxStyle(question.id, option.id)}
                      `}>
                        {(isOptionSelected(question.id, option.id) || 
                          (showFeedback && isOptionCorrect(question.id, option.id))) && (
                          <Check size={14} className="text-white" strokeWidth={3} />
                        )}
                      </div>
                      
                      <span className="flex-1">{option.text}</span>
                    </div>
                  ))}
                </div>

                {/* Show explanation if feedback is enabled */}
                {showFeedback && question.explanation && (
                  <div className="text-sm text-foreground/70 bg-muted/50 rounded-lg p-3 border border-border">
                    <span className="font-medium">Note: </span>
                    <span>{question.explanation}</span>
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

          {!isCompleted && (
            <div className="flex justify-end">
              <CustomButton
                onClick={handleSubmit}
                icon={<ArrowRight size={16} />}
                label="Let's move"
                active={allQuestionsAnswered}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MultipleCorrect;



