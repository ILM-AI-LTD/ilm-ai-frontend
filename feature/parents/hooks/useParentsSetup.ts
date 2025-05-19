import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ParentsSetupDto, ParentsSetupResponse } from '@/types/parents'
import { useParentsSetupStore } from '../store/useParentsSetupStore'
import { ParentsService } from '../services/ParentsService'

export function useParentsSetup() {
    const qc = useQueryClient()
    const { reset } = useParentsSetupStore()

    return useMutation<ParentsSetupResponse, Error, ParentsSetupDto>({
        
        mutationFn: ( payload ) => ParentsService.completeSetup(payload),

        onSuccess: () => {
            reset();
        },
    
    })
}
