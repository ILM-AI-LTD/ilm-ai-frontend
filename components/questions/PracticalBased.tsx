"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Volume2, Play } from "lucide-react";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import CustomButton from "@/components/global/CustomButton";

interface PracticalBasedQuestion {
  id: string;
  text: string;
  videoUrl?: string;
  imageUrl?: string;
  placeholder?: string;
  sampleAnswer?: string; // Optional sample answer for reference
  minWords?: number; // Optional minimum word count
}

interface PracticalBasedProps {
  title: string;
  instructions?: string;
  questions: PracticalBasedQuestion[];
  onComplete: (answers: Record<string, string>) => void;
  isCompleted?: boolean;
  showFeedback?: boolean;
}

const PracticalBased: React.FC<PracticalBasedProps> = ({
  title,
  instructions,
  questions,
  onComplete,
  isCompleted = false,
  showFeedback = false,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSampleAnswer, setShowSampleAnswer] = useState<Record<string, boolean>>({});

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

  const toggleSampleAnswer = (questionId: string) => {
    setShowSampleAnswer(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const meetsMinimumWords = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question?.minWords) return true;
    
    const wordCount = getWordCount(answers[questionId] || "");
    return wordCount >= question.minWords;
  };

  const allQuestionsAnswered = questions.every(q => {
    const answer = answers[q.id] || "";
    return answer.trim().length > 0 && meetsMinimumWords(q.id);
  });

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
              {instructions && (
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {instructions}
                </p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-8">
            {questions.map((question) => (
              <div key={question.id} className="space-y-4">
                {/* Video Player */}
                {question.videoUrl && (
                  <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden border-2 border-border">
                    <video
                      src={question.videoUrl}
                      controls
                      className="w-full h-full object-cover"
                      poster={question.imageUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {/* Image (if no video) */}
                {!question.videoUrl && question.imageUrl && (
                  <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden border-2 border-border">
                    <img
                      src={question.imageUrl}
                      alt="Question visual"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Question Text */}
                <div className="text-base sm:text-lg text-foreground leading-relaxed font-medium">
                  {question.text}
                </div>

                {/* Text Area */}
                <div className="relative">
                  <textarea
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    disabled={isCompleted}
                    placeholder={question.placeholder || "Describe your experimental design, procedure, and analysis ..."}
                    className={`
                      w-full min-h-[200px] p-4 rounded-lg border-2
                      bg-background text-foreground
                      placeholder:text-muted-foreground
                      focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                      disabled:cursor-not-allowed disabled:opacity-70
                      transition-all duration-200 resize-y
                      ${isCompleted ? 'border-border' : 'border-border hover:border-border/80'}
                    `}
                    rows={8}
                  />
                  
                  {/* Word Count */}
                  {question.minWords && (
                    <div className={`
                      absolute bottom-3 right-3 text-xs font-medium px-2 py-1 rounded
                      ${meetsMinimumWords(question.id) 
                        ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20' 
                        : 'text-muted-foreground bg-muted'}
                    `}>
                      {getWordCount(answers[question.id] || "")} / {question.minWords} words
                    </div>
                  )}
                </div>

                {/* Sample Answer (shown after completion if available) */}
                {showFeedback && question.sampleAnswer && (
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleSampleAnswer(question.id)}
                      className="text-sm font-medium text-primary hover:underline focus:outline-none"
                    >
                      {showSampleAnswer[question.id] ? "Hide Sample Answer" : "View Sample Answer"}
                    </button>
                    
                    {showSampleAnswer[question.id] && (
                      <div className="bg-muted/50 rounded-lg p-4 border border-border">
                        <div className="text-sm font-semibold text-foreground mb-2">
                          Sample Answer:
                        </div>
                        <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                          {question.sampleAnswer}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Feedback Message */}
                {showFeedback && !question.sampleAnswer && (
                  <div className="text-sm text-foreground/70 bg-muted/50 rounded-lg p-3 border border-border">
                    <span className="font-medium">Note: </span>
                    <span>Your answer has been submitted for review.</span>
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

export default PracticalBased;



