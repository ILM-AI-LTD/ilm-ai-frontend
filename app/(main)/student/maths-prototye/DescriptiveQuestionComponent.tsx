"use client";
import CustomButton from "@/components/global/CustomButton";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import CustomTldrawEditor from "@/feature/students/math-question/components/CustomTldrawEditor";
import MarkdownRenderer from "@/feature/students/math-question/components/MarkdownRenderer";
import { MathFormattedQuestion } from "@/types/student";
import { Lightbulb } from "lucide-react";
import { useEffect, useRef } from "react";
// import MarkdownRenderer from "./MarkdownRenderer";
// import CustomTldrawEditor from "./CustomTldrawEditor";

interface DescriptiveQuestionComponentProps {
  data: MathFormattedQuestion;
  onEvaluate: (image: Blob | null) => void;
  currentStep: number;
  // isEvaluating: boolean;
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
  currentStep,
  // isEvaluating,
  // evaluationResult,
}) => {
  const tldrawRef = useRef<{ exportToPNG: () => Promise<Blob> } | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // if (!currentQuestion) {
  //   return (
  //     <Card className="p-8 w-full">
  //       <CardContent className="p-0">
  //         <p className="text-muted">No question available.</p>
  //       </CardContent>
  //     </Card>
  //   );
  // }

  // useEffect(() => {
  //   if (bottomRef.current) {
  //     bottomRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [evaluationResult]);

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
          Step {currentStep}: {data.hint}
        </CardTitle>

        <CardContent className="p-0">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Your Answer:
            </label>
            <CustomTldrawEditor ref={tldrawRef} />
          </div>
        </CardContent>

        <div className="flex justify-end mt-6">
          <CustomButton
            onClick={handleEvaluate}
            // disabled={isEvaluating}
            // isLoading={isEvaluating}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {/* {isEvaluating ? "Evaluating..." : "Evaluate"} */}
            Evaluate
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
