import { CheckCircle, Circle } from "lucide-react";
import { MathFormattedQuestion } from "@/types/student";

interface QuestionsNavbarProps {
  questions: MathFormattedQuestion[];
  completedQuestions: Set<number>;
  currentQuestionIndex: number;
  onQuestionSelect: (questionIndex: number) => void;
}

export default function QuestionsNavbar({
  questions,
  completedQuestions,
  currentQuestionIndex,
  onQuestionSelect,
}: QuestionsNavbarProps) {
  return (
    <div className="max-w-80 h-[50%] p-6 mt-1 bg-slate-800 border-l border-slate-700 border-r-4 rounded-md">
      <div className="mb-6">
        <h3 className="font-semibold text-white mb-2">Questions</h3>
        <p className="text-slate-400 text-sm">
          You have {questions.length} Questions
        </p>
      </div>

      <div className="space-y-3 max-h-[450px] overflow-y-auto pb-2">
        {questions.map((question, index) => {
          const isCompleted = completedQuestions.has(index);
          const isCurrent = currentQuestionIndex === index;

          return (
            <div
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={`
                flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                ${
                  isCurrent
                    ? "bg-blue-900/40 border border-blue-600"
                    : isCompleted
                    ? "bg-green-900/20 border border-green-700 hover:bg-green-900/30"
                    : "bg-slate-700 hover:bg-slate-600"
                }
              `}
            >
              {isCompleted ? (
                <CheckCircle
                  className="text-green-400 flex-shrink-0"
                  size={20}
                />
              ) : isCurrent ? (
                <Circle className="text-blue-400 flex-shrink-0" size={20} />
              ) : (
                <Circle className="text-slate-500 flex-shrink-0" size={20} />
              )}
              <div className="flex-1">
                <div
                  className={`text-sm font-medium ${
                    isCurrent
                      ? "text-blue-300"
                      : isCompleted
                      ? "text-green-300"
                      : "text-white"
                  }`}
                >
                  {index + 1}
                  {". "}
                  {question.name?.substring(0, 70) || "Math Question"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
