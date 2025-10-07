"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Volume2 } from "lucide-react";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import CustomButton from "@/components/global/CustomButton";

interface SliderRangeQuestion {
  id: string;
  text: string;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  correctAnswer: number;
  unit?: string; // Optional unit like "PH", "°C", etc.
  tolerance?: number; // Optional tolerance for "close enough" answers
}

interface SliderRangeProps {
  title: string;
  instructions: string;
  questions: SliderRangeQuestion[];
  onComplete: (answers: Record<string, number>) => void;
  isCompleted?: boolean;
  showFeedback?: boolean;
}

const SliderRange: React.FC<SliderRangeProps> = ({
  title,
  instructions,
  questions,
  onComplete,
  isCompleted = false,
  showFeedback = false,
}) => {
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    // Initialize with middle values
    const initial: Record<string, number> = {};
    questions.forEach(q => {
      initial[q.id] = Math.round((q.min + q.max) / 2);
    });
    return initial;
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSliderChange = (questionId: string, value: number) => {
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
    if (!question) return false;
    
    const userAnswer = answers[questionId];
    const tolerance = question.tolerance || 0;
    
    return Math.abs(userAnswer - question.correctAnswer) <= tolerance;
  };

  const getSliderStyle = (questionId: string) => {
    if (!showFeedback) return "";
    
    if (isAnswerCorrect(questionId)) {
      return "accent-green-500";
    } else {
      return "accent-red-500";
    }
  };

  const formatValue = (question: SliderRangeQuestion, value: number) => {
    if (question.unit) {
      return `${question.unit} - ${value}`;
    }
    return value.toString();
  };

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
          <div className="space-y-8">
            {questions.map((question) => (
              <div key={question.id} className="space-y-6">
                <div className="text-base sm:text-lg text-foreground leading-relaxed font-medium text-center">
                  {question.text}
                </div>
                
                {/* Slider Container */}
                <div className="px-4 sm:px-8">
                  <div className="relative">
                    {/* Slider Track with Labels */}
                    <div className="flex justify-between items-center mb-4 text-sm text-foreground/70">
                      <span>{question.min} {question.minLabel ? `(${question.minLabel})` : ""}</span>
                      <span className="text-center font-medium">{formatValue(question, answers[question.id] || question.min)}</span>
                      <span>{question.max} {question.maxLabel ? `(${question.maxLabel})` : ""}</span>
                    </div>

                    {/* Slider Input */}
                    <div className="relative">
                      <input
                        type="range"
                        min={question.min}
                        max={question.max}
                        step={question.step}
                        value={answers[question.id] || question.min}
                        onChange={(e) => handleSliderChange(question.id, Number(e.target.value))}
                        disabled={isCompleted}
                        className={`
                          w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer
                          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                          disabled:cursor-not-allowed disabled:opacity-70
                          ${getSliderStyle(question.id)}
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:w-5
                          [&::-webkit-slider-thumb]:h-5
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-primary
                          [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-webkit-slider-thumb]:border-2
                          [&::-webkit-slider-thumb]:border-background
                          [&::-webkit-slider-thumb]:shadow-md
                          [&::-webkit-slider-thumb]:hover:scale-110
                          [&::-webkit-slider-thumb]:transition-transform
                          [&::-moz-range-thumb]:w-5
                          [&::-moz-range-thumb]:h-5
                          [&::-moz-range-thumb]:rounded-full
                          [&::-moz-range-thumb]:bg-primary
                          [&::-moz-range-thumb]:cursor-pointer
                          [&::-moz-range-thumb]:border-2
                          [&::-moz-range-thumb]:border-background
                          [&::-moz-range-thumb]:shadow-md
                          [&::-moz-range-thumb]:hover:scale-110
                          [&::-moz-range-thumb]:transition-transform
                        `}
                      />
                    </div>
                  </div>

                  {/* Value Display Button */}
                  <div className="flex justify-center mt-6">
                    <div className={`
                      px-6 py-3 rounded-lg font-semibold text-sm
                      transition-all duration-200
                      ${showFeedback && isAnswerCorrect(question.id) 
                        ? "bg-green-500 text-white" 
                        : showFeedback && !isAnswerCorrect(question.id)
                        ? "bg-red-500 text-white"
                        : "bg-primary text-primary-foreground"}
                    `}>
                      {formatValue(question, answers[question.id] || question.min)}
                    </div>
                  </div>

                  {/* Show correct answer if feedback is enabled and answer is wrong */}
                  {showFeedback && !isAnswerCorrect(question.id) && (
                    <div className="text-sm text-foreground/70 bg-muted/50 rounded-lg p-3 border border-border mt-4 text-center">
                      <span className="font-medium">Correct answer: </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {formatValue(question, question.correctAnswer)}
                      </span>
                    </div>
                  )}
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
                active={true}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SliderRange;

