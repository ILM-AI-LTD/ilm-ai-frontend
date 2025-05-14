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
    ageGroup: string
    password: string
}