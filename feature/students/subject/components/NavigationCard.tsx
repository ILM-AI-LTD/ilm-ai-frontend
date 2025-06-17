'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from 'next/image';
import { IconComponent } from '@/feature/students/subject/components/IconComponent';
import { usePaper } from '@/context/PaperContext';
import { physicsChapters } from '@/feature/students/subject/constants/physics';

export function NavigationCard() {
    const { selectedPaper, setSelectedPaper } = usePaper();
    const current = physicsChapters[selectedPaper];

    const scrollToMainChapter = (chapterName: string) => {
        const id = chapterName.replace(/\s+/g, "-").toLowerCase();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className='max-w-[320px] lg:w-[320px]'>
            <Card className="w-full p-3 md:p-6 rounded-[20px] flex flex-col gap-6 border border-card-border-color bg-primary-bg-color shadow-none">
                <CardHeader className="p-0 space-y-0 flex flex-col gap-6 justify-center items-center">
                    <Image
                        src={"/subject/navigation.gif"}
                        width={114}
                        height={114}
                        alt="Navigation GIF"
                    />
                </CardHeader>
                <CardContent className="p-0 w-full">
                    <div className="flex justify-evenly items-center gap-2 mb-6">
                        <button
                            onClick={() => setSelectedPaper("paper1")}
                            className={`px-4 py-2 transition-all duration-300 ease-in-out lg:rounded-full sm:rounded-[10px] ${selectedPaper === "paper1"
                                ? 'text-white bg-button-hover-color shadow-[0px_5px_0px_0px_#006D98]'
                                : 'bg-[#020617] text-[#83899B] shadow-[0px_5px_0px_0px_#444] hover:scale-105 hover:text-white hover:bg-button-hover-color hover:shadow-[0px_5px_0px_0px_#006D98]'
                                }`}
                        >
                            Paper 1
                        </button>
                        <button
                            onClick={() => setSelectedPaper("paper2")}
                            className={`px-4 py-2 transition-all duration-300 ease-in-out lg:rounded-full sm:rounded-[10px] ${selectedPaper === "paper2"
                                ? 'text-white bg-button-hover-color shadow-[0px_5px_0px_0px_#006D98]'
                                : 'bg-[#020617] text-[#83899B] shadow-[0px_5px_0px_0px_#444] hover:scale-105 hover:text-white hover:bg-button-hover-color hover:shadow-[0px_5px_0px_0px_#006D98]'
                                }`}
                        >
                            Paper 2
                        </button>
                    </div>
                    {current.chapters.map((chapter, index) => (
                        <div key={index} className='flex gap-6 mb-4'>
                            <div><IconComponent iconName={chapter.icon} width={24} height={24} /></div>
                            <div
                                className='text-white font-bold cursor-pointer'
                                onClick={() => scrollToMainChapter(chapter.name)}
                            >
                                {chapter.name}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}