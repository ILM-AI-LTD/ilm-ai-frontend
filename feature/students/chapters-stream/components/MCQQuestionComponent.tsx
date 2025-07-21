import CustomButton from "@/components/global/CustomButton";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lightbulb, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

interface MCQQuestionComponentProps {
  data: any;
  onEvaluate: (
    selectedOption: string,
    question_type: string,
    image: Blob | null
  ) => void;
  isEvaluating: boolean;
  currentSetIndex: number;
  currentQuestionIndex: number;
  evaluationResult?: {
    isCorrect: boolean;
    score?: number;
    feedback?: string;
  } | null;
}

const MCQQuestionComponent: React.FC<MCQQuestionComponentProps> = ({
  data,
  onEvaluate,
  isEvaluating,
  currentSetIndex,
  currentQuestionIndex,
  evaluationResult,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentSet = data?.questions?.[currentSetIndex];
  const currentQuestion = currentSet?.question_list?.[currentQuestionIndex];

  const bottomRef = useRef<HTMLDivElement | null>(null);

  if (!currentQuestion) {
    return (
      <Card className="p-8 w-full">
        <CardContent className="p-0">
          <p className="text-muted">No question available.</p>
        </CardContent>
      </Card>
    );
  }

  const parseQuestion = (questionText: string) => {
    const parts = questionText.split(" -- ");
    const question = parts[0];
    const optionsText = parts[1];

    if (!optionsText) {
      return { question, options: [] };
    }

    const optionMatches = optionsText.match(/!([A-D])\.\s*([^!]+)/g);
    const options =
      optionMatches?.map((match) => {
        const [, letter, text] = match.match(/!([A-D])\.\s*(.+)/) || [];
        return {
          value: letter,
          label: letter,
          description: text?.trim(),
        };
      }) || [];

    return { question, options };
  };

  const { question, options } = parseQuestion(currentQuestion.question);

  const handleOptionSelect = (optionValue: string) => {
    if (!evaluationResult) {
      setSelectedOption(optionValue);
    }
  };

  const handleEvaluate = () => {
    if (selectedOption) {
      onEvaluate(selectedOption, "mcq", null);
    }
  };

  useEffect(() => {
    setSelectedOption(null);
  }, [currentSetIndex, currentQuestionIndex]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedOption, evaluationResult]);

  const getOptionStyle = (option: any) => {
    if (!evaluationResult) {
      const isSelected = selectedOption === option.value;
      return `rounded-lg border p-4 cursor-pointer flex transition-colors duration-200 ${
        isSelected ? "border-primary bg-primary/10" : "hover:bg-primary/20"
      }`;
    } else {
      const isSelected = selectedOption === option.value;
      const isCorrect = option.value === currentQuestion.answer;

      if (isCorrect) {
        return "rounded-lg  bg-[#049F6C] text-white p-4 flex";
      } else if (isSelected && !isCorrect) {
        return "rounded-lg bg-[#DF1C41] text-white p-4 flex";
      } else {
        return "rounded-lg border bg-secondary p-4 flex opacity-60";
      }
    }
  };

  const getOptionIcon = (option: any) => {
    if (!evaluationResult) return null;

    const isSelected = selectedOption === option.value;
    const isCorrect = option.value === currentQuestion.answer;

    if (isCorrect) {
      return <CheckCircle className="w-5 h-5 text-white ml-2" />;
    } else if (isSelected && !isCorrect) {
      return <XCircle className="w-5 h-5 text-white ml-2" />;
    }
    return null;
  };

  const getOptionNumber = (option: any) => {
    if (!evaluationResult) {
      const isSelected = selectedOption === option.value;
      return (
        <div
          className={`border w-10 h-10 rounded-sm mr-4 flex justify-center items-center font-semibold ${
            isSelected ? "border-primary" : ""
          }`}
        >
          {option.value}
        </div>
      );
    } else {
      const isSelected = selectedOption === option.value;
      const isCorrect = option.value === currentQuestion.answer;

      if (isCorrect || (isSelected && !isCorrect)) {
        return (
          <div className="border border-white w-10 h-10 rounded-sm mr-4 flex justify-center items-center font-semibold text-white">
            {option.value}
          </div>
        );
      } else {
        return (
          <div className="border border-gray-400 w-10 h-10 rounded-sm mr-4 flex justify-center items-center font-semibold text-gray-400">
            {option.value}
          </div>
        );
      }
    }
  };

  return (
    <div className="w-full">
      <Card className="p-4 w-full">
        <CardTitle className="text-2xl font-semibold mb-6">
          {question}
        </CardTitle>

        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-0">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              className={getOptionStyle(option)}
            >
              {getOptionNumber(option)}
              <div className="flex-1">
                <p className="text-base font-medium">{option.description}</p>
              </div>
              {getOptionIcon(option)}
            </div>
          ))}
        </CardContent>

        {selectedOption && !evaluationResult && (
          <div className="flex justify-end mt-6">
            <CustomButton
              onClick={handleEvaluate}
              disabled={isEvaluating}
              isLoading={isEvaluating}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isEvaluating ? "Evaluating..." : "Evaluate"}
            </CustomButton>
          </div>
        )}
      </Card>

      {evaluationResult && (
        <div className="mt-6 border rounded-lg p-4 bg-background flex flex-col lg:flex-row gap-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="text-primary" size={30} />
            <span className="font-semibold text-2xl text-primary">
              Explanation
            </span>
          </div>
          <div className="bg-primary text-primary  p-4 rounded-md w-full">
            <MarkdownRenderer
              content={evaluationResult.feedback || "No explanation provided."}
            />

            {/* <p className='text-white'>{evaluationResult.feedback}</p> */}
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default MCQQuestionComponent;
