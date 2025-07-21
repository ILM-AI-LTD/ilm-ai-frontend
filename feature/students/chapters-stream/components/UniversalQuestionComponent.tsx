import { Card, CardContent } from "@/components/ui/card";
import DescriptiveQuestionComponent from "./DescriptiveQuestionComponent";
import MCQQuestionComponent from "./MCQQuestionComponent";

interface UniversalQuestionComponentProps {
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

const UniversalQuestionComponent: React.FC<UniversalQuestionComponentProps> = (
  props
) => {
  const { data, currentSetIndex } = props;

  const currentSet = data?.questions?.[currentSetIndex];
  const questionType = currentSet?.question_type;

  if (!currentSet) {
    return (
      <Card className="p-8 w-full">
        <CardContent className="p-0">
          <p className="text-muted">No question set available.</p>
        </CardContent>
      </Card>
    );
  }

  switch (questionType) {
    case "mcq":
      return <MCQQuestionComponent {...props} />;

    case "descriptive":
      return <DescriptiveQuestionComponent {...props} />;

    default:
      return (
        <Card className="p-8 w-full">
          <CardContent className="p-0">
            <div className="text-center p-8">
              <p className="text-red-600 font-medium mb-2">
                Unsupported Question Type
              </p>
              <p className="text-gray-600 text-sm">
                Question type "{questionType}" is not supported yet.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Supported types: mcq, short_answer
              </p>
            </div>
          </CardContent>
        </Card>
      );
  }
};

export default UniversalQuestionComponent;
