import { GetGoalsDTO, GoalsApiResponse, StreamServiceParams } from '@/types/student'
import { streamingApiRequest } from '@/utils/axios'

export const StreamService = {
    getGoals: (params : GetGoalsDTO) :Promise<GoalsApiResponse> =>
        streamingApiRequest(`/content/goals`, {
            method: 'GET',
            params,
        }),
}
