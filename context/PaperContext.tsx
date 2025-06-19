'use client';

import { createContext, useContext, useState, ReactNode } from 'react'

type PaperType = "paper1" | "paper2"

interface PaperContextType {
    selectedPaper: PaperType
    setSelectedPaper: (paper: PaperType) => void
}

const PaperContext = createContext<PaperContextType | undefined>(undefined)

export function PaperProvider({ children }: { children: ReactNode }) {
    const [selectedPaper, setSelectedPaper] = useState<PaperType>("paper1")

    return (
        <PaperContext.Provider value={{ selectedPaper, setSelectedPaper }}>
            {children}
        </PaperContext.Provider>
    )
}

export function usePaper() {
    const context = useContext(PaperContext)
    if (context === undefined) {
        throw new Error('usePaper must be used within a PaperProvider')
    }
    return context
}