// 'use client';

import { AnimatedLearningPath } from '@/feature/students/subject/components/AnimatedLearningPath';
import { physicsChapters } from '@/feature/students/subject/constants/physics';
// import { useParams } from 'next/navisgation';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { IconComponent } from '@/feature/students/subject/components/IconComponent';
import ScrollToTopButton from '@/feature/students/subject/components/ScrollToTopButton';
// import { usePaper } from '@/context/PaperContext';
import { capitalizeFirstLetter } from '@/lib/utils';
import { ChapterList } from '@/feature/students/subject/components/ChapterList';
import { NavigationCard } from '@/feature/students/subject/components/NavigationCard';
import { BadgeCard } from '@/feature/students/subject/components/BadgeCard';
import { fetchPaper } from '@/feature/students/subject/utils/layoutUtils';
// import { usePaper } from '@/context/PaperContext';

interface PageProps {
    params: Promise<{ subject: string }>;
}
// const page = () => {
const page = async ({ params }: PageProps) => {
    const { subject } = await params;
    const progress = 50;

    // const searchParams = useSearchParams();
    // const name = searchParams.get('subject');
    // const { subject } = useParams();

    // const [selectedPaper, setSelectedPaper] = useState<"paper1" | "paper2">("paper1")
    // const { selectedPaper, setSelectedPaper } = usePaper();

    // const selectedPaper = fetchPaper();

    // const current = physicsChapters[selectedPaper]

    // const progress = 50;

    // const scrollToMainChapter = (chapterName: string) => {
    //     const id = chapterName.replace(/\s+/g, "-").toLowerCase();
    //     const element = document.getElementById(id);
    //     if (element) {
    //         element.scrollIntoView({ behavior: "smooth", block: "start" });
    //     }
    // };

    return (

        <div>
            <div className=" flex flex-row  mx-auto gap-3 ">

                {/* <div className='space-y-16 basis-2/3'>
                    {current.chapters.map((chapter, index) => (
                        <div key={index} className='flex flex-col items-center' id={chapter.name.replace(/\s+/g, "-").toLowerCase()}>
                            <div className='flex gap-4'>
                                <div className='flex flex-row flex-none gap-2'>
                                    {[...Array(3)].map((_, i) => (
                                        <Image
                                            src={"/subject/star.svg"}
                                            alt="Zap Icon"
                                            width={24}
                                            height={24}
                                            priority
                                        />
                                    ))}
                                </div>

                                <div className='flex-initial text-center'><h2 className='text-4xl font-bold'>{chapter.name}</h2></div>
                                <div className='flex flex-row flex-none gap-2'>
                                    {[...Array(3)].map((_, i) => (
                                        <Image
                                            src={"/subject/star.svg"}
                                            alt="Zap Icon"
                                            width={24}
                                            height={24}
                                            priority
                                        />
                                    ))}
                                </div>
                            </div>

                            <AnimatedLearningPath chapter={chapter} />

                        </div>
                    ))}
                </div> */}
                <ChapterList />

                {/* <div className=" flex flex-col items-center gap-10 basis-1/3 flex-auto"> */}
                <div className=" flex flex-col items-center gap-10 basis-1/3 sticky top-30 h-fit">
                    {/* <div className='max-w-[320px]  lg:w-[320px]'>
                        <Card className="w-full p-3 md:p-6 rounded-[20px] flex flex-col gap-6 border border-card-border-color bg-primary-bg-color shadow-none">

                            <CardHeader className="p-0 space-y-0 flex flex-col gap-6 justify-center items-center">
                                <Image
                                    src={"/subject/navigation.gif"}
                                    width={114}
                                    height={114}
                                    alt="ILM Logo"
                                />
                            </CardHeader>

                            <CardContent className="p-0 w-full">
                                <div className="flex justify-evenly items-center gap-2 mb-6">
                                    <button onClick={() => setSelectedPaper("paper1")} className={`px-4 py-2 transition-all 
                                duration-300 ease-in-out lg:rounded-full sm:rounded-[10px] ${selectedPaper === "paper1"
                                            ? 'text-white bg-button-hover-color shadow-[0px_5px_0px_0px_#006D98]'
                                            : 'bg-[#020617] text-[#83899B] shadow-[0px_5px_0px_0px_#444] hover:scale-105 hover:text-white hover:bg-button-hover-color hover:shadow-[0px_5px_0px_0px_#006D98]'
                                        }`}>
                                        Paper 1
                                    </button>
                                    <button onClick={() => setSelectedPaper("paper2")} className={`px-4 py-2 transition-all 
                                duration-300 ease-in-out lg:rounded-full sm:rounded-[10px] ${selectedPaper === "paper2"
                                            ? 'text-white bg-button-hover-color shadow-[0px_5px_0px_0px_#006D98]'
                                            : 'bg-[#020617] text-[#83899B] shadow-[0px_5px_0px_0px_#444] hover:scale-105 hover:text-white hover:bg-button-hover-color hover:shadow-[0px_5px_0px_0px_#006D98]'
                                        }`}>
                                        Paper 2
                                    </button>
                                </div>
                                {current.chapters.map((chapter, index) => (
                                    <div key={index} className='flex gap-6 mb-4'>
                                        <div><IconComponent iconName={chapter.icon} width={24} height={24} /></div>
                                        <div className='text-white font-bold cursor-pointer' onClick={() => scrollToMainChapter(chapter.name)}>
                                            {chapter.name}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>

                        </Card>
                    </div> */}

                    {/* <Card className="max-w-[320px] w-full p-3 md:p-6 rounded-[20px] flex flex-col gap-6 border border-card-border-color bg-primary-bg-color shadow-none">

                        <CardHeader className="flex flex-col justify-center items-center">
                            <p className=' text-2xl text-white flex items-center font-bold'>Badge</p>
                        </CardHeader>

                        <CardContent className='p-10 bg-[#020617] text-white rounded-full shadow-md  flex flex-col items-center gap-2 group'>
                            
                            <div className="relative size-28  group-hover:scale-105 transition-transform">
                                <Image
                                    src="/subject/badge.svg"
                                    alt="Colored"
                                    width={28}
                                    height={28}
                                    className="absolute size-30 inset-0  object-cover"
                                />
                                <Image
                                    src="/subject/badge.svg"
                                    alt="Grayscale"
                                    width={28}
                                    height={28}
                                    className="absolute inset-0 size-30 object-cover grayscale pointer-events-none"
                                    style={{
                                        maskImage: `linear-gradient(to bottom, transparent ${progress}%, black ${progress}%)`,
                                        WebkitMaskImage: `linear-gradient(to bottom, transparent ${progress}%, black ${progress}%)`,
                                    }}
                                />
                            </div>
                            <p className=' text-xl text-center font-bold'>{capitalizeFirstLetter(subject ? String(subject) : '')} Master</p>
                            

                        </CardContent>

                    </Card> */}
                    <NavigationCard />
                    <BadgeCard subject={subject} progress={progress} />


                </div>
            </div>


            <ScrollToTopButton />
        </div>
    )
}

export default page;
