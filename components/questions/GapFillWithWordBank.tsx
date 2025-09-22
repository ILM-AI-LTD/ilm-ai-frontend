"use client";

import React, { useState, useRef, useEffect } from "react";
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
  const [touchStartPos, setTouchStartPos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);

  // Global touch move listener for better drag tracking
  useEffect(() => {
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        const touch = e.touches[0];
        setDragPosition({ x: touch.clientX, y: touch.clientY });
      }
    };

    const handleGlobalTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        setDraggedWord("");
        setDragOverBlank("");
        setTouchStartPos(null);
        setDragPosition(null);
      }
    };

    if (isDragging) {
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging]);

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
    setIsDragging(false);
    setTouchStartPos(null);
    setDragPosition(null);
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

  // Touch event handlers for mobile drag and drop
  const handleTouchStart = (e: React.TouchEvent, word: string) => {
    if (isCompleted || usedWords.has(word)) return;
    
    const touch = e.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });
    setDragPosition({ x: touch.clientX, y: touch.clientY });
    setDraggedWord(word);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !touchStartPos) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    
    // Update drag position to follow the finger
    setDragPosition({ x: touch.clientX, y: touch.clientY });
    
    const deltaX = Math.abs(touch.clientX - touchStartPos.x);
    const deltaY = Math.abs(touch.clientY - touchStartPos.y);
    
    // Only start dragging if moved more than 10px
    if (deltaX > 10 || deltaY > 10) {
      // Find the element under the touch point
      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      if (elementBelow) {
        const blankElement = elementBelow.closest('[data-question-id]');
        if (blankElement) {
          const questionId = blankElement.getAttribute('data-question-id');
          if (questionId) {
            setDragOverBlank(questionId);
          }
        }
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging || !draggedWord) {
      setIsDragging(false);
      setTouchStartPos(null);
      setDragPosition(null);
      return;
    }

    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (elementBelow) {
      const blankElement = elementBelow.closest('[data-question-id]');
      if (blankElement) {
        const questionId = blankElement.getAttribute('data-question-id');
        if (questionId && !answers[questionId] && !usedWords.has(draggedWord)) {
          setAnswers(prev => ({
            ...prev,
            [questionId]: draggedWord
          }));
          setUsedWords(prev => new Set([...prev, draggedWord]));
        }
      }
    }
    
    setDraggedWord("");
    setDragOverBlank("");
    setIsDragging(false);
    setTouchStartPos(null);
    setDragPosition(null);
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
              data-question-id={questionId}
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
    <div className="w-full relative">
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
      
      {/* Mobile drag indicator that follows the finger */}
      {isDragging && dragPosition && draggedWord && (
        <div
          className="fixed pointer-events-none z-50 px-3 py-2 rounded-lg border border-border bg-background text-xs sm:text-sm font-semibold text-foreground shadow-lg opacity-80"
          style={{
            left: dragPosition.x - 30,
            top: dragPosition.y - 20,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {draggedWord}
        </div>
      )}
      
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
                    onTouchStart={(e) => handleTouchStart(e, word)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className={`
                      px-3 sm:px-4 py-2 rounded-lg border border-border bg-background 
                      transition-all duration-200 text-xs sm:text-sm font-semibold text-foreground
                      ${selectedWord === word ? 'ring-2 ring-primary bg-primary/10' : ''}
                      ${isUsed ? 'opacity-50 cursor-not-allowed bg-muted' : 'cursor-grab hover:bg-accent'}
                      ${isDragging ? 'opacity-50 scale-95 shadow-lg' : ''}
                      ${!isCompleted && !isUsed ? 'hover:shadow-md' : ''}
                      ${isDragging ? 'touch-none' : ''}
                    `}
                    onClick={() => !isUsed && !isDragging && handleWordSelect(word)}
                  >
                    {word}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-foreground/70 leading-relaxed">
                💡 Tip: Drag/touch words to blanks or click to select, then click a blank to fill
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
