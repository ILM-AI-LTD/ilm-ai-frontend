"use client"

import MultiChildPlan from '@/components/global/MultiChildPlan'
import SingleChildPlan from '@/components/global/SingleChildPlan'
import { useState } from 'react'
import { useParentsSetupStore } from '../../store/useParentsSetupStore'
import AssistantCallout from './common/AssistantCallout'
import FooterParents from './common/FooterParents'
import ILMIAssistant from './common/ILMIAssistant'
import PlanCard from './common/PlanCard'

interface ChoosePlanProps {
    onNext: () => void
    onBack: () => void
}


const ChoosePlan = ({ onNext, onBack }: ChoosePlanProps) => {

    const plans = [
        { Icon: SingleChildPlan, title: 'Perfect for one learner' },
        { Icon: MultiChildPlan, title: 'Manage multiple children under one account' },
    ]

    const persisted = useParentsSetupStore((s) => s.planIndex)
    const setPlanIndex = useParentsSetupStore((s) => s.setPlanIndex)

    const [selected, setSelected] = useState<number | null>(persisted)

    const handlePlanSelect = (index: number) => {
        setSelected(index)
        setPlanIndex(index)
    }

    return (
        <div className='h-full max-w-[1770px] w-full flex flex-col py-5'>
            <div className='flex-1 flex flex-col justify-between overflow-auto'>

                <div className='inline-flex  items-center'>
                    <ILMIAssistant
                        height={180}
                        width={140}
                        className='h-[180px] w-[140px]'
                    />

                    <div className='mb-20'>
                        <AssistantCallout
                            message="Choose Your Plan"
                            orientation="left"
                        />
                    </div>
                </div>


                <div className='flex flex-col md:flex-row items-center justify-center gap-6'>
                    {plans.map(({ Icon, title }, i) => (
                        <PlanCard
                            key={i}
                            title={title}
                            Icon={Icon}
                            isSelected={selected === i}
                            onClick={() => handlePlanSelect(i)}
                        />
                    ))}
                </div>

                <div></div>

                <div></div>
            </div>



            <FooterParents
                leftButton={{ label: "Back", onClick: onBack }}
                rightButton={{ label: "Next", onClick: onNext, disabled: selected === null }}
            />
        </div>
    )
}

export default ChoosePlan