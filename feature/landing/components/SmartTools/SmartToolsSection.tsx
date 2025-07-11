import React from "react";
import { FeatureCard } from "./FeatureCard";
import { features } from "../../constants";

const SmartToolsSection: React.FC = () => (
  // <section className="bg-secondary-bg-color py-20 px-6 md:px-10 2xl:px-[135px] text-center flex flex-col justify-center items-center">
  <section className="bg-background py-30 px-6 md:px-10 2xl:px-[135px] text-center flex flex-col justify-center items-center">
    <h1 className="font-bold text-[min(10vw,64px)] mb-17 text-foreground">
      Smarter Tools, <span className=" text-[#8E8E8E]">Better Learning</span>
    </h1>

    <div className="max-w-[1170px] grid grid-cols-1 md:grid-cols-2  bg-secondary-background rounded-4xl p-4 md:p-6 2xl:p-20 gap-4 ">
      {features.map((feature, idx) => (
        <FeatureCard
          key={idx}
          index={idx}
          title={feature.title}
          description={feature.description}
          imgSrc={feature.imgSrc}
        />
      ))}
    </div>
  </section>
);

export default SmartToolsSection;
