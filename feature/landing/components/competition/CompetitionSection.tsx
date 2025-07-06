import CompetitionForm from "./CompetitionForm";

const CompetitionSection = () => {
  return (
    <section className=" bg-secondary-background w-full flex flex-col items-center justify-center py-20 px-6 md:px-10 2xl:px-[135px]">
      <div className="max-w-[1170px] bg-background rounded-3xl py-16 p-4   text-white flex flex-col gap-8 items-center">
        <div className="w-full flex flex-col gap-4 text-center">
          <p className="font-bold text-[min(10vw,64px)]">
            Join the ILM Lab Competition and{" "}
            <span className=" text-[#8E8E8E]">Showcase Your Skills!</span>
          </p>
          <p className="font-normal text-lg text-[#677489]">
            Test your knowledge, get recognized, and win amazing prizes! Ready
            to put your learning to the test?
          </p>
        </div>
        <div className="md:p-10 2xl:px-[250px]">
          <CompetitionForm />
        </div>
      </div>
    </section>
  );
};

export default CompetitionSection;
