import CustomButton from "@/components/global/CustomButton";
import Image from "next/image";

const WellfareSection = () => {
  return (
    <section className="bg-secondary-background py-20 px-6 md:px-10 2xl:px-[135px] flex flex-col items-center">
      <div className="max-w-[1170px] w-full grid grid-cols-1 lg:grid-cols-2 rounded-4xl  gap-4 ">
        <div className="order-1 lg:order-2 relative h-[300px] sm:h-[400px] lg:h-full">
          <Image src={"/landing/wellfare.svg"} alt={"image"} fill />
        </div>
        <div className=" order-2 lg:order-1">
          <h1 className="font-bold text-[min(10vw,64px)] text-foreground mb-16">
            Education for a{" "}
            <span className=" text-[#8E8E8E]">Better Tomorrow!</span>
          </h1>
          <p className=" text-lg text-foreground-subtitle mb-4">
            At ILMINO, we believe in the power of knowledge not just through AI,
            but through real, life-changing education. That’s why a percentage
            of every sale goes directly toward building schools and supporting
            educational programs in Gaza and other less privileged regions
            around the world.
          </p>
          <p className=" text-lg text-foreground-subtitle mb-4">
            {`📚 When you choose ILMINO, you're not just investing in innovation
            you're investing in a child's future.`}
          </p>
          <CustomButton
            className={`btn-hover inline-flex h-12 w-2/4 items-center justify-center rounded-full  bg-gradient-to-b from-[#E8E8E8] dark:from-[#1D2840] dark:to-[#000000] dark:shadow-[0px_6px_0px_0px_#373C4E] text-foreground font-bold hover:bg-[#007AAC] hover:text-white border border-bg-border`}
            label={"Learn More About Our Mission"}
            variant="outline"
          />
        </div>
      </div>
    </section>
  );
};

export default WellfareSection;
