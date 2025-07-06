// import {page} from '/home/shuvo/Projects/ilm-ai-frontend/app/(main)/student/home'
import Image from "next/image";
// import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
// import { subjects } from "@/constants/Helpers";
// import SubjectCard from "@/feature/students/home/component/SubjectCard";
// import { features } from "../../constants";
// import { FeatureCard } from "../SmartTools/FeatureCard";
import Link from "next/link";

const HeroSectionv2 = () => {
  return (
    <section className=" py-20 px-6 md:px-10 2xl:px-[135px] text-center flex flex-col justify-center items-center">
      {/* <div className="bg-secondary-background max-w-[1170px] rounded-4xl p-4 md:p-6 2xl:p-20 gap-4 border-3 border-[#1B2130]">
        <p className="text-6xl text-center">Interactive Learning</p>
        <div>
          <div className="flex gap-2 items-start mb-10">
            <p className="text-foreground font-bold text-[min(10vw,36px)]">
              Subjects
            </p>

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
      </div> */}

      <div className="max-w-[1170px] bg-secondary-background border border-bg-border rounded-4xl px-4 pt-4 md:px-6 md:pt-6 2xl:px-20 gap-4 ">
        <button className=" border border-border text-foreground bg-transparent h-8 w-26 text-sm rounded-full cursor-pointer mt-8">
          {`ILMINO ->`}
        </button>
        <h1 className="font-bold text-[min(10vw,64px)] text-foreground mb-4">
          Innovative <span className=" text-[#006C98]">Learning</span>
        </h1>
        <p className="text-foreground">
          <span className="font-bubbleGum  text-xl">ILMIN0</span>- where
          learning becomes personal.
        </p>
        <div className="inline-flex gap-4 my-8">
          <Link href="/auth/sign-up">
            <button className="text-foreground bg-gradient-to-b from-[#E8E8E8] dark:from-[#1D2840] dark:to-[#000000] hover:bg-[#007AAC] shadow-[0px_6px_0px_0px_#373C4E] hover:border-[#007AAC] h-14 w-32 rounded-full cursor-pointer">
              Get Started
            </button>
          </Link>
          <button className=" text-brand-color bg-gradient-to-t from-[#004D6C] to-[#006C98] shadow-[0px_6px_0px_0px_#006C98] hover:bg-[#007AAC] hover:border-0 hover:text-white h-14 w-32 rounded-full cursor-pointer">
            Free Trial
          </button>
        </div>
        <div className="bg-gradient-to-b from-[#3389AD4D] border-3 border-[#1B2130] rounded-t-4xl p-4 relative overflow-hidden fade-bottom">
          <div className="bg-secondary-background rounded-4xl p-4 overflow-hidden fade-bottom">
            {/* <div style={{ position: "relative", height: "100%" }}> */}
            <Image
              src={"/landing/cover.png"}
              alt={"image"}
              height={288}
              width={1920}
              // className="h-[601px] w-[1920px]"
              // fill
              className="object-content"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionv2;
