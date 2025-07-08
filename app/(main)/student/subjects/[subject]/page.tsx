import { BadgeCard } from "@/feature/students/subject/components/BadgeCard";
import { ChapterList } from "@/feature/students/subject/components/ChapterList";
import { NavigationCard } from "@/feature/students/subject/components/NavigationCard";
import ScrollToTopButton from "@/feature/students/subject/components/ScrollToTopButton";

interface PageProps {
  params: Promise<{ subject: string }>;
}

const page = async ({ params }: PageProps) => {
  const { subject } = await params;
  const progress = 50;

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="order-2 lg:order-1 w-full lg:w-2/3">

          <ChapterList subject={subject as "physics" | "chemistry" | "math" | "biology"} />

        </div>
        <div className="order-1 lg:order-2 w-full lg:w-1/3">
          <div className="flex flex-col md:flex-row lg:flex-col gap-4 lg:sticky lg:top-30 h-fit justify-center items-center md:items-start">
            <NavigationCard subject={subject as "physics" | "chemistry" | "math" | "biology"}/>
            <BadgeCard subject={subject} progress={progress} />
          </div>
        </div>
      </div>

      <ScrollToTopButton />
    </div>
  );
};

export default page;
