'use client';

import { AnimatedLearningPath } from '@/feature/students/subject/components/AnimatedLearningPath';
import { usePaper } from '@/context/PaperContext';
import Image from 'next/image';
import { physicsChapters } from '@/feature/students/subject/constants/physics';

export function ChapterList() {
    const { selectedPaper } = usePaper();
    const current = physicsChapters[selectedPaper];

    return (
        <div className='my-5'>
            {current.chapters.map((chapter, index) => (
                <div key={index} className='flex flex-col items-center gap-6 my-10' id={chapter.name.replace(/\s+/g, "-").toLowerCase()}>
                    <div className='flex flex-row items-center gap-4'>
                        <div className='flex flex-row flex-none gap-2'>
                            {[...Array(3)].map((_, i) => (
                                <Image
                                    src={"/subject/star.svg"}
                                    alt="Star Icon"
                                    width={24}
                                    height={24}
                                    priority
                                    key={i}
                                    className='size-5'
                                />
                            ))}
                        </div>
                        <p className='text-[min(10vw,30px)] font-bold text-foreground'>{chapter.name}</p>
                        <div className='flex flex-row flex-none gap-2'>
                            {[...Array(3)].map((_, i) => (
                                <Image
                                    src={"/subject/star.svg"}
                                    alt="Star Icon"
                                    width={24}
                                    height={24}
                                    priority
                                    key={i}
                                    className='size-5'
                                />
                            ))}
                        </div>
                    </div>
                    <AnimatedLearningPath chapter={chapter} />
                </div>
            ))}
        </div>
    );
}