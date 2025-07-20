// hooks/useSampleQuestions.ts
import { useMutation } from '@tanstack/react-query';
import { SampleQuestionsRequest, SampleQuestionsResponse } from '@/types/student';
import { QuestionsService } from '../service/QuestionService';

export const useSampleQuestions = () => {
  return useMutation<SampleQuestionsResponse, Error, SampleQuestionsRequest>({
    mutationFn: QuestionsService.getSampleQuestions,
  });
};
