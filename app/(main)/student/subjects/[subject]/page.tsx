import React from 'react';
import ScrollToTopButton from '@/feature/students/subject/components/ScrollToTopButton';
import { ChapterList } from '@/feature/students/subject/components/ChapterList';
import { NavigationCard } from '@/feature/students/subject/components/NavigationCard';
import { BadgeCard } from '@/feature/students/subject/components/BadgeCard';

interface PageProps {
    params: Promise<{ subject: string }>;
}

const page = async ({ params }: PageProps) => {
    const { subject } = await params;
    const progress = 50;

    return (

        <div>
            <div className=" flex flex-row  mx-auto gap-3 ">
                <ChapterList />

                {/* <div className=" flex flex-col items-center gap-10 basis-1/3 flex-auto"> */}
                <div className=" flex flex-col items-center gap-10 basis-1/3 sticky top-30 h-fit">

                    <NavigationCard />
                    <BadgeCard subject={subject} progress={progress} />


                </div>
            </div>


            <ScrollToTopButton />
        </div>
    )
}

export default page;
