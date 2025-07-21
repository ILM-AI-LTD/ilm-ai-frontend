import CustomButton from "@/components/global/CustomButton";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import CustomTldrawEditor from "./CustomTldrawEditor";

interface DescriptiveQuestionComponentProps {
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

const DescriptiveQuestionComponent: React.FC<
  DescriptiveQuestionComponentProps
> = ({
  data,
  onEvaluate,
  isEvaluating,
  currentSetIndex,
  currentQuestionIndex,
  evaluationResult,
}) => {
  const tldrawRef = useRef<{ exportToPNG: () => Promise<Blob> } | null>(null);
  // const [drawingBlob, setDrawingBlob] = useState<Blob | null>(null);
  // const [hasDrawing, setHasDrawing] = useState<boolean>(false);
  // const [answer, setAnswer] = useState<string>("");

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

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [evaluationResult]);

  // const handleEvaluate = () => {
  //   if (answer.trim()) {
  //     onEvaluate(answer.trim(), "descriptive");
  //   }
  // };

  // useEffect(() => {
  //   setAnswer("");
  // }, [currentSetIndex, currentQuestionIndex]);

  // const getTextareaStyle = () => {
  //   if (!evaluationResult) {
  //     return "w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";
  //   } else {
  //     if (evaluationResult.isCorrect) {
  //       return "w-full p-4 border-2 border-green-500 rounded-lg resize-none focus:outline-none bg-secondary";
  //     } else {
  //       return "w-full p-4 border-2 border-red-500 rounded-lg resize-none focus:outline-none bg-secondary";
  //     }
  //   }
  // };

  const handleEvaluate = async () => {
    if (!tldrawRef.current) {
      console.error("Tldraw editor not available");
      return;
    }

    try {
      // Export the current drawing as PNG
      const drawingBlob = await tldrawRef.current.exportToPNG();

      // Send to evaluation function
      onEvaluate("", "descriptive", drawingBlob);
    } catch (error) {
      console.error("Error exporting drawing:", error);
      alert("Error exporting drawing. Please try again.");
    }
  };

  // const handleDrawingSubmit = (pngBlob: Blob) => {
  //   console.log("Drawing received from editor:", pngBlob);
  //   setDrawingBlob(pngBlob);
  //   setHasDrawing(true);
  // };

  // useEffect(() => {
  //   setDrawingBlob(null);
  //   setHasDrawing(false);
  // }, [currentSetIndex, currentQuestionIndex]);

  return (
    <div className="w-full">
      <Card className="p-4 w-full">
        <CardTitle className="text-2xl font-semibold mb-6">
          {currentQuestion.question}
        </CardTitle>

        <CardContent className="p-0">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Your Answer:
            </label>
            {/* <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={4}
              className={getTextareaStyle()}
            /> */}

            {/* <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{answer.length} characters</span>
              {!evaluationResult && answer.length > 0 && (
                <span className="text-green-600">✓ Ready to evaluate</span>
              )}
            </div> */}

            {/* <CustomTldrawEditor onSubmit={handleDrawingSubmit} /> */}
            {/* <CustomTldrawEditor
              onSubmit={handleDrawingSubmit}
              showFloatingSubmitButton={true}
            /> */}
            <CustomTldrawEditor ref={tldrawRef} />
          </div>
        </CardContent>

        {/* {answer.trim() && ( */}
        <div className="flex justify-end mt-6">
          <CustomButton
            onClick={handleEvaluate}
            disabled={isEvaluating}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isEvaluating ? "Evaluating..." : "Evaluate"}
          </CustomButton>
        </div>
        {/* )} */}
      </Card>

      {evaluationResult && (
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
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default DescriptiveQuestionComponent;
