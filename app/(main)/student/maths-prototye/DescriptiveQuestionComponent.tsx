"use client";
import CustomButton from "@/components/global/CustomButton";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import CustomTldrawEditor from "@/feature/students/math-question/components/CustomTldrawEditor";
import MarkdownRenderer from "@/feature/students/math-question/components/MarkdownRenderer";
// import MarkdownRenderer from "@/feature/students/math-question/components/MarkdownRenderer";
import { MathFormattedQuestion } from "@/types/student";
import { CheckCircle, XCircle } from "lucide-react";
// import { Lightbulb } from "lucide-react";
import { useRef } from "react";
// import MarkdownRenderer from "./MarkdownRenderer";
// import CustomTldrawEditor from "./CustomTldrawEditor";

interface DescriptiveQuestionComponentProps {
  data: MathFormattedQuestion;
  onEvaluate: (image: Blob | null) => void;
  currentStep: number;
  isEvaluating: boolean;
  index: number;
  // evaluationResult?: {
  //   isCorrect: boolean;
  //   score?: number;
  //   feedback?: string;
  // } | null;
}

const DescriptiveQuestionComponent: React.FC<
  DescriptiveQuestionComponentProps
> = ({
  data,
  onEvaluate,
  // currentStep,
  isEvaluating,
  index,
  // evaluationResult,
}) => {
  // console.log("evaluation-----------", data.evaluation);
  // const isCorrect: boolean = data.is_finished ? true : false;
  // console.log("evaluation-----------", data.evaluation);

  const tldrawRef = useRef<{ exportToPNG: () => Promise<Blob> } | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleEvaluate = async () => {
    if (!tldrawRef.current) {
      console.error("Tldraw editor not available");
      return;
    }

    try {
      const drawingBlob = await tldrawRef.current.exportToPNG();

      onEvaluate(drawingBlob);
    } catch (error) {
      console.error("Error exporting drawing:", error);
      alert("Error exporting drawing. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <Card className="p-4 w-full">
        <CardTitle className=" mb-4">
          {/* Step {currentStep}: {data.hint} */}
          {/* Step {index + 1}: {data.hint} */}
          Step {index + 1}: <MarkdownRenderer content={data.hint} />
        </CardTitle>

        <CardContent className="p-0">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Your Answer:
            </label>
            <CustomTldrawEditor ref={tldrawRef} />
          </div>
        </CardContent>

        <div className="flex justify-between mt-6 gap-2">
          {/* <p>{data.evaluation}</p> */}
          <div>
            {/* <h3 className="font-semibold text-blue-400 mb-2">
                                    Step {attempt.currentStep} - Attempt {index + 1}
                                  </h3> */}

            {/* Show evaluation result if this attempt has been evaluated */}
            {data.evaluation && (
              <div
                className={`mb-4 p-3 rounded-lg border ${
                  data.is_finished
                    ? "border-green-500 bg-green-900/20"
                    : "border-red-500 bg-red-900/20"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {data.is_finished ? (
                    <CheckCircle className="text-green-400" size={16} />
                  ) : (
                    <XCircle className="text-red-400" size={16} />
                  )}
                  <span
                    className={`font-medium ${
                      data.is_finished ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {data.is_finished ? "Correct!" : "Incorrect"}
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    data.is_finished ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {/* {data.evaluation} */}
                  <MarkdownRenderer content={data.evaluation} />
                </p>
              </div>
            )}
          </div>
          <CustomButton
            onClick={handleEvaluate}
            disabled={isEvaluating}
            isLoading={isEvaluating}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isEvaluating ? "Evaluating..." : "Evaluate"}
            {/* Evaluate */}
          </CustomButton>
        </div>
      </Card>

      {/* {evaluationResult && (
        <div className="mt-6 border rounded-lg p-4 bg-background flex flex-col lg:flex-row gap-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="text-primary" size={30} />
            <span className="font-semibold text-2xl text-primary">
              Explanation
            </span>
          </div>
          <div className="bg-primary text-white  p-4 rounded-md w-full">
            <MarkdownRenderer
              content={evaluationResult.feedback || "No explanation provided."}
            />
          </div>
        </div>
      )} */}

      <div ref={bottomRef} />
    </div>
  );
};

export default DescriptiveQuestionComponent;
