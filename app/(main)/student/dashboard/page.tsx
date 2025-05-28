import { subjects } from '@/constants/Helpers';
import SubjectCard from '@/feature/landing/components/subjectCover/SubjectCard';
import ILMIAssistantv2 from '@/feature/parents/components/setup/common/ILMIAssistantv2';
import { EB_Garamond } from 'next/font/google';

const eBGaramondfont = EB_Garamond({
    subsets: ['latin'],
    weight: "700",

})

const page = () => {
    return (
        <>
            <p className="text-white font-bold text-[min(10vw,36px)]">Subjects</p>
            <div className="grid grid-cols-3 gap-4 items-center">
                <div className='grid col-span-2 md:grid-cols-2 bg-primary-bg-color rounded-4xl gap-4'>
                    {
                        subjects.map((subject, index) => (
                            <SubjectCard
                                key={index}
                                title={subject.title}
                                description={subject.description}
                                iconSrc={subject.iconSrc}
                            />
                        ))
                    }
                </div>
                <div className=" flex  justify-end">
                    {/* <ILMIAssistantv2 height={151} width={326} className="h-[151px] w-[326px]" /> */}
                    <ILMIAssistantv2 height={300} width={648} className="h-[300px] w-[648px]" />
                </div>
            </div>
            {/* ================================================ */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center px-4 py-8">
                
                <div className="rounded-full bg-[#0B2C3F] shadow-[0px_8px_0px_0px_#444] text-white px-6 py-4 w-[250px] flex items-center justify-center gap-2 text-lg font-semibold">
                    <img src="/start-learning-icon.svg" alt="Start Learning" className="w-6 h-6" />
                    Start Learning
                </div>

                
                <div className="rounded-full bg-[#0B2C3F] shadow-[0px_8px_0px_0px_#444] text-white px-6 py-4 w-[250px] flex items-center justify-center gap-2 text-lg font-semibold">
                    Submit Work
                </div>

                
                <div className="rounded-full bg-[#0B2C3F] shadow-[0px_8px_0px_0px_#444] text-white px-6 py-4 w-[250px] flex items-center justify-center gap-2 text-lg font-semibold">
                    <img src="/practice-icon.svg" alt="Practice" className="w-6 h-6" />
                    Practice & Test
                </div>

                
                <div className="rounded-full bg-[#0B2C3F] shadow-[0px_8px_0px_0px_#444] text-white px-6 py-4 w-[250px] flex items-center justify-center gap-2 text-lg font-semibold">
                    <img src="/hub-icon.svg" alt="ILM Hub" className="w-6 h-6" />
                    ILM Hub
                </div>
            </div> */}
            {/* <div className="grid grid-cols-5 grid-flow-row gap-4 "> */}


            {/*--------------------  ---------------  */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-5 grid-flow-row lg:gap-y-20 lg:md:mt-5 gap-4">
                <div className=""></div>
                <div className=""></div>
                <div className=""></div>
                <div className="row-span-2 rounded-full bg-[#011D30] shadow-[0px_8px_0px_0px_#444] text-white px-6 py-4 mx-auto w-[300px] flex items-center justify-center gap-2 text-lg font-semibold">
                    <img src="/Submit_Work_icon.gif" alt="ILM Hub" className="w-20 h-20" />
                    Submit Work
                </div>
                <div className=""></div>
                <div className=""></div>
                <div className="row-span-2 mx-auto rounded-full bg-[#011D30] shadow-[0px_8px_0px_0px_#444] text-white px-6 py-4 w-[300px] flex items-center justify-center gap-2 text-lg font-semibold">
                    <img src="/Start_Learning_icon.gif" alt="ILM Hub" className="w-20 h-20" />
                    Start Learning</div>
                <div className=""></div>
                <div className=""></div>
                <div className=""></div>
                <div className="row-span-2 mx-auto rounded-full bg-[#011D30] shadow-[0px_8px_0px_0px_#444] text-white px-6 py-4 w-[300px] flex items-center justify-center gap-2 text-lg font-semibold">
                    <img src="/ILM_Hub_icon.gif" alt="ILM Hub" className="w-20 h-20" />
                    ILM Hub</div>
                <div className=""></div>
                <div className=""></div>
                <div className="row-span-2 mx-auto rounded-full bg-[#011D30] shadow-[0px_8px_0px_0px_#444] text-white px-6 py-4 w-[300px] flex items-center justify-center gap-2 text-lg font-semibold">
                    <img src="/Practise_icon.gif" alt="ILM Hub" className="w-20 h-20" />
                    Practice & Test</div>

                <div className=""></div>
                <div className=""></div>
                <div className=""></div>
                <div className=""></div>
            </div > */}

            {/* ----------------------   ------------*/}
            {/* <div className="grid grid-cols-1 sm:grid-cols-5 grid-flow-row lg:gap-y-20 gap-y-10 md:gap-y-16 lg:mt-5 gap-x-4 ">

                <div className=""></div>
                <div className=""></div>
                <div className=""></div>
                <div className=""></div>
                <div className=""></div>


                <div className="sm:col-start-4 row-span-2 rounded-full bg-[#011D30] shadow-[0px_8px_0px_0px_#444] text-white px-6 py-4 mx-auto w-[300px] flex items-center justify-center gap-2 text-lg font-semibold">
                    <img src="/Submit_Work_icon.gif" alt="Submit Work" className="w-20 h-20" />
                    Submit Work
                </div>


                <div className=""></div>
                <div className=""></div>


                <div className="sm:col-start-2 row-span-2 mx-auto rounded-full bg-[#011D30] shadow-[0px_8px_0px_0px_#444] text-white px-6 py-4 w-[300px] flex items-center justify-center gap-2 text-lg font-semibold">
                    <img src="/Start_Learning_icon.gif" alt="Start Learning" className="w-20 h-20" />
                    Start Learning
                </div>


                <div className=""></div>
                <div className=""></div>
                <div className=""></div>


                <div className="sm:col-start-4 row-span-2 mx-auto rounded-full bg-[#011D30] shadow-[0px_8px_0px_0px_#444] text-white px-6 py-4 w-[300px] flex items-center justify-center gap-2 text-lg font-semibold">
                    <img src="/ILM_Hub_icon.gif" alt="ILM Hub" className="w-20 h-20" />
                    ILM Hub
                </div>


                <div className=""></div>
                <div className=""></div>


                <div className="sm:col-start-2 row-span-2 mx-auto rounded-full bg-[#011D30] shadow-[0px_8px_0px_0px_#444] text-white px-6 py-4 w-[300px] flex items-center justify-center gap-2 text-lg font-semibold">
                    <img src="/Practise_icon.gif" alt="Practice & Test" className="w-20 h-20" />
                    Practice & Test
                </div>


                <div className=""></div>
                <div className=""></div>
                <div className=""></div>
                <div className=""></div>
            </div> */}

        </>
    )
}

export default page