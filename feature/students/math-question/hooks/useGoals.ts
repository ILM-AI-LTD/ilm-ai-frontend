import { StreamServiceParams } from '@/types/student'
import { useQuery } from '@tanstack/react-query'
import { StreamService } from '../service/StreamService'

export const useGoals = (
    { board,
        subject,
        paper,
        topic,
        subtopic }: StreamServiceParams
) => {
    return useQuery({
        queryKey: ['goals', board, subject, paper, topic, subtopic],
        queryFn: () =>
            StreamService.getGoals({ board, subject, paper, topic, subtopic }),
        enabled: !!subject && !!topic && !!subtopic,
    })
}
