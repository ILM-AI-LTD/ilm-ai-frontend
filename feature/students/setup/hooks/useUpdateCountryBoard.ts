import {
  CountryBoardDetails,
  CountryBoardPayload,
  CountryBoardResponse,
} from "@/types/student";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StudentsService } from "../services";

export function useUpdateCountryBoard() {
  const qc = useQueryClient();

  return useMutation<CountryBoardResponse, Error, CountryBoardPayload>({
    mutationFn: (data) => StudentsService.completeSetup(data),
    onSuccess: (res) => {
      console.log("from hook --------", res);

      const { child } = res.data;

      qc.setQueryData<CountryBoardDetails>(["studentCountryBoard"], child);

      //   const storage = rememberMe ? localStorage : sessionStorage;
      //   storage.setItem("currentStudents", JSON.stringify(child));
    },
  });
}
