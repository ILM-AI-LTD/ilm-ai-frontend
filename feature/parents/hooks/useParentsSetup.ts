import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ParentsSetupDto, ParentsSetupResponse } from '@/types/parents'
import { ParentsService } from '../services/ParentsService'

export function useParentsSetup() {
    const qc = useQueryClient()
    

    return useMutation<ParentsSetupResponse, Error, ParentsSetupDto>({
        
        mutationFn: ( payload ) => ParentsService.completeSetup(payload),
    
    })
}
