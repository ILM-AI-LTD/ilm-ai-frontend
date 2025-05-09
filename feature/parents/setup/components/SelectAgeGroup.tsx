"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { useParentsSetupStore } from "../../store/useParentsSetupStore"
import AssistantCallout from "./common/AssistantCallout"
import FooterParents from "./common/FooterParents"
import ILMIAssistant from "./common/ILMIAssistant"

interface AgeGroupOptionProps {
    value: string;
    label: string;
}

const AgeGroupOption = ({ value, label }: AgeGroupOptionProps) => {
    return (
        <div className="flex items-center space-x-2">
            <RadioGroupItem value={value} id={value} />
            <Label htmlFor={value} className="text-white font-normal text-[min(10vw,20px)] mb-[5px]">
                {label}
            </Label>
        </div>
    );
};

interface SelectAgeGroupProps {
    onNext: () => void;
    onBack: () => void;
}

const SelectAgeGroup = ({ onNext, onBack }: SelectAgeGroupProps) => {
    const persisted = useParentsSetupStore((s) => s.ageGroup);
    const setAgeGroup = useParentsSetupStore((s) => s.setAgeGroup);

    const [ageGroup, setLocalAgeGroup] = useState<string>(persisted);

    const handleAgeGroupChange = (value: string) => {
        setLocalAgeGroup(value);
        setAgeGroup(value);
    };

    return (
        <div className="h-full max-w-[1770px] w-full flex flex-col py-5">
            <div className="flex-1 flex flex-col justify-between overflow-auto">
                <div className="inline-flex  items-center">
                    <ILMIAssistant height={180} width={140} className="h-[180px] w-[140px]" />

                    <div className="mb-20">
                        <AssistantCallout
                            message="Thanks! Now choose your child’s age group so I can tailor the content."
                            orientation="left"
                        />
                    </div>
                </div>

                <div className="w-full inline-flex justify-center">
                    <RadioGroup
                        value={ageGroup}
                        onValueChange={handleAgeGroupChange}
                        className="flex flex-col lg:flex-row gap-4"
                    >
                        <AgeGroupOption value="Year 1–2 (Key Stage 1)" label="Year 1–2 (Key Stage 1)" />
                        <AgeGroupOption value="Year 3–6 (Key Stage 2)" label="Year 3–6 (Key Stage 2)" />
                        <AgeGroupOption value="Year 7–8 (Key Stage 3)" label="Year 7–8 (Key Stage 3)" />
                        <AgeGroupOption value="Year 9–11 (GCSE Level)" label="Year 9–11 (GCSE Level)" />
                        <AgeGroupOption value="Year 12–13 (A-Level)" label="Year 12–13 (A-Level)" />
                    </RadioGroup>
                </div>

                <div></div>
            </div>

            <FooterParents
                leftButton={{ label: "Back", onClick: onBack }}
                rightButton={{ label: "Next", onClick: onNext, disabled: ageGroup === "" }}
            />
        </div>
    );
};

export default SelectAgeGroup;
