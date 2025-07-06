"use client";

import { useState } from "react";
import PricingCard from "./PricingCard";
// import PricingSwitch from "./PricingSwitch";
import plans from "./data";
import CustomButton from "@/components/global/CustomButton";
import { cn } from "@/lib/utils";

const SubscriptionSection = () => {
  const [isYearly, setIsYearly] = useState(false);
  // const togglePricingPeriod = (value: string) =>
  //   setIsYearly(parseInt(value) === 1);

  return (
    <section className=" bg-secondary-background w-full flex flex-col items-center justify-center py-20 px-6 md:px-10 2xl:px-[135px] gap-8">
      <div className="max-w-[1170px] w-full bg-background rounded-3xl py-16 px-4 md:px-6  text-foreground flex flex-col items-center gap-8">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="font-bold text-[min(10vw,64px)]">
            Choose Your <span className=" text-[#8E8E8E]">Perfect Plan</span>
          </h2>
          <p className="font-normal text-lg">
            Designed for every stage of your journey. Start today, no credit
            card required.
          </p>
        </div>

        {/* <PricingSwitch onSwitch={togglePricingPeriod} /> */}
        <div className="flex justify-center gap-4">
          <CustomButton
            label="Monthly"
            onClick={() => {
              setIsYearly(false);
            }}
            active={isYearly}
            className={cn(
              "h-9 font-bold text-sm rounded-full px-8 py-6 text-foreground",
              !isYearly
                ? "bg-gradient-to-b from-[#004D6C] to-[#006C98]  hover:border-0 text-white hover:text-white"
                : "bg-gradient-to-b from-[#E8E8E8] dark:from-[#1D2840] dark:to-[#000000] dark:shadow-[0px_6px_0px_0px_#373C4E] "
            )}
          />

          <CustomButton
            label="Yearly"
            onClick={() => setIsYearly(true)}
            active={isYearly}
            className={cn(
              "h-9 font-bold text-sm rounded-full px-8 py-6 text-foreground",
              isYearly
                ? "bg-gradient-to-b from-[#004D6C] to-[#006C98]  hover:border-0 text-white hover:text-white"
                : "bg-gradient-to-b from-[#E8E8E8] dark:from-[#1D2840] dark:to-[#000000] dark:shadow-[0px_6px_0px_0px_#373C4E] "
            )}
          />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, idx) => {
            return (
              <PricingCard
                key={plan.title}
                {...plan}
                isYearly={isYearly}
                idx={idx}
              />
            );
          })}
        </section>
      </div>
    </section>
  );
};

export default SubscriptionSection;
