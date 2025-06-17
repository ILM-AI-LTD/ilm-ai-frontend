'use client';

import { AnimatedLearningPath } from '@/feature/students/subject/components/AnimatedLearningPath';
import { usePaper } from '@/context/PaperContext';
import Image from 'next/image';
import { physicsChapters } from '@/feature/students/subject/constants/physics';

export function ChapterList() {
    const { selectedPaper } = usePaper();
    const current = physicsChapters[selectedPaper];

    return (
        <div className='space-y-16 basis-2/3'>
            {current.chapters.map((chapter, index) => (
                <div key={index} className='flex flex-col items-center' id={chapter.name.replace(/\s+/g, "-").toLowerCase()}>
                    <div className='flex gap-4'>
                        <div className='flex flex-row flex-none gap-2'>
                            {[...Array(3)].map((_, i) => (
                                <Image
                                    src={"/subject/star.svg"}
                                    alt="Star Icon"
                                    width={24}
                                    height={24}
                                    priority
                                    key={i}
                                />
                            ))}
                        </div>
                        <div className='flex-initial text-center'><h2 className='text-4xl font-bold'>{chapter.name}</h2></div>
                        <div className='flex flex-row flex-none gap-2'>
                            {[...Array(3)].map((_, i) => (
                                <Image
                                    src={"/subject/star.svg"}
                                    alt="Star Icon"
                                    width={24}
                                    height={24}
                                    priority
                                    key={i}
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