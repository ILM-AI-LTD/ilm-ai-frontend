'use client'

import { deleteCookie } from '@/lib/cookies/cookies-client'
import { useQueryClient } from '@tanstack/react-query'

export function useSignOut() {
    const qc = useQueryClient()

    const signOut = () => {

        deleteCookie('token')

        localStorage.removeItem('currentUser')
        sessionStorage.removeItem('currentUser')

        localStorage.removeItem('parents-setup')
        localStorage.removeItem('students-setup')

        qc.removeQueries({ queryKey: ['currentParents'] })
        qc.removeQueries({ queryKey: ['currentStudents'] })
    }

    return { signOut }
}
