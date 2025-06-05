import { subjects } from '@/constants/Helpers';
// import SubjectCard from '@/feature/landing/components/subjectCover/SubjectCard';
import ILMIAssistantv2 from '@/feature/parents/components/setup/common/ILMIAssistantv2';
import SubjectCard from '@/feature/students/components/dashboard/common/SubjectCard/SubjectCard';
import { EB_Garamond } from 'next/font/google';
import Image from 'next/image';

const eBGaramondfont = EB_Garamond({
    subsets: ['latin'],
    weight: "700",

})

const page = () => {
    return (
        <>
            {/* <div className={`${eBGaramondfont.className} `}> */}
            <div>
                <div className='flex'>
                    <p className="text-white font-bold text-[min(10vw,36px)]">Subjects</p>
                    <Image
                        src={"/Subject_logo.gif"}
                        alt={'subject'}
                        height={58}
                        width={58}
                    // className="w-[80px] h-[80px] 2xl:w-[100px] 2xl:h-[100px]"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                    <div className="flex justify-end items-end md:justify-center md:items-center order-1 md:order-2">
                        <ILMIAssistantv2 height={326} width={151} className="h-[326px] w-[151px]" />
                    </div>

                    <div className="max-w-[1170px] grid col-span-2 sm:grid-cols-2 bg-primary-bg-color rounded-4xl gap-4 order-2 md:order-1">
                        {subjects.map((subject, index) => (
                            <SubjectCard
                                key={index}
                                title={subject.title}
                                description={subject.description}
                                iconSrc={subject.iconSrc}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default page