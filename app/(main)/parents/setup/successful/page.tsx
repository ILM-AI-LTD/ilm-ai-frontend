import CustomButton from "@/components/global/CustomButton"
import AssistantCallout from "@/feature/parents/setup/components/common/AssistantCallout"
import FooterParents from "@/feature/parents/setup/components/common/FooterParents"
import ILMIAssistant from "@/feature/parents/setup/components/common/ILMIAssistant"
import { CircleCheck, FileText } from "lucide-react"

const page = () => {
    return (
        <div className="h-full max-w-[1770px] w-full flex flex-col py-5">
            <div className="flex-1 flex flex-col overflow-auto">
                <div className="inline-flex  items-center">

                    <ILMIAssistant height={180} width={140} className="h-[180px] w-[140px]" />

                    <div className="mb-20">
                        <AssistantCallout
                            message="Awesome! Your timetable is ready."
                            orientation="left"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className=" text-center text-white flex flex-col items-center gap-4">
                        <CircleCheck size={60} color="white" strokeWidth={.75} fill="#82521C" />
                        <h1 className="font-bold text-[min(10vw,40px)]">Timetable Sent Successfully!</h1>
                        <p className="font-normal text-[min(10vw,18px)]">We have sent the full schedule as a PDF to your email.</p>
                    </div>

                    <div className="w-full mb-4">
                        <h1 className="font-semibold text-2xl">Child's Weekly Timetable Sumamry</h1>
                        <p className="text-base text-white py-4 border-b-1 border-b-brand-color-parent" > <span className="font-bold">Username:</span>{"  "}ilm_user_01</p>
                        <p className="text-base text-white py-4 border-b-1 border-b-brand-color-parent" > <span className="font-bold">Subject: </span>{"  "}Maths, Chemistry, Biology</p>
                        <p className="text-base text-white py-4 border-b-1 border-b-brand-color-parent" > <span className="font-bold">PDF File: </span>{"  "}Class_Timetable_ilm_user_001.pdf</p>

                        <CustomButton
                            label="Download Timetable PDF"
                            icon={<FileText size={16} />}
                            className="bg-brand-color-parent text-white rounded-3xl mt-4 py-6 hover:bg-brand-color-parent/80 hover:text-white transition-all duration-200 ease-in-out border-none"

                        />
                    </div>
                </div>

            </div>

            <FooterParents

                rightButton={{ label: "Finish & View Dashboard", }}
            />
        </div>
    )
}

export default page