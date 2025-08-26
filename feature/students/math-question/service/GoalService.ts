import { streamingApiRequest } from '@/utils/axios';

export interface MarkGoalCompletedRequest {
  board: string;
  subject: string;
  paper: number;
  topic: string;
  subtopic: string;
  goalName: string;
}

export interface MarkGoalCompletedResponse {
  status: string;
  message: string;
}

export const GoalService = {
  markGoalCompleted: (body: MarkGoalCompletedRequest): Promise<MarkGoalCompletedResponse> =>
    streamingApiRequest('/user-progress/goal-completed-update', {
      method: 'POST',
      data: body,
    }),
};