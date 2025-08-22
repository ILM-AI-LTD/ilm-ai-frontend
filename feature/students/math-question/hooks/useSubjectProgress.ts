import { useQuery } from '@tanstack/react-query';
import { UserProgressService } from '../service/UserProgressService';
import { SubjectProgressResponse } from '@/types/student';

export const useSubjectProgress = (board: string, subject: string, paper: number) => {
  return useQuery<SubjectProgressResponse>({
    queryKey: ['subject-progress', board, subject, paper],
    queryFn: () => UserProgressService.getSubjectProgress({ board, subject, paper }),
    staleTime: 5 * 60 * 1000,
  });
};
