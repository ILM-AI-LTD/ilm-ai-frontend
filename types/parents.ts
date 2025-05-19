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

export type ParentsSetupDto = {
    childDetails: ChildDetails
    subjects: Subject[]
}

export type ParentsSetupResponse = {
    status: string
    message: string
    data: {
      child:{
        _id: string
        fullName: string
        username: string
      }
    }
}

export type GetChildSummaryResponse = {
    status: string
    data: {
      child:{
        _id: string
        fullName: string
        username: string
        ageGroup: string
        password: string
        subjects: Subject[]
      }
    }
}