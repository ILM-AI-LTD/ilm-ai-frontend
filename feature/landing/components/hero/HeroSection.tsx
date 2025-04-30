import CustomButton from "@/components/global/CustomButton"
import CustomVideoPlayer from "@/components/global/CustomVideoPlayer"
import Image from "next/image"

const HeroSection = () => {
    return (
        <div className='relative py-20 px-6 md:px-10 2xl:px-[135px] bg-primary-bg-color flex flex-col items-center justify-center'>
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_0%,transparent_110%)]"></div>

            <div className="relative max-w-[1170px] z-10 flex flex-col items-center justify-center text-white">

                <div className="flex flex-col items-center gap-8">
                    <p className="font-bold  text-[min(12vw,72px)] text-center">
                        Get <span className="text-brand-color italic">Ilmified</span>
                    </p>

                    <p className="font-medium text-[min(10vw,16px)] text-center">Empowering learners through intelligent, adaptive, and personalized study tools.</p>

                    <div className="inline-flex gap-4">
                        <CustomButton
                            label="Get Started"
                            className="border-1 border-white bg-primary-bg-color hover:bg-primary-bg-color h-14 w-32 rounded-full"
                        />
                        <CustomButton
                            label="Free Trial"
                            className="border-1 border-brand-color text-brand-color bg-primary-bg-color hover:bg-primary-bg-color h-14 w-32 rounded-full"
                        />
                    </div>
                </div>

                <CustomVideoPlayer
                    src="/Coin Operated.mp4"
                    poster="/video preview.png"
                />

                <div className="flex flex-col gap-8 items-center w-full md:w-[80%]">

                    <p className="text-[min(10vw,20px)] font-bold text-center">All of our courses are crafted by award-winning teachers and professionals from top institutions.</p>

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
            </div>

        </div>
    )
}

export default HeroSection