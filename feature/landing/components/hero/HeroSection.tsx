import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
    return (
        <div className="relative py-20 px-6 md:px-10 2xl:px-[135px] w-full h-dvh bg-primary-bg-color flex flex-col items-center justify-center overflow-hidden">

            <video
                className="absolute inset-0 object-cover w-full h-full z-0 mask-t-from-10% mask-b-from-10%"
                src="/Hero Video.mp4"
                autoPlay
                muted
                loop
                playsInline
            />

            <div className="max-w-[1170px] z-20 flex flex-col h-full items-center justify-between text-white">
                <div></div>
                <div className="w-full flex flex-col items-center gap-8">
                    <p className="font-bold text-[min(12vw,52px)] text-center">
                        Personalised Learning, <span className="text-brand-color">Parent-led Progress</span>
                    </p>

                    <p className="font-medium text-[min(10vw,16px)] text-center">
                        Interactive education with AI-enhanced tutor and parental governance. ILM AI - where learning becomes personal.
                    </p>

                    <div className="inline-flex gap-4">
                        <Link href="/auth/sign-up">
                            <button className="border-1 border-white bg-transparent hover:bg-[#007AAC] hover:border-[#007AAC] h-14 w-32 rounded-full cursor-pointer">
                                Get Started
                            </button>
                        </Link>
                        <button className="border-1 border-brand-color text-brand-color bg-transparent hover:bg-[#007AAC] hover:border-0 hover:text-white h-14 w-32 rounded-full cursor-pointer">
                            Free Trial
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-8 items-center w-full">
                    <p className="text-[min(10vw,20px)] font-bold text-center">
                        All of our courses are crafted by award-winning teachers and professionals from top institutions.
                    </p>

                    <div className="inline-flex gap-4">
                        <Image
                            src="/University of London.svg"
                            alt="University of London"
                            width={131}
                            height={53}
                            className="w-[131px] md:w-[131px]"
                        />
                        <Image
                            src="/University of Oxford.svg"
                            alt="University of Oxford"
                            width={131}
                            height={53}
                            className="w-[131px] md:w-[131px]"
                        />
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default HeroSection;
