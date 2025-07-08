// import {page} from '/home/shuvo/Projects/ilm-ai-frontend/app/(main)/student/home'
import CustomButton from "@/components/global/CustomButton";
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
            {/* <button className="text-foreground bg-gradient-to-b from-[#E8E8E8] dark:from-[#1D2840] dark:to-[#000000] hover:bg-[#007AAC] shadow-[0px_6px_0px_0px_#373C4E] hover:border-[#007AAC] h-14 w-32 rounded-full cursor-pointer">
              Get Started
            </button> */}
            <CustomButton
              className=" h-14 w-32 rounded-full cursor-pointer"
              active={false}
            >
              Get Started
            </CustomButton>
          </Link>
          {/* <button className=" text-brand-color bg-gradient-to-t from-[#004D6C] to-[#006C98] shadow-[0px_6px_0px_0px_#006C98] hover:bg-[#007AAC] hover:border-0 hover:text-white h-14 w-32 rounded-full cursor-pointer">
            Free Trial
          </button> */}
          <CustomButton className="  hover:text-white h-14 w-32 rounded-full cursor-pointer">
            Free Trial
          </CustomButton>
        </div>
        <div className="bg-gradient-to-b from-[#3389AD4D] border-3 border-bg-border rounded-t-4xl px-4 pt-4 relative overflow-hidden fade-bottom">
          {/* <div className="bg-secondary-background rounded-4xl p-4 overflow-hidden fade-bottom"> */}
          {/* <div style={{ position: "relative", height: "100%" }}> */}
          {/* <Image
            src={"/landing/cover.png"}
            alt={"image"}
            height={288}
            width={1920}
            className="object-content rounded-t-4xl"
          /> */}
          <Image
            src="/landing/cover_light2.png"
            alt="light image"
            width={1920}
            height={288}
            className="block dark:hidden object-content rounded-t-4xl"
          />

          {/* Dark mode image */}
          <Image
            src="/landing/cover_dark2.png"
            alt="dark image"
            width={1920}
            height={288}
            className="hidden dark:block object-content rounded-t-4xl"
          />
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSectionv2;
