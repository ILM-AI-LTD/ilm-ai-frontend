'use client';

import { BadgeCard } from "@/feature/students/subject/components/BadgeCard";
import { ChapterList } from "@/feature/students/subject/components/ChapterList";
import { NavigationCard } from "@/feature/students/subject/components/NavigationCard";
import ScrollToTopButton from "@/feature/students/subject/components/ScrollToTopButton";
import { usePaper } from '@/context/PaperContext';
import { physicsTopics } from "@/feature/students/subject/constants/physics";
import { chemistryTopics } from "@/feature/students/subject/constants/chemistry";
import { mathTopics } from "@/feature/students/subject/constants/math";
import { biologyTopics } from "@/feature/students/subject/constants/biology";
import { useSubjectProgress } from "@/feature/students/chapters-stream/hooks/useSubjectProgress";
import { mergeProgress } from "@/lib/utils";
import { use } from 'react';

interface PageProps {
  params: Promise<{ subject: string }>;
}

const subjectMap = {
  physics: physicsTopics,
  chemistry: chemistryTopics,
  math: mathTopics,
  biology: biologyTopics,
};

const page = ({ params }: PageProps) => {
  const { subject } = use(params);
  const progress = 0;

  const { selectedPaper } = usePaper();

  console.log("first render  " + selectedPaper);

  const paper = selectedPaper === 'paper1' ? 1 : 2;

  const { data, isLoading } = useSubjectProgress("AQA", subject, paper);

  const rawData = subjectMap[subject as keyof typeof subjectMap][selectedPaper];

  const mergedData = data?.data?.topics ? mergeProgress(rawData, data.data.topics) : rawData;
  
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="order-2 lg:order-1 w-full lg:w-2/3 2xl:w-3/4">
          <ChapterList topics={mergedData.topics} subject={subject as "physics" | "chemistry" | "math" | "biology"} />
        </div>

        <div className="order-1 lg:order-2 w-full lg:w-1/3 2xl:w-1/4">
          <div className="flex flex-col md:flex-row lg:flex-col gap-4 lg:sticky lg:top-30 h-fit justify-center items-center md:items-start lg:items-end">
            <NavigationCard subject={subject as "physics" | "chemistry" | "math" | "biology"} />
            <BadgeCard subject={subject} progress={progress} />
          </div>
        </div>
      </div>

      <ScrollToTopButton />
    </div>
  );
};

export default page;