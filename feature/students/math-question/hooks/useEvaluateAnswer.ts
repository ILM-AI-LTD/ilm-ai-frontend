import { useMutation } from '@tanstack/react-query';
import { EvaluateAnswerDTO, EvaluateAnswerResponse } from '@/types/student';
import { QuestionsService } from '../service/QuestionService';

export const useEvaluateAnswer = () => {
  return useMutation<EvaluateAnswerResponse, Error, EvaluateAnswerDTO>({
    mutationFn: QuestionsService.evaluateAnswer,
    onSuccess: (data) => {
      console.log('Answer evaluation successful:', data);
    },
    onError: (error) => {
      console.error('Answer evaluation failed:', error);
    },
  });
};