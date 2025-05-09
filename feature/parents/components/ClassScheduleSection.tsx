import ClassScheduleTable from "./ClassScheduleTable"
import AssistantCallout from "./common/AssistantCallout"
import FooterParents from "./common/FooterParents"
import ILMIAssistant from "./common/ILMIAssistant"

interface ClassScheduleSectionProps {
    onNext: () => void
    onBack: () => void
}

const ClassScheduleSection = ({ onNext, onBack }: ClassScheduleSectionProps) => {
    return (
        <div className='h-full max-w-[1770px] w-full flex flex-col py-3'>
            <div className='flex-1 flex flex-col overflow-auto'>
                <div className='inline-flex  items-center'>
                    <ILMIAssistant
                        height={180}
                        width={140}
                        className='h-[180px] w-[140px]'
                    />

                    <div className='mb-20'>
                        <AssistantCallout
                            message="Let’s enroll your child in subjects and set a weekly schedule."
                            orientation="left"
                        />
                    </div>
                </div>

                <div className="w-full inline-flex justify-center mb-4">
                    <ClassScheduleTable />
                </div>
            </div>

            <FooterParents
                leftButton={{ label: "Back", onClick: onBack }}
                rightButton={{ label: "Next", }}
            />
        </div>
    )
}

export default ClassScheduleSection

