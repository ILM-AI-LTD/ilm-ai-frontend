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
  streamingAxiosInstance,
} from "@/utils/axios";
import { getYourAuthToken } from "@/utils/tokens";
import axios from "axios";

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

    // Always append image field, but null if no image
    // if (body.image) {
    //   formData.append("image", body.image);
    // } else {
    //   formData.append("image", ""); // or however your API expects no image
    // }

    if (body.image) {
      console.log("Original blob:", body.image); // Should show Blob {size: 36968, type: 'image/png'}

      const imageFile = new File([body.image], "drawing.png", {
        type: "image/png",
      });

      console.log("Created file:", imageFile); // Should show File object
      formData.append("image", imageFile);

      // Debug FormData contents
      // console.log("FormData entries:");
      // for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
    }

    return streamingApiEvaluationRequest("/questions/evaluate-answer-hybrid", {
      method: "POST",
      data: formData,
    });

    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_STREAM_URL}/questions/evaluate-answer-hybrid`,
    //   {
    //     method: "POST",
    //     body: formData, // Don't use 'data', use 'body'
    //     headers: {
    //       // Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODZhNDdkOGRiZGM3NWRhYjZiNjZjMTAiLCJ0eXBlIjoiY2hpbGQiLCJpYXQiOjE3NTMxMDI1NjcsImV4cCI6MTc1MzcwNzM2N30.7-y-PkbO7duTsPqqRz6VftLIQzkRjncsl2FjmotbwGo"}`,
    //       Authorization: `Bearer ${getYourAuthToken()}`, // Add your auth header
    //       // DO NOT set Content-Type - let browser set it automatically for FormData
    //     },
    //   }
    // );

    // if (!response.ok) {
    //   const errorText = await response.text();
    //   throw new Error(
    //     `HTTP error! status: ${response.status}, message: ${errorText}`
    //   );
    // }

    // return await response.json();

    // ----------------------------------------------

    // streamingApiRequest("/questions/evaluate-answer", {
    //   method: "POST",
    //   data: body,
    // });
  },
};
