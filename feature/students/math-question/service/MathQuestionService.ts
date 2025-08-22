import {
  EvaluateMathAnswerResponse,
  GenerateScriptRequest,
  MathEvaluateAnswerDTO,
  MathSampleQuestionsResponse,
  ScriptApiResponse,
} from "@/types/student";
import {
  streamingApiEvaluationRequest,
  streamingApiRequest,
  streamingMathApiEvaluationRequest,
} from "@/utils/axios";

export const MathQuestionService = {
  getMathQuestions: (): Promise<MathSampleQuestionsResponse> =>
    streamingApiRequest(`/math/get-all-question`, {
      method: "GET",
    }),

  generateScript: (body: GenerateScriptRequest): Promise<ScriptApiResponse> =>
    streamingApiRequest("/learning/generate-script", {
      method: "POST",
      data: body,
    }),

  evaluateAnswer: async (
    body: MathEvaluateAnswerDTO
  ): Promise<EvaluateMathAnswerResponse> => {
    const formData = new FormData();
    formData.append("question", body.question);
    formData.append("currentStepCount", body.currentStepCount);
    // formData.append("correct_answer", body.correctAnswer);
    formData.append("correct_answer", "abc");
    // console.log("image", body.image);
    // formData.append("image", body.image);

    if (body.image) {
      const imageFile = new File([body.image], "drawing.png", {
        type: "image/png",
      });
      formData.append("image", imageFile);
    }

    // return streamingApiEvaluationRequest("/questions/evaluate-answer-hybrid", {
    //   method: "POST",
    //   data: formData,
    // });
    return streamingMathApiEvaluationRequest("/api/full_evaluation", {
      // return streamingMathApiEvaluationRequest("/math/evaluate-math", {
      method: "POST",
      data: formData,
    });
  },
};
