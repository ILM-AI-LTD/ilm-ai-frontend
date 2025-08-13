import { AnimatedLearningPath } from "@/feature/students/subject/components/AnimatedLearningPath";
import { Topic } from "@/types/student";
import Image from "next/image";

interface TopicListProps {
  topics: Topic[];
  subject: "physics" | "chemistry" | "math" | "biology";
}

export function ChapterList({ topics, subject }: TopicListProps) {
  return (
    <div>
      {topics.map((topic, index) => (
        <div
          key={topic.topic_id}
          className="flex flex-col items-center gap-8 mb-20"
          id={topic.topic_name.replace(/\s+/g, "-").toLowerCase()}
        >
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row flex-none gap-2">
              {[...Array(3)].map((_, i) => (
                <Image
                  src={"/subject/star.svg"}
                  alt="Star Icon"
                  width={24}
                  height={24}
                  priority
                  key={i}
                  className="size-5"
                />
              ))}
            </div>
            <p className="text-[min(10vw,30px)] font-bold text-foreground">
              {topic.topic_name}
            </p>
            <div className="flex flex-row flex-none gap-2">
              {[...Array(3)].map((_, i) => (
                <Image
                  src={"/subject/star.svg"}
                  alt="Star Icon"
                  width={24}
                  height={24}
                  priority
                  key={i}
                  className="size-5"
                />
              ))}
            </div>
          </div>
          <AnimatedLearningPath topic={topic} subject={subject} />
        </div>
      ))}
    </div>
  );
}
