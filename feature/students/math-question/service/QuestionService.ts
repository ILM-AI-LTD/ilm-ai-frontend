// service/QuestionsService.ts
import {
  EvaluateAnswerDTO,
  EvaluateAnswerResponse,
  SampleQuestionsRequest,
  SampleQuestionsResponse,
} from "@/types/student";
import {
  streamingApiEvaluationRequest,
  streamingApiRequest,
  // streamingAxiosInstance,
} from "@/utils/axios";
// import { getYourAuthToken } from "@/utils/tokens";
// import axios from "axios";

export const QuestionsService = {
  getSampleQuestions: (
    body: SampleQuestionsRequest
  ): Promise<SampleQuestionsResponse> =>
    streamingApiRequest("/questions/sample-questions", {
      method: "POST",
      data: body,
    }),

  evaluateAnswer: async (
    body: EvaluateAnswerDTO
  ): Promise<EvaluateAnswerResponse> => {
    const formData = new FormData();
    formData.append("question", body.question);
    formData.append("student_answer", body.student_answer);
    formData.append("correct_answer", body.correct_answer);
    formData.append("question_type", body.question_type);
    console.log("image", body.image);
    // formData.append("image", body.image);

    if (body.image) {
      const imageFile = new File([body.image], "drawing.png", {
        type: "image/png",
      });
      formData.append("image", imageFile);
    }

    return streamingApiEvaluationRequest("/questions/evaluate-answer-hybrid", {
      method: "POST",
      data: formData,
    });
  },
};
