"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Lightbulb } from "lucide-react";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import CustomButton from "@/components/global/CustomButton";

interface MatchingItem {
  id: string;
  text: string;
}

interface MatchingPair {
  leftId: string;
  rightId: string;
}

interface MatchingProps {
  title: string;
  instructions: string;
  leftItems: MatchingItem[];
  rightItems: MatchingItem[];
  correctPairs: MatchingPair[];
  explanation?: string;
  onComplete: (answers: MatchingPair[]) => void;
  isCompleted?: boolean;
  showFeedback?: boolean;
}

const Matching: React.FC<MatchingProps> = ({
  title,
  instructions,
  leftItems,
  rightItems,
  correctPairs,
  explanation,
  onComplete,
  isCompleted = false,
  showFeedback = false,
}) => {
  const [matches, setMatches] = useState<MatchingPair[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: string; side: 'left' | 'right' } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tempLine, setTempLine] = useState<{ start: { x: number; y: number }; end: { x: number; y: number } } | null>(null);
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate actual positions of items
  const calculateItemPositions = () => {
    if (!containerRef.current || !svgRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const svgRect = svgRef.current.getBoundingClientRect();
    
    const newPositions: Record<string, { x: number; y: number }> = {};
    
    // Calculate positions for left items
    leftItems.forEach((item, index) => {
      const element = document.querySelector(`[data-item-id="${item.id}"]`) as HTMLElement;
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const relativeX = elementRect.right - svgRect.left;
        const relativeY = elementRect.top + elementRect.height / 2 - svgRect.top;
        newPositions[item.id] = { x: relativeX, y: relativeY };
      }
    });
    
    // Calculate positions for right items
    rightItems.forEach((item, index) => {
      const element = document.querySelector(`[data-item-id="${item.id}"]`) as HTMLElement;
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const relativeX = elementRect.left - svgRect.left;
        const relativeY = elementRect.top + elementRect.height / 2 - svgRect.top;
        newPositions[item.id] = { x: relativeX, y: relativeY };
      }
    });
    
    setItemPositions(newPositions);
  };

  // Calculate positions when component mounts or items change
  useEffect(() => {
    const timer = setTimeout(calculateItemPositions, 100);
    return () => clearTimeout(timer);
  }, [leftItems, rightItems, showFeedback]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      setTimeout(calculateItemPositions, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle mouse move for drawing temporary line
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDrawing && selectedItem && svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const startPos = getItemPosition(selectedItem.id, selectedItem.side);
        if (startPos) {
          setTempLine({
            start: startPos,
            end: { x, y }
          });
        }
      }
    };

    const handleMouseUp = () => {
      if (isDrawing) {
        setIsDrawing(false);
        setTempLine(null);
      }
    };

    if (isDrawing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDrawing, selectedItem]);

  const handleItemClick = (itemId: string, side: 'left' | 'right') => {
    if (isCompleted) return;

    if (!selectedItem) {
      // First click - select the item and start drawing
      setSelectedItem({ id: itemId, side });
      setIsDrawing(true);
    } else if (selectedItem.id === itemId && selectedItem.side === side) {
      // Clicking the same item - deselect
      setSelectedItem(null);
      setIsDrawing(false);
      setTempLine(null);
    } else if (selectedItem.side !== side) {
      // Clicking an item on the opposite side - create a match
      const newMatch: MatchingPair = selectedItem.side === 'left' 
        ? { leftId: selectedItem.id, rightId: itemId }
        : { leftId: itemId, rightId: selectedItem.id };
      
      // Remove any existing matches for these items
      setMatches(prev => prev.filter(match => 
        match.leftId !== newMatch.leftId && match.rightId !== newMatch.rightId &&
        match.leftId !== newMatch.rightId && match.rightId !== newMatch.leftId
      ));
      
      // Add the new match
      setMatches(prev => [...prev, newMatch]);
      
      // Reset selection
      setSelectedItem(null);
      setIsDrawing(false);
      setTempLine(null);
    } else {
      // Clicking an item on the same side - change selection
      setSelectedItem({ id: itemId, side });
      setIsDrawing(true);
    }
  };

  const handleSubmit = () => {
    onComplete(matches);
    setShowSuccess(true);
  };

  const handleReset = () => {
    setMatches([]);
    setShowSuccess(false);
  };

  const isItemMatched = (itemId: string, side: 'left' | 'right') => {
    return matches.some(match => 
      (side === 'left' && match.leftId === itemId) || 
      (side === 'right' && match.rightId === itemId)
    );
  };

  const isMatchCorrect = (match: MatchingPair) => {
    return correctPairs.some(correctPair => 
      correctPair.leftId === match.leftId && correctPair.rightId === match.rightId
    );
  };

  const getItemStyle = (itemId: string, side: 'left' | 'right') => {
    const isMatched = isItemMatched(itemId, side);
    const isSelected = selectedItem?.id === itemId && selectedItem?.side === side;
    
    let baseStyle = "px-2 sm:px-4 py-2 sm:py-3 rounded-lg border-2 font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer hover:scale-105";
    
    if (isCompleted) {
      baseStyle += " cursor-not-allowed opacity-70";
    }
    
    if (isSelected) {
      baseStyle += " border-blue-500 bg-blue-100 dark:bg-blue-900/20 scale-105";
    } else if (isMatched) {
      if (showFeedback) {
        // Color boxes based on correctness
        const match = matches.find(m => 
          (side === 'left' && m.leftId === itemId) || 
          (side === 'right' && m.rightId === itemId)
        );
        if (match && isMatchCorrect(match)) {
          baseStyle += " border-green-500 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300";
        } else {
          baseStyle += " border-red-500 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300";
        }
      } else {
        baseStyle += " border-primary bg-primary/10 text-primary";
      }
    } else {
      baseStyle += " border-border bg-background text-foreground hover:bg-accent";
    }
    
    return baseStyle;
  };

  const getLineColor = (match: MatchingPair) => {
    if (showFeedback) {
      return isMatchCorrect(match) ? "#10b981" : "#ef4444"; // green or red
    }
    return "#3b82f6"; // blue
  };

  const getItemPosition = (itemId: string, side: 'left' | 'right') => {
    return itemPositions[itemId] || null;
  };

  return (
    <div className="w-full relative">
      
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
          {/* Matching Area */}
          <div ref={containerRef} className="relative">
            {/* SVG for drawing lines */}
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              style={{ minHeight: '200px' }}
            >
              {/* Render existing matches */}
              {matches.map((match, index) => {
                const leftPos = getItemPosition(match.leftId, 'left');
                const rightPos = getItemPosition(match.rightId, 'right');
                
                if (!leftPos || !rightPos) return null;
                
                return (
                  <line
                    key={index}
                    x1={leftPos.x}
                    y1={leftPos.y}
                    x2={rightPos.x}
                    y2={rightPos.y}
                    stroke={getLineColor(match)}
                    strokeWidth="2"
                    strokeDasharray={showFeedback ? "0" : "5,5"}
                  />
                );
              })}
              
              {/* Render temporary line while drawing */}
              {tempLine && (
                <line
                  x1={tempLine.start.x}
                  y1={tempLine.start.y}
                  x2={tempLine.end.x}
                  y2={tempLine.end.y}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.7"
                />
              )}
            </svg>

            {/* Items Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-8 relative z-20">
              {/* Left Column */}
              <div className="space-y-2 sm:space-y-4">
                <h3 className="text-sm sm:text-lg font-semibold text-foreground mb-2 sm:mb-4">Organelles</h3>
                {leftItems.map((item, index) => (
                  <div
                    key={item.id}
                    data-item-id={item.id}
                    onClick={() => handleItemClick(item.id, 'left')}
                    className={getItemStyle(item.id, 'left')}
                  >
                    <span className="font-bold mr-2">{index + 1}</span>
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-2 sm:space-y-4">
                <h3 className="text-sm sm:text-lg font-semibold text-foreground mb-2 sm:mb-4">Functions</h3>
                {rightItems.map((item, index) => (
                  <div
                    key={item.id}
                    data-item-id={item.id}
                    onClick={() => handleItemClick(item.id, 'right')}
                    className={getItemStyle(item.id, 'right')}
                  >
                    <span className="font-bold mr-2">{index + 1}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="text-center text-sm text-foreground/70">
            {matches.length} / {Math.min(leftItems.length, rightItems.length)} matches made
          </div>

          {showSuccess && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle size={20} />
              <span className="font-semibold text-foreground">Good!</span>
            </div>
          )}


          {/* Explanation */}
          {explanation && showFeedback && (
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={16} className="text-blue-500" />
                <span className="font-semibold text-blue-600 dark:text-blue-400">Explanation</span>
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed">
                {explanation}
              </p>
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
                label="Evaluate"
                active={matches.length > 0}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Matching;
