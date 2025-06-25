'use client'

import CustomButton from '@/components/global/CustomButton'
import AssistantCallout from '@/feature/parents/components/setup/common/AssistantCallout'
import FooterParents from '@/feature/parents/components/setup/common/FooterParents'
import { useChildSummary } from '@/feature/parents/hooks/useChildSummary'
import { useDownloadTimetable } from '@/feature/parents/hooks/useDownloadSchedule'
import { CircleCheck, FileText } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import ILMIAssistantv2 from '../common/ILMIAssistantv2'

export default function SuccessfulSetup() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const childId = searchParams.get('childId')!

    const { data, isPending } = useChildSummary(childId)
    const download = useDownloadTimetable(childId)
    const child = data?.data.child
    const subjects = child?.subjects.map(s => s).join(', ')

    if (isPending) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <ILMIAssistantv2 height={180} width={140} className="h-[180px] w-[140px]" />
                    <p className="text-white text-lg">Loading data…</p>
                </div>
            </div>
        )
    }


    return (

        <div className="h-full max-w-[1770px] w-full flex flex-col py-5">
            <div className="flex-1 flex flex-col overflow-auto">
                <div className="inline-flex items-center">
                    <ILMIAssistantv2 height={180} width={140} className="h-[180px] w-[140px]" />
                    <div className="mb-20">
                        <AssistantCallout
                            message="Awesome! Your timetable is ready."
                            orientation="left"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <div className="text-center text-white flex flex-col items-center gap-4">
                        <CircleCheck size={60} color="white" strokeWidth={.5} className='bg-brand-color rounded-full' />
                        <h1 className="font-bold text-[min(6vw,32px)]">
                            Timetable Sent Successfully!
                        </h1>
                        <p className="font-normal text-[min(10vw,18px)]">
                            We have sent the full schedule as a PDF to your email.
                        </p>
                    </div>

                    <div className="w-full mb-4">
                        <h1 className="font-semibold text-[min(5vw,22px)]">
                            Child's Weekly Timetable Summary
                        </h1>
                        <p className="text-base text-white py-4 border-b border-brand-color">
                            <span className="font-bold">Username:</span> {child?.username}
                        </p>
                        <p className="text-base text-white py-4 border-b border-brand-color">
                            <span className="font-bold">Subjects:</span> {subjects}
                        </p>
                        <p className="text-base text-white py-4 border-b border-brand-color">
                            <span className="font-bold">PDF File:</span> Routine.pdf
                        </p>

                        <CustomButton
                            label="Download Timetable PDF"
                            icon={<FileText size={16} />}
                            className="text-white rounded-3xl mt-4 py-6 transition ease-in-out"
                            onClick={() => download.mutate()}
                        />
                    </div>
                </div>
            </div>

            <FooterParents
                rightButton={{
                    label: "Finish & View Dashboard",
                    onClick: () => router.push('/parents/profile'),
                    disabled: false,
                    isPending: false
                }}
            />
        </div>
    )
}
