// import AssistantCallout from './common/AssistantCallout'
// import FooterParents from './common/FooterParents'
// import ILMIAssistant from './common/ILMIAssistant'

// import AssistantCallout from "@/feature/students/components/setup/common/AssistantCallout"
// import FooterParents from "@/feature/parents/components/setup/common/FooterParents"
// import ILMIAssistant from "@/feature/parents/components/setup/common/ILMIAssistant"

'use client'

import React, { useEffect, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { CircleCheck, CpuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import FooterStudents from "./common/FooterStudents";
import AssistantCallout from "./common/AssistantCallout";
import { boards } from "@/constants/Helpers";
import { useRouter } from "next/navigation";
import { BoardResponse } from "@/types/student";
// import { useRouter } from "next/router";
// import { Router } from "next/router";

interface BoardProps {
    onNext: () => void
    onBack: () => void
}

const Board = ({ onBack, onNext }: BoardProps) => {
    const router = useRouter()

    const [selectedOption, setSelectedOption] = useState<BoardResponse | null>(null);

    // Load from localStorage on component mount
    useEffect(() => {
        const savedSelection = localStorage.getItem('selectedBoard');
        if (savedSelection) {
            try {
                setSelectedOption(JSON.parse(savedSelection));
            } catch (e) {
                console.error('Failed to parse saved selection', e);
            }
        }
    }, []);

    // Save to localStorage when selection changes
    useEffect(() => {
        if (selectedOption) {
            localStorage.setItem('selectedBoard', JSON.stringify(selectedOption));
        } else {
            localStorage.removeItem('selectedBoard');
        }
    }, [selectedOption]);

    const handleSelect = (option: BoardResponse) => {
        setSelectedOption(prev =>
            prev?.id === option.id ? null : option
        );
    };


    return (
        <div className='h-full max-w-[1770px] w-full flex flex-col py-3'>
            <div className='flex-1 flex flex-col overflow-auto'>
                <div className='inline-flex  items-center'>
                    <ILMIAssistantv2
                        height={180}
                        width={140}
                        className='h-[180px] w-[140px]'
                    />

                    <div className='mb-20'>
                        <AssistantCallout
                            message="Select the Board"
                            orientation="left"
                        />
                    </div>
                </div>


                <div
                    className={`mx-auto max-w-[800px] grid bg-primary-bg-color rounded-4xl gap-4 lg:grid-cols-4`
                    }
                >
                    {boards.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(option)}
                            className={`relative p-4 cursor-pointer transition-all 
                                duration-300 ease-in-out rounded-full bg-[#020617] 
                                shadow-[0px_8px_0px_0px_#444]
                                hover:scale-105 hover:bg-[#19BDFF]
                                hover:shadow-[0px_8px_0px_0px_#0077cc]
                                ${selectedOption?.id === option.id ? 'ring-2 ring-white' : ''}`
                            }
                        >
                            {selectedOption?.id === option.id && (
                                <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-blue-500 stroke-white z-10" />
                            )}
                            <div className=" text-white  flex items-center justify-center gap-2 text-lg font-semibold">
                                {option.name}
                            </div>
                        </div>
                    ))}
                </div>


            </div>


            <FooterStudents
                leftButton={{ label: "Back", onClick: onBack }}
                // rightButton={{ label: "Next", onClick: handleSubmit, disabled: Object.keys(errors).length > 0 || Object.keys(touched).length === 0 }}
                rightButton={{
                    label: "Finish & View Dashboard",
                    onClick: () => router.push('/student/dashboard'),
                    disabled: false,
                    isPending: false
                }}
            />
        </div>
    )
}

export default Board