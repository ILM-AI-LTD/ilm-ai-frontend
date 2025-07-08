import { StudentsEndpoints } from "@/constants/Endpoints";
import {
  CountryBoardPayload,
  CountryBoardResponse
} from "@/types/student";
import { apiRequest } from "@/utils/axios";

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
