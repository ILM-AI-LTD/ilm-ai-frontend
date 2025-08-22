import { useMutation } from "@tanstack/react-query";
import {
  EvaluateAnswerDTO,
  EvaluateAnswerResponse,
  EvaluateMathAnswerResponse,
  MathEvaluateAnswerDTO,
} from "@/types/student";
import { QuestionsService } from "../service/QuestionService";
import { MathQuestionService } from "../service/MathQuestionService";

export const useMathEvaluateAnswer = () => {
  return useMutation<EvaluateMathAnswerResponse, Error, MathEvaluateAnswerDTO>({
    mutationFn: MathQuestionService.evaluateAnswer,
    onSuccess: (data) => {
      console.log("Answer evaluation successful:", data);
    },
    onError: (error) => {
      console.error("Answer evaluation failed:", error);
    },
  });
};
