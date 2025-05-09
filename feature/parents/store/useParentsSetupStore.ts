import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Schedule = {
  day: string
  startTime: string
  endTime: string
}

export type Subject = {
  id: number
  subject_name: string
  schedule: Schedule[]
}

export interface ChildDetails {
  fullName: string
  username: string
  password: string
}

interface ParentsSetupState {

  planIndex: number | null
  ageGroup: string
  childDetails: ChildDetails

  subjects: Subject[]

  setPlanIndex: (planIndex: number) => void
  setAgeGroup: (ageGroup: string) => void
  setChildDetails: (details: ChildDetails) => void

  toggleSubjectSchedule: (
    subjectId: number,
    entry: Schedule
  ) => void

  reset: () => void
}

export const useParentsSetupStore = create<ParentsSetupState>()(
  persist(
    (set, get) => ({

      planIndex: null,
      ageGroup: '',
      childDetails: { fullName: '', username: '', password: '' },

      subjects: [
        { id: 1, subject_name: 'Math', schedule: [] },
        { id: 2, subject_name: 'Physics', schedule: [] },
        { id: 3, subject_name: 'Chemistry', schedule: [] },
        { id: 4, subject_name: 'Biology', schedule: [] },
      ],


      setPlanIndex: (planIndex) => set({ planIndex }),
      setAgeGroup: (ageGroup) => set({ ageGroup }),
      setChildDetails: (childDetails) => set({ childDetails }),

      toggleSubjectSchedule: (subjectId, entry) => {
        set((state) => ({
          subjects: state.subjects.map((sub) => {
            if (sub.id !== subjectId) return sub

            const exists = sub.schedule.some(
              (s) =>
                s.day === entry.day &&
                s.startTime === entry.startTime &&
                s.endTime === entry.endTime
            )

            return {
              ...sub,
              schedule: exists
                ? sub.schedule.filter(
                  (s) =>
                    !(
                      s.day === entry.day &&
                      s.startTime === entry.startTime &&
                      s.endTime === entry.endTime
                    )
                )
                : [...sub.schedule, entry],
            }
          }),
        }))
      },

      reset: () =>
        set({
          planIndex: null,
          ageGroup: '',
          childDetails: { fullName: '', username: '', password: '' },
          subjects: [
            { id: 1, subject_name: 'Math', schedule: [] },
            { id: 2, subject_name: 'Physics', schedule: [] },
            { id: 3, subject_name: 'Chemistry', schedule: [] },
            { id: 4, subject_name: 'Biology', schedule: [] },
          ],
        }),
    }),
    {
      name: 'parents-setup',
    }
  )
)
