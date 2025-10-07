"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Volume2, GripVertical } from "lucide-react";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import CustomButton from "@/components/global/CustomButton";

interface OrderingItem {
  id: string;
  text: string;
  correctPosition: number; // 0-indexed position in correct order
}

interface OrderingQuestion {
  id: string;
  text: string;
  items: OrderingItem[];
  explanation?: string;
}

interface OrderingProps {
  title: string;
  instructions: string;
  questions: OrderingQuestion[];
  onComplete: (answers: Record<string, string[]>) => void;
  isCompleted?: boolean;
  showFeedback?: boolean;
}

const Ordering: React.FC<OrderingProps> = ({
  title,
  instructions,
  questions,
  onComplete,
  isCompleted = false,
  showFeedback = false,
}) => {
  // Initialize with shuffled items
  const [answers, setAnswers] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {};
    questions.forEach(question => {
      // Start with original order (items are pre-shuffled in the data)
      initial[question.id] = question.items.map(item => item.id);
    });
    return initial;
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [draggedItem, setDraggedItem] = useState<{ questionId: string; itemId: string; index: number } | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const touchStartY = useRef<number>(0);
  const touchCurrentY = useRef<number>(0);

  // Desktop drag handlers
  const handleDragStart = (questionId: string, itemId: string, index: number) => {
    if (isCompleted) return;
    setDraggedItem({ questionId, itemId, index });
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (questionId: string, targetIndex: number) => {
    if (!draggedItem || draggedItem.questionId !== questionId || isCompleted) return;

    setAnswers(prev => {
      const currentOrder = [...prev[questionId]];
      const draggedIndex = currentOrder.indexOf(draggedItem.itemId);
      
      // Remove from old position
      currentOrder.splice(draggedIndex, 1);
      // Insert at new position
      currentOrder.splice(targetIndex, 0, draggedItem.itemId);
      
      return {
        ...prev,
        [questionId]: currentOrder
      };
    });
    
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  // Mobile touch handlers
  const handleTouchStart = (e: React.TouchEvent, questionId: string, itemId: string, index: number) => {
    if (isCompleted) return;
    const touch = e.touches[0];
    touchStartY.current = touch.clientY;
    touchCurrentY.current = touch.clientY;
    setDraggedItem({ questionId, itemId, index });
  };

  const handleTouchMove = (e: React.TouchEvent, questionId: string) => {
    if (!draggedItem || isCompleted) return;
    
    const touch = e.touches[0];
    touchCurrentY.current = touch.clientY;
    
    // Find which item we're hovering over
    const items = answers[questionId];
    if (!items) return;
    
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const relativeY = touch.clientY - rect.top;
    const itemHeight = rect.height;
    const hoveredIndex = Math.floor(relativeY / itemHeight);
    
    if (hoveredIndex >= 0 && hoveredIndex < items.length) {
      setDragOverIndex(hoveredIndex);
    }
  };

  const handleTouchEnd = (questionId: string) => {
    if (!draggedItem || draggedItem.questionId !== questionId || isCompleted) return;

    if (dragOverIndex !== null && dragOverIndex !== draggedItem.index) {
      setAnswers(prev => {
        const currentOrder = [...prev[questionId]];
        const draggedIndex = currentOrder.indexOf(draggedItem.itemId);
        
        // Remove from old position
        currentOrder.splice(draggedIndex, 1);
        // Insert at new position
        currentOrder.splice(dragOverIndex, 0, draggedItem.itemId);
        
        return {
          ...prev,
          [questionId]: currentOrder
        };
      });
    }
    
    setDraggedItem(null);
    setDragOverIndex(null);
    touchStartY.current = 0;
    touchCurrentY.current = 0;
  };

  const handleSubmit = () => {
    onComplete(answers);
    setShowSuccess(true);
  };

  const isAnswerCorrect = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return false;
    
    const userOrder = answers[questionId];
    const correctOrder = [...question.items]
      .sort((a, b) => a.correctPosition - b.correctPosition)
      .map(item => item.id);
    
    return JSON.stringify(userOrder) === JSON.stringify(correctOrder);
  };

  const getItemStyle = (questionId: string, itemId: string, index: number) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return "border-border bg-background";
    
    if (!showFeedback) {
      return "border-border bg-background hover:bg-accent";
    }
    
    // Show feedback
    const item = question.items.find(i => i.id === itemId);
    if (!item) return "border-border bg-background";
    
    const isInCorrectPosition = item.correctPosition === index;
    
    if (isInCorrectPosition) {
      return "border-green-500 bg-green-100 dark:bg-green-900/20";
    } else {
      return "border-red-500 bg-red-100 dark:bg-red-900/20";
    }
  };

  const getItemTextColor = (questionId: string, itemId: string, index: number) => {
    if (!showFeedback) return "text-foreground";
    
    const question = questions.find(q => q.id === questionId);
    if (!question) return "text-foreground";
    
    const item = question.items.find(i => i.id === itemId);
    if (!item) return "text-foreground";
    
    const isInCorrectPosition = item.correctPosition === index;
    
    if (isInCorrectPosition) {
      return "text-green-700 dark:text-green-300";
    } else {
      return "text-red-700 dark:text-red-300";
    }
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
          <div className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="space-y-4">
                <div className="text-base sm:text-lg text-foreground leading-relaxed font-medium">
                  {question.text}
                </div>
                
                <div 
                  className="space-y-3 relative"
                  onTouchMove={(e) => handleTouchMove(e, question.id)}
                  onTouchEnd={() => handleTouchEnd(question.id)}
                >
                  {answers[question.id]?.map((itemId, index) => {
                    const item = question.items.find(i => i.id === itemId);
                    if (!item) return null;
                    
                    const isDragging = draggedItem?.itemId === item.id;
                    const isDraggedOver = dragOverIndex === index && !isDragging;
                    
                    return (
                      <div key={item.id} className="relative">
                        {/* Drop indicator */}
                        {isDraggedOver && (
                          <div className="absolute -top-2 left-0 right-0 h-1 bg-primary rounded-full z-10" />
                        )}
                        
                        <div
                          draggable={!isCompleted}
                          onDragStart={() => handleDragStart(question.id, item.id, index)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDragLeave={handleDragLeave}
                          onDrop={() => handleDrop(question.id, index)}
                          onDragEnd={handleDragEnd}
                          onTouchStart={(e) => handleTouchStart(e, question.id, item.id, index)}
                          className={`
                            flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border-2
                            transition-all duration-200
                            ${getItemStyle(question.id, item.id, index)}
                            ${isDragging ? 'opacity-50 scale-95' : ''}
                            ${!isCompleted ? 'cursor-move active:cursor-grabbing' : 'cursor-not-allowed opacity-70'}
                          `}
                        >
                          {/* Number */}
                          <div className={`
                            text-lg sm:text-xl font-bold min-w-[2rem] sm:min-w-[2.5rem]
                            ${getItemTextColor(question.id, item.id, index)}
                          `}>
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          
                          {/* Drag Handle */}
                          <div className={`flex items-center ${getItemTextColor(question.id, item.id, index)}`}>
                            <GripVertical size={20} className="opacity-60" />
                          </div>
                          
                          {/* Text */}
                          <div className={`flex-1 font-medium text-sm sm:text-base ${getItemTextColor(question.id, item.id, index)}`}>
                            {item.text}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Show explanation if feedback is enabled */}
                {showFeedback && question.explanation && (
                  <div className="text-sm text-foreground/70 bg-muted/50 rounded-lg p-3 border border-border">
                    <span className="font-medium">Note: </span>
                    <span>{question.explanation}</span>
                  </div>
                )}

                {/* Show correct order if wrong */}
                {showFeedback && !isAnswerCorrect(question.id) && (
                  <div className="text-sm text-foreground/70 bg-muted/50 rounded-lg p-3 border border-border">
                    <span className="font-medium text-green-600 dark:text-green-400">Correct order: </span>
                    <div className="mt-2 space-y-1">
                      {[...question.items]
                        .sort((a, b) => a.correctPosition - b.correctPosition)
                        .map((item, idx) => (
                          <div key={item.id} className="text-foreground">
                            {String(idx + 1).padStart(2, '0')}. {item.text}
                          </div>
                        ))}
                    </div>
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
                active={true}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Ordering;

