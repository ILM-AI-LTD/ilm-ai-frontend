"use client";
import CustomButton from "@/components/global/CustomButton";
import CustomLogo from "@/components/global/CustomLogo";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const HeroSectionv2 = () => {
  const { theme } = useTheme();

  const logoSrc =
    theme === "dark" ? "/landing/Vector.svg" : "/landing/Vector2.svg";

  return (
    <section className="py-2 px-6 md:px-10 2xl:px-[135px] text-center flex flex-col justify-center items-center">
      <div className="max-w-[1170px] bg-secondary-background border border-bg-border rounded-4xl px-4 pt-4 md:px-6 md:pt-6 2xl:px-10 gap-4 ">
        <div className="mt-12 mb-10">
          <button className=" border border-border text-foreground bg-background h-8 w-26 text-sm rounded-full cursor-pointer mb-4">
            <span className="flex flex-row gap-1 justify-center items-center">
              ILMINO
              <ArrowRight width={16} height={16} />
            </span>
          </button>
          <h1 className="font-bold text-[min(10vw,64px)] text-foreground mb-4">
            Interactive <span className=" text-[#006C98]">Learning</span>
          </h1>
          <div className="flex flex-row text-foreground mb-6 justify-center w-[75%] mx-auto gap-2">
            {/* <span className="font-bubbleGum  text-xl">ILMIN0</span>- where
            learning becomes personal. */}
            <div className="mt-1">
              <CustomLogo logoSrc={logoSrc} width={70} height={14} />
            </div>
            <p className="text-left">where learning becomes personal</p>
            {/* <span className="flex flex-row gap-2.5 justify-center items-center">
              where learning becomes personal
            </span> */}
          </div>
          <div className="inline-flex gap-4">
            <Link href="/auth/sign-up">
              {/* <button className="text-foreground bg-gradient-to-b from-[#E8E8E8] dark:from-[#1D2840] dark:to-[#000000] hover:bg-[#007AAC] shadow-[0px_6px_0px_0px_#373C4E] hover:border-[#007AAC] h-14 w-32 rounded-full cursor-pointer">
              Get Started
            </button> */}
              <CustomButton
                className=" h-[48px] w-[155px] rounded-full cursor-pointer"
                active={false}
              >
                Get Started
              </CustomButton>
            </Link>
            {/* <button className=" text-brand-color bg-gradient-to-t from-[#004D6C] to-[#006C98] shadow-[0px_6px_0px_0px_#006C98] hover:bg-[#007AAC] hover:border-0 hover:text-white h-[48px] w-[155px] rounded-full cursor-pointer">
            Free Trial
          </button> */}
            <CustomButton className="  hover:text-white h-[48px] w-[127px] rounded-full cursor-pointer">
              Free Trial
            </CustomButton>
          </div>
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
