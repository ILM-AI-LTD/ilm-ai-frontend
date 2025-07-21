// service/QuestionsService.ts
import {
  EvaluateAnswerDTO,
  EvaluateAnswerResponse,
  SampleQuestionsRequest,
  SampleQuestionsResponse,
} from "@/types/student";
import { streamingApiRequest } from "@/utils/axios";

export const QuestionsService = {
  getSampleQuestions: (
    body: SampleQuestionsRequest
  ): Promise<SampleQuestionsResponse> =>
    streamingApiRequest("/questions/sample-questions", {
      method: "POST",
      data: body,
    }),

  evaluateAnswer: (
    body: EvaluateAnswerDTO
  ): Promise<EvaluateAnswerResponse> => {
    const formData = new FormData();
    formData.append("question", body.question);
    formData.append("student_answer", body.student_answer);
    formData.append("correct_answer", body.correct_answer);
    formData.append("question_type", body.question_type);
    console.log("image", body.image);
    // formData.append("image", body.image);

    // Always append image field, but null if no image
    // if (body.image) {
    //   formData.append("image", body.image);
    // } else {
    //   formData.append("image", ""); // or however your API expects no image
    // }

    if (body.image) {
      // Append Blob with filename - this is another way to do it
      formData.append("image", body.image, "drawing.png");
    }

    return streamingApiRequest("/questions/evaluate-answer-hybrid", {
      method: "POST",
      data: formData,
    });

    // streamingApiRequest('/questions/evaluate-answer', {
    //   method: 'POST',
    //   data: body,
    // })
  },
};
