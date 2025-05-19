"use client"

import { GetChildSummaryResponse } from '@/types/parents'
import { useQuery } from '@tanstack/react-query'
import { ParentsService } from '../services/ParentsService'

export function useChildSummary(childId: string) {
    return useQuery<GetChildSummaryResponse, Error>({
        queryKey: ['child-summary',childId],
        queryFn: () => ParentsService.getChildInfo(childId),
        refetchOnWindowFocus: false,
        retry: false,
    })
}
