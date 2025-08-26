import { useMutation } from '@tanstack/react-query';
import { GenerateScriptRequest, ScriptApiResponse } from '@/types/student';
import { StreamService } from '../service/StreamService';

export function useGenerateScript () {
  return useMutation<ScriptApiResponse, Error, GenerateScriptRequest>({
    mutationFn: StreamService.generateScript,
  });
};
