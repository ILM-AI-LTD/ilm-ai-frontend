import CustomButton from "@/components/global/CustomButton";
// import CustomLogo from "@/components/global/CustomLogo";

const CustomerService = () => {
  return (
    <section className=" bg-background py-20 px-6 md:px-10 2xl:px-[135px]">
      <div className="max-w-[1170px] w-full bg-secondary-background mx-auto p-6 md:p-10 flex flex-col lg:flex-row items-center lg:justify-between text-white rounded-3xl">
        <p className="text-[min(10vw,64px)] font-bold text-center lg:text-left w-full lg:w-[40%] ">
          Start today with{" "}
          <span className="font-bubbleGum font-[700px] text-[#006C98]">
            ILMIN0
            {/* <CustomLogo logoSrc="/ilmino.svg" /> */}
          </span>
        </p>

        <div className="flex flex-col gap-4 justify-center items-center lg:items-start w-full lg:w-[60%]">
          <p className="font-medium text-lg text-center lg:text-left text-foreground-subtitle">
            Empower your learning journey with AI-driven education designed to
            unlock your potential.
          </p>

          <CustomButton
            label="Get Started"
            // className="w-[148px] h-12 bg-brand-color hover:bg-brand-color rounded-full font-bold"
            className="w-[148px] h-12 bg-gradient-to-b from-[#1D2840] to -[#000000] shadow-[0px_6px_0px_0px_#373C4E] hover:bg-primary rounded-full font-bold"
          />
        </div>
      </div>
    </section>
  );
};

export default CustomerService;
