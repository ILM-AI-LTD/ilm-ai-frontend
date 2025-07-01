'use client'

import { deleteCookie } from '@/lib/cookies/cookies-client'
import { useQueryClient } from '@tanstack/react-query'

export function useSignOut() {
    const qc = useQueryClient()

    const signOut = () => {

        deleteCookie('token')

        localStorage.removeItem('currentUser')
        sessionStorage.removeItem('currentUser')

        qc.removeQueries({ queryKey: ['currentParents'] })
        qc.removeQueries({ queryKey: ['currentStudents'] })
    }

    return { signOut }
}
