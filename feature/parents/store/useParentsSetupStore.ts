import {create} from 'zustand'
import { persist } from 'zustand/middleware'

// Define schedule and subject types
type Schedule = {
  day: string
  startTime: string
  endTime: string
}

type Subject = {
  id: number
  subject_name: string
  schedule: Schedule[]
}

// Child details grouping
interface ChildDetails {
  fullName: string
  username: string
  password: string
}

// Store state interface
interface ParentsSetupState {
  planIndex: number | null
  ageGroup: string
  childDetails: ChildDetails
  subjects: Subject[]

  // Navigation & basic info actions
  setPlanIndex: (planIndex: number) => void
  setAgeGroup: (ageGroup: string) => void
  setChildDetails: (details: ChildDetails) => void

  // Schedule actions
  setSubjects: (subjects: Subject[]) => void
  addSubject: (subject: Subject) => void
  updateSubject: (subject: Subject) => void
  removeSubject: (id: number) => void

  // Reset entire wizard
  reset: () => void
}

// Create the Zustand store with persistence
export const useParentsSetupStore = create<ParentsSetupState>()(
  persist(
    (set) => ({
      planIndex: null,
      ageGroup: '',
      childDetails: { fullName: '', username: '', password: '' },
      subjects: [],

      setPlanIndex: (planIndex) => set({ planIndex }),
      setAgeGroup: (ageGroup) => set({ ageGroup }),
      setChildDetails: (childDetails) => set({ childDetails }),

      setSubjects: (subjects) => set({ subjects }),
      addSubject: (subject) =>
        set((state) => ({ subjects: [...state.subjects, subject] })),
      updateSubject: (subject) =>
        set((state) => ({
          subjects: state.subjects.map((s) =>
            s.id === subject.id ? subject : s
          ),
        })),
      removeSubject: (id) =>
        set((state) => ({
          subjects: state.subjects.filter((s) => s.id !== id),
        })),

      reset: () =>
        set({
          planIndex: null,
          ageGroup: '',
          childDetails: { fullName: '', username: '', password: '' },
          subjects: [],
        }),
    }),
    {
      name: 'parents-setup', // key in localStorage
      // using default localStorage
    }
  )
)
