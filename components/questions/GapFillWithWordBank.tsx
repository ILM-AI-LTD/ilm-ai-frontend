"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import CustomButton from "@/components/global/CustomButton";

interface GapFillWithWordBankProps {
  title: string;
  instructions: string;
  wordBank: string[];
  questions: {
    id: string;
    text: string;
    correctAnswer: string;
  }[];
  onComplete: (answers: Record<string, string>) => void;
  isCompleted?: boolean;
  showFeedback?: boolean;
}

const GapFillWithWordBank: React.FC<GapFillWithWordBankProps> = ({
  title,
  instructions,
  wordBank,
  questions,
  onComplete,
  isCompleted = false,
  showFeedback = false,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [draggedWord, setDraggedWord] = useState<string>("");
  const [dragOverBlank, setDragOverBlank] = useState<string>("");
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());

  const handleWordSelect = (word: string) => {
    setSelectedWord(word);
  };

  const handleBlankClick = (questionId: string) => {
    if (selectedWord && !answers[questionId]) {
      setAnswers(prev => ({
        ...prev,
        [questionId]: selectedWord
      }));
      setUsedWords(prev => new Set([...prev, selectedWord]));
      setSelectedWord("");
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, word: string) => {
    if (isCompleted || usedWords.has(word)) return;
    setDraggedWord(word);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", word);
  };

  const handleDragEnd = () => {
    setDraggedWord("");
    setDragOverBlank("");
  };

  const handleDragOver = (e: React.DragEvent, questionId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverBlank(questionId);
  };

  const handleDragLeave = () => {
    setDragOverBlank("");
  };

  const handleDrop = (e: React.DragEvent, questionId: string) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("text/plain");
    
    if (word && !answers[questionId] && !usedWords.has(word)) {
      setAnswers(prev => ({
        ...prev,
        [questionId]: word
      }));
      setUsedWords(prev => new Set([...prev, word]));
    }
    
    setDraggedWord("");
    setDragOverBlank("");
  };

  const handleRemoveAnswer = (questionId: string) => {
    const word = answers[questionId];
    if (word) {
      setAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[questionId];
        return newAnswers;
      });
      setUsedWords(prev => {
        const newUsedWords = new Set(prev);
        newUsedWords.delete(word);
        return newUsedWords;
      });
    }
  };

  const handleSubmit = () => {
    onComplete(answers);
    setShowSuccess(true);
  };

  // Reset function to clear all answers
  const handleReset = () => {
    setAnswers({});
    setUsedWords(new Set());
    setSelectedWord("");
    setShowSuccess(false);
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
        const answer = answers[questionId];
        const isCorrect = showFeedback && isAnswerCorrect(questionId);
        const isDragOver = dragOverBlank === questionId;
        
        return (
          <span key={index} className="inline-block mx-1">
            <div
              onClick={() => handleBlankClick(questionId)}
              onDragOver={(e) => handleDragOver(e, questionId)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, questionId)}
              className={`
                inline-block min-w-24 sm:min-w-32 h-8 px-2 sm:px-3 py-1 text-center border-b-2 border-dashed border-primary/50 
                bg-transparent hover:border-primary hover:border-solid transition-all duration-200 text-sm text-foreground font-medium
                ${answer ? 'border-solid border-primary bg-primary/10' : ''}
                ${isCorrect ? 'border-green-500 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' : ''}
                ${showFeedback && !isCorrect && answer ? 'border-red-500 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300' : ''}
                ${isDragOver ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/20 scale-105' : ''}
                ${isCompleted || answer ? 'cursor-default' : 'cursor-pointer'}
                rounded-sm relative group
              `}
            >
              {answer ? (
                <div className="flex items-center justify-between gap-1">
                  <span className="flex-1 truncate">{answer}</span>
                  {!isCompleted && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveAnswer(questionId);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>
              ) : (
                <span className="text-foreground/70">
                  {isDragOver ? "Drop here" : "Click to fill"}
                </span>
              )}
            </div>
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="w-full">
      <style jsx>{`
        .drag-over {
          animation: pulse 1s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .dragging {
          transform: rotate(5deg);
          z-index: 1000;
        }
      `}</style>
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
          {/* Word Bank */}
          <div className="bg-muted/50 rounded-lg p-3 sm:p-4 border border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">Choose answers from the box:</h4>
            <div className="flex flex-wrap gap-2">
              {wordBank.map((word, index) => {
                const isUsed = usedWords.has(word);
                const isDragging = draggedWord === word;
                
                return (
                  <div
                    key={index}
                    draggable={!isCompleted && !isUsed}
                    onDragStart={(e) => handleDragStart(e, word)}
                    onDragEnd={handleDragEnd}
                    className={`
                      px-3 sm:px-4 py-2 rounded-lg border border-border bg-background 
                      transition-all duration-200 text-xs sm:text-sm font-semibold text-foreground
                      ${selectedWord === word ? 'ring-2 ring-primary bg-primary/10' : ''}
                      ${isUsed ? 'opacity-50 cursor-not-allowed bg-muted' : 'cursor-grab hover:bg-accent'}
                      ${isDragging ? 'opacity-50 scale-95' : ''}
                      ${!isCompleted && !isUsed ? 'hover:shadow-md' : ''}
                    `}
                    onClick={() => !isUsed && handleWordSelect(word)}
                  >
                    {word}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-foreground/70 leading-relaxed">
                💡 Tip: Drag words to blanks or click to select, then click a blank to fill
              </p>
              <div className="text-xs text-foreground/70 font-medium">
                {Object.keys(answers).length} / {questions.length} filled
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="text-base sm:text-lg text-foreground leading-relaxed">
                {renderQuestionText(question)}
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
            <div className="flex justify-between items-center">
              <CustomButton
                onClick={handleReset}
                label="Reset"
                active={false}
              />
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

export default GapFillWithWordBank;
