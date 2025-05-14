import { ChildDetails, Schedule, Subject } from '@/types/parents'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'



interface ParentsSetupState {

  childDetails: ChildDetails

  subjects: Subject[]

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

      childDetails: {
        fullName: '',
        username: '',
        ageGroup: '',
        password: ''
      },

      subjects: [
        { id: 1, subject_name: 'Math', schedule: [] },
        { id: 2, subject_name: 'Physics', schedule: [] },
        { id: 3, subject_name: 'Chemistry', schedule: [] },
        { id: 4, subject_name: 'Biology', schedule: [] },
      ],


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
          childDetails: {
            fullName: '',
            username: '',
            ageGroup: '',
            password: ''
          },
          
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
