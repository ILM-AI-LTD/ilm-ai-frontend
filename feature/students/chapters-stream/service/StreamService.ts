import { GenerateScriptRequest, GetGoalsDTO, GoalsApiResponse, ScriptApiResponse } from '@/types/student'
import { streamingApiRequest } from '@/utils/axios'

export const StreamService = {
    getGoals: (params: GetGoalsDTO): Promise<GoalsApiResponse> =>
        streamingApiRequest(`/content/goals`, {
            method: 'GET',
            params,
        }),

    generateScript: (body: GenerateScriptRequest): Promise<ScriptApiResponse> =>
        streamingApiRequest('/learning/generate-script', {
            method: 'POST',
            data: body,
        }),
}
