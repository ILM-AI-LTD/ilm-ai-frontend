"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, Circle } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  isCompleted: boolean;
  isCurrent?: boolean;
  isStarted?: boolean;
  subtasks?: Goal[];
}

interface ProgressGoalSidebarProps {
  totalGoals: number;
  goals: Goal[];
  onGoalSelect?: (goalId: string) => void;
}

const ProgressGoalSidebar: React.FC<ProgressGoalSidebarProps> = ({
  totalGoals,
  goals,
  onGoalSelect,
}) => {
  const renderGoal = (goal: Goal, level: number = 0) => {
    const isClickable = goal.isStarted || goal.isCompleted;
    
    return (
      <div key={goal.id} className={`${level > 0 ? 'ml-6' : ''}`}>
        <div className="flex items-start gap-3 mb-2">
          {/* Status Icon */}
          <div className="flex-shrink-0 mt-1">
            {goal.isCompleted ? (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle size={12} className="text-white" />
              </div>
            ) : goal.isCurrent ? (
              <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
            ) : goal.isStarted ? (
              <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
            ) : (
              <div className="w-5 h-5 border-2 border-red-500 rounded-full bg-transparent flex items-center justify-center">
                <span className="text-red-500 text-xs font-bold">3</span>
              </div>
            )}
          </div>

          {/* Goal Title */}
          <button
            onClick={() => isClickable && onGoalSelect?.(goal.id)}
            disabled={!isClickable}
            className={`
              text-left flex-1 text-sm font-medium transition-colors
              ${goal.isCompleted ? 'text-green-400' : goal.isCurrent ? 'text-orange-400' : 'text-foreground/60'}
              ${isClickable ? 'cursor-pointer hover:text-foreground' : 'cursor-not-allowed'}
            `}
          >
            {goal.title}
          </button>
        </div>

        {/* Subtasks */}
        {goal.subtasks && goal.subtasks.length > 0 && (
          <div className="ml-2 space-y-1">
            {goal.subtasks.map((subtask) => (
              <div key={subtask.id} className="flex items-start gap-3">
                {/* Subtask Status Icon */}
                <div className="flex-shrink-0 mt-1">
                  {subtask.isCompleted ? (
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle size={10} className="text-white" />
                    </div>
                  ) : subtask.isCurrent ? (
                    <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                  ) : (
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle size={10} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Subtask Title */}
                <button
                  onClick={() => (subtask.isStarted || subtask.isCompleted) && onGoalSelect?.(subtask.id)}
                  disabled={!subtask.isStarted && !subtask.isCompleted}
                  className={`
                    text-left flex-1 text-xs transition-colors
                    ${subtask.isCompleted ? 'text-green-400' : subtask.isCurrent ? 'text-orange-400' : 'text-green-400'}
                    ${(subtask.isStarted || subtask.isCompleted) ? 'cursor-pointer hover:text-foreground' : 'cursor-not-allowed'}
                  `}
                >
                  {subtask.title}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-80 bg-secondary border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-foreground">
          Progress Goal
        </CardTitle>
        <p className="text-sm text-foreground/70">
          You Have {totalGoals} Goals
        </p>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-80 sm:h-96 w-full">
          <div className="space-y-4 pr-4">
            {goals.map((goal) => renderGoal(goal))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ProgressGoalSidebar;
