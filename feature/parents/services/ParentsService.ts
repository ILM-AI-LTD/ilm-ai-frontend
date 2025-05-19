import { ParentsEndpoints } from '@/constants/Endpoints'
import { GetChildSummaryResponse, ParentsSetupDto, ParentsSetupResponse } from '@/types/parents'
import axiosInstance, { apiRequest } from '@/utils/axios'

export const ParentsService = {
  completeSetup: (payload: ParentsSetupDto): Promise<ParentsSetupResponse> =>
    apiRequest(ParentsEndpoints.saveChildInfo, {
      method: 'POST',
      data: payload,
    }),

  getChildInfo: (childId:string): Promise<GetChildSummaryResponse> =>
    apiRequest(`${ParentsEndpoints.getChildInfo}/${childId}`, {
      method: 'GET',
    }),

  downloadSchedule: async (childId:string): Promise<Blob> => {
    const response = await axiosInstance.get<Blob>(
      `${ParentsEndpoints.downloadSchedule}/${childId}`,
      {
        responseType: 'blob',
        withCredentials: true,
      }
    )
    return response.data
  },
}
