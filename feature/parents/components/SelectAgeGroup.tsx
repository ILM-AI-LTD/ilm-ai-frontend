import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import AssistantCallout from "./common/AssistantCallout"
import FooterParents from "./common/FooterParents"
import ILMIAssistant from "./common/ILMIAssistant"

const SelectAgeGroup = () => {
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
                            message="Thanks! Now choose your child’s age group so I can tailor the content."
                            orientation="left"
                        />
                    </div>
                </div>

                <div className="w-full inline-flex justify-center">
                    <RadioGroup defaultValue="option-one" className="flex flex-col lg:flex-row gap-6">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Year 1–2 (Key Stage 1)" id="Year 1–2 (Key Stage 1)" />
                            <Label htmlFor="option-one" className="text-white font-normal text-[min(10vw,20px)] mb-[5px] ">Year 1–2 (Key Stage 1)</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Year 3–6 (Key Stage 2)" id="Year 3–6 (Key Stage 2)" />
                            <Label htmlFor="option-one" className="text-white font-normal text-[min(10vw,20px)] mb-[5px]">Year 3–6 (Key Stage 2)</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Year 7–8 (Key Stage 3)" id="Year 7–8 (Key Stage 3)" />
                            <Label htmlFor="option-one" className="text-white font-normal text-[min(10vw,20px)] mb-[5px]">Year 7–8 (Key Stage 3)</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Year 9–11 (GCSE Level)" id="Year 9–11 (GCSE Level)" />
                            <Label htmlFor="option-one" className="text-white font-normal text-[min(10vw,20px)] mb-[5px]">Year 9–11 (GCSE Level)</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Year 12–13 (A-Level)" id="Year 12–13 (A-Level)"/>
                            <Label htmlFor="option-one" className="text-white font-normal text-[min(10vw,20px)] mb-[5px]">Year 12–13 (A-Level)</Label>
                        </div>

                    </RadioGroup>
                </div>

                <div></div>
            </div>



            <FooterParents
                leftButton={{ label: "Back" }}
                rightButton={{ label: "Next" }}
            />
        </div>

    )
}

export default SelectAgeGroup