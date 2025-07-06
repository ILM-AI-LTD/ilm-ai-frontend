import { User2Icon } from "lucide-react";
import { testimonials } from "../../constants";
import CustomButton from "@/components/global/CustomButton";

export default function ReviewSection() {
  const looped = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className=" w-full flex flex-col items-center justify-center py-20 px-6 md:px-10 2xl:px-[135px] gap-8">
      <div className="text-foreground w-full md:w-[90%]">
        <p className="font-bold text-[min(10vw,64px)] text-center mb-4">
          Feedback From
          <span className=" text-[#8E8E8E]"> Our Students</span>
        </p>
        <p className="font-medium text-lg text-center text-foreground-subtitle">
          Strong relationships start with strong interactions.
          <br />
          Our feature lets you personalize customer experiences, building
          loyalty and revenue.
        </p>
      </div>

      <div className="relative w-[90%] overflow-hidden rounded-3xl mask-l-from-70% mask-r-from-70%">
        <div className="flex gap-8 animate-marquee-reverse will-change-transform mb-8">
          {looped.map((t, i) => (
            <div
              key={i}
              className={`flex-shrink-0 flex flex-col justify-between p-6  bg-background rounded-2xl border-1 border-border-color text-foreground ${
                i % 2 !== 0 ? "w-80" : "w-96"
              }`}
            >
              <p className="text-base mb-4">“{t.quote}”</p>
              <div className="flex items-center justify-between gap-3 mt-auto">
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs opacity-80">{t.position}</p>
                </div>

                <User2Icon className="h-8 w-8 text-foreground" size={16} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-8 animate-marquee will-change-transform">
          {looped.map((t, i) => (
            <div
              key={i}
              className={`flex-shrink-0 flex flex-col justify-between p-6  bg-background rounded-2xl border-1 border-border-color text-foreground ${
                i % 2 === 0 ? "w-80" : "w-96"
              }`}
            >
              <p className="text-base mb-4">“{t.quote}”</p>

              <div className="flex items-center justify-between gap-3 mt-auto">
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs opacity-80">{t.position}</p>
                </div>

                <User2Icon className="h-8 w-8 text-foreground" size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <CustomButton
        className={`btn-hover inline-flex h-12 w-1/4 items-center justify-center rounded-full  bg-gradient-to-b from-[#E8E8E8] dark:from-[#1D2840] dark:to-[#000000] dark:shadow-[0px_6px_0px_0px_#373C4E] text-foreground font-bold hover:bg-[#007AAC] hover:text-white border border-bg-border`}
        label={"See Customer Reviews"}
        variant="outline"
      />
    </section>
  );
}
