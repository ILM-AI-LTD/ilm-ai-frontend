import { subjects } from "@/constants/Helpers";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import SubjectCard from "@/feature/students/home/component/SubjectCard";
import Image from "next/image";


const page = () => {
  return (
    <div>
      <div className="flex gap-2 items-start mb-10">
        <p className="text-foreground font-bold text-[min(10vw,36px)]">Subjects</p>

        <Image
          src={"/Subject_logo.gif"}
          alt={"subject"}
          height={58}
          width={58}
        />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex justify-end items-end md:justify-center md:items-center order-1 md:order-2">
          <ILMIAssistantv2
            height={326}
            width={151}
            className="h-[326px] w-[151px]"
          />
        </div>

        <div className="max-w-[1170px] grid col-span-2 sm:grid-cols-2 gap-8 order-2 md:order-1">
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
  );
};

export default page;
