import { StreamServiceParams } from "@/types/student";
import { useQuery } from "@tanstack/react-query";
import { StreamService } from "../service/StreamService";
import { MathQuestionService } from "../service/MathQuestionService";

export const useGetMathQuestions = () => {
  return useQuery({
    queryKey: ["mathQues"],
    queryFn: () => MathQuestionService.getMathQuestions(),
    // enabled: ,
  });
};
