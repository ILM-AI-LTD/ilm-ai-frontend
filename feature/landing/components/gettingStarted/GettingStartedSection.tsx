import { steps } from "../../constants";
import { GettingStartedCard } from "./GettingStartCard";

const GettingStartedSection = () => {
  return (
    <section className="bg-secondary-bg-color py-20 px-6 md:px-10 2xl:px-[135px] flex flex-col items-center justify-center">
      <h1 className="font-bold text-[min(10vw,36px)] text-white mb-16 text-center">
        Let’s Dive In, It’s Super Easy!
      </h1>

      <div className="max-w-[1170px] grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, idx) => (
          <GettingStartedCard
            key={idx}
            index={idx}
            title={step.title}
            description={step.description}
            imgSrc={step.imgSrc}
          />
        ))}
      </div>
    </section>
  );
};

export default GettingStartedSection;
