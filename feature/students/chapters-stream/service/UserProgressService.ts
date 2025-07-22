import { SubjectProgressResponse } from "@/types/student";
import { streamingApiRequest } from "@/utils/axios";

export const UserProgressService = {
  getSubjectProgress: (params: { board: string; subject: string; paper: number }): Promise<SubjectProgressResponse> =>
    streamingApiRequest(`/user-progress/subject`, {
      method: 'GET',
      params
    }),
};
