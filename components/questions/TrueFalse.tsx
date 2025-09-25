"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import CustomButton from "@/components/global/CustomButton";

interface TrueFalseQuestion {
  id: string;
  text: string;
  correctAnswer: boolean;
}

interface TrueFalseProps {
  title: string;
  instructions: string;
  questions: TrueFalseQuestion[];
  onComplete: (answers: Record<string, boolean>) => void;
  isCompleted?: boolean;
  showFeedback?: boolean;
}

const TrueFalse: React.FC<TrueFalseProps> = ({
  title,
  instructions,
  questions,
  onComplete,
  isCompleted = false,
  showFeedback = false,
}) => {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAnswerChange = (questionId: string, value: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
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

  const getButtonStyle = (questionId: string, value: boolean) => {
    const isSelected = answers[questionId] === value;
    const isCorrect = showFeedback && isAnswerCorrect(questionId);
    const isWrong = showFeedback && !isCorrect && isSelected;
    
    if (isCorrect && isSelected) {
      return "bg-green-500 hover:bg-green-600 text-white border-green-500";
    }
    if (isWrong) {
      return "bg-red-500 hover:bg-red-600 text-white border-red-500";
    }
    if (isSelected) {
      return "bg-primary hover:bg-primary/90 text-primary-foreground border-primary";
    }
    return "bg-background hover:bg-accent text-foreground border-border";
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
                
                <div className="flex gap-4 justify-center sm:justify-start">
                  <button
                    onClick={() => handleAnswerChange(question.id, true)}
                    disabled={isCompleted}
                    className={`
                      px-6 sm:px-8 py-3 rounded-lg border-2 font-semibold text-sm sm:text-base
                      transition-all duration-200 min-w-[100px] sm:min-w-[120px]
                      ${getButtonStyle(question.id, true)}
                      ${isCompleted ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:scale-105'}
                      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    `}
                  >
                    True
                  </button>
                  
                  <button
                    onClick={() => handleAnswerChange(question.id, false)}
                    disabled={isCompleted}
                    className={`
                      px-6 sm:px-8 py-3 rounded-lg border-2 font-semibold text-sm sm:text-base
                      transition-all duration-200 min-w-[100px] sm:min-w-[120px]
                      ${getButtonStyle(question.id, false)}
                      ${isCompleted ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:scale-105'}
                      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    `}
                  >
                    False
                  </button>
                </div>

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
                active={Object.keys(answers).length === questions.length}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrueFalse;
