import { useMutation } from '@tanstack/react-query';
import { MarkGoalCompletedRequest, MarkGoalCompletedResponse, GoalService } from '../service/GoalService';

export const useMarkGoalCompleted = () => {
  return useMutation<MarkGoalCompletedResponse, Error, MarkGoalCompletedRequest>({
    mutationFn: GoalService.markGoalCompleted,
    onSuccess: (data) => {
      console.log('Goal marked as completed:', data);
    },
    onError: (error) => {
      console.error('Failed to mark goal as completed:', error);
    },
  });
};