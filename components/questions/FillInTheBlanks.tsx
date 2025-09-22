"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle, ArrowRight } from "lucide-react";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import CustomButton from "@/components/global/CustomButton";

interface FillInTheBlanksProps {
  title: string;
  instructions: string;
  questions: {
    id: string;
    text: string;
    placeholder: string;
    correctAnswer: string;
  }[];
  onComplete: (answers: Record<string, string>) => void;
  isCompleted?: boolean;
  showFeedback?: boolean;
}

const FillInTheBlanks: React.FC<FillInTheBlanksProps> = ({
  title,
  instructions,
  questions,
  onComplete,
  isCompleted = false,
  showFeedback = false,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
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
    return question && answers[questionId]?.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
  };

  const renderQuestionText = (question: typeof questions[0]) => {
    const parts = question.text.split('`');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a blank
        const questionId = question.id;
        const isCorrect = showFeedback && isAnswerCorrect(questionId);
        
        return (
          <span key={index} className="inline-block mx-1">
            <Input
              value={answers[questionId] || ""}
              onChange={(e) => handleAnswerChange(questionId, e.target.value)}
              placeholder={question.placeholder}
              className={`
                inline-block w-24 sm:w-32 h-8 text-center border-b-2 border-dashed border-primary/50 
                bg-transparent focus:border-primary focus:border-solid text-sm
                ${isCorrect ? 'border-green-500 bg-green-100 dark:bg-green-900/20' : ''}
                ${showFeedback && !isCorrect && answers[questionId] ? 'border-red-500 bg-red-100 dark:bg-red-900/20' : ''}
              `}
              disabled={isCompleted}
            />
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
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
              <p className="text-foreground/80 text-sm">
                {instructions}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="text-base sm:text-lg leading-relaxed">
                {renderQuestionText(question)}
              </div>
            ))}
          </div>

          {showSuccess && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle size={20} />
              <span className="font-medium">Good!</span>
            </div>
          )}

          {!isCompleted && (
            <div className="flex justify-end">
              <CustomButton
                onClick={handleSubmit}
                icon={<ArrowRight size={16} />}
                label="Let's move"
                active={true}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FillInTheBlanks;
