// service/QuestionsService.ts
import { EvaluateAnswerDTO, EvaluateAnswerResponse, SampleQuestionsRequest, SampleQuestionsResponse } from '@/types/student';
import { streamingApiRequest } from '@/utils/axios';

export const QuestionsService = {
  getSampleQuestions: (body: SampleQuestionsRequest): Promise<SampleQuestionsResponse> =>
    streamingApiRequest('/questions/sample-questions', {
      method: 'POST',
      data: body,
    }),

    evaluateAnswer: (body: EvaluateAnswerDTO): Promise<EvaluateAnswerResponse> =>
    streamingApiRequest('/questions/evaluate-answer', {
      method: 'POST',
      data: body,
    }),
};
