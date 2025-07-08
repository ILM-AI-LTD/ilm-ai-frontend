import { subjects } from "../../constants";
import SubjectCard from "./SubjectCard";

export default function SubjectCoverSection() {
  return (
    <section className="bg-secondary-background w-full flex flex-col items-center justify-center py-20 px-6 md:px-10 2xl:px-[135px] gap-8">
      <p className="text-foreground font-bold text-[min(10vw,64px)] text-center">
        Explore Our <span className=" text-[#8E8E8E]">Subjects</span>
      </p>

      <div className="max-w-[1170px] grid grid-cols-1 md:grid-cols-2  rounded-4xl gap-4">
        {subjects.map((subject, index) => (
          <SubjectCard
            key={index}
            title={subject.title}
            description={subject.description}
            iconSrc={subject.iconSrc}
          />
        ))}
      </div>
    </section>
  );
}
