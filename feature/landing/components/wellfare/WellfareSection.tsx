import CustomButton from "@/components/global/CustomButton";
import Image from "next/image";

const WellfareSection = () => {
  return (
    <section className="bg-secondary-background py-20 px-6 md:px-10 2xl:px-[135px] flex flex-col items-center">
      <div className="max-w-[1170px] w-full grid grid-cols-1 md:grid-cols-2 rounded-4xl  gap-4 ">
        <div>
          <h1 className="font-bold text-[min(10vw,64px)] text-white mb-16">
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
            className={`btn-hover inline-flex h-12 w-2/4 items-center justify-center rounded-full  bg-gradient-to-b from-[#1D2840] to-[#000000] text-white font-bold hover:bg-[#007AAC] hover:text-white border-1 border-[#373C4E] shadow-[0px_6px_0px_0px_#373C4E]`}
            label={"Learn More About Our Mission"}
            variant="outline"
          />
        </div>
        <div style={{ position: "relative" }}>
          <Image src={"/landing/wellfare.svg"} alt={"image"} fill />
        </div>
      </div>
    </section>
  );
};

export default WellfareSection;
