import { ParentsEndpoints, StudentsEndpoints } from "@/constants/Endpoints";
import {
  GetChildSummaryResponse,
  ParentsSetupDto,
  ParentsSetupResponse,
} from "@/types/parents";
import {
  CountryBoardDetails,
  CountryBoardPayload,
  CountryBoardResponse,
} from "@/types/student";
import axiosInstance, { apiRequest } from "@/utils/axios";

export const StudentsService = {
  completeSetup: async (
    payload: CountryBoardPayload
  ): Promise<CountryBoardResponse> =>
    // const response = (await apiRequest(
    //   StudentsEndpoints.updateCountryBoardInfo,
    //   {
    //     method: "POST",
    //     data: payload,
    //   }
    // )) as CountryBoardResponse;
    // return response.data;
    apiRequest(StudentsEndpoints.updateCountryBoardInfo, {
      method: "POST",
      data: payload,
    }),
};
