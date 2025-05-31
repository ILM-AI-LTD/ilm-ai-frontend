'use client'
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { CustomProgress, Progress } from "@/components/ui/progress"
import Image from "next/image"
import { useRef } from "react"


type SubjectCardProps = {
    title: string,
    description: string,
    iconSrc: string,
}
const SubjectCard = ({ title, description, iconSrc }: SubjectCardProps) => {

    const audioRef = useRef<HTMLAudioElement>(null);

    const handleClick = () => {
        // Play the click sound
        if (audioRef.current) {
            audioRef.current.currentTime = 0; // Rewind to start if already playing
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }

        // Add any other click logic here
    };


    return (
        <>
            <audio ref={audioRef} src="/sounds/mouse_click_v2.mp3" preload="auto" />
            <Card className="border border-[#b8c2ee] bg-transparent group hover:bg-[#005E8380] cursor-pointer rounded-3xl py-8 px-6 justify-center items-center transition-all duration-300" onClick={handleClick}>
                {/* <Image
                src={iconSrc}
                alt={title}
                height={100}
                width={100}
                className="w-[80px] h-[80px] 2xl:w-[100px] 2xl:h-[100px] group-hover:scale-150 transition-transform duration-300"
            /> */}
                <div className="transform-gpu transition-transform duration-300 group-hover:scale-130 mb-4">
                    <Image
                        src={iconSrc}
                        alt={title}
                        height={100}
                        width={100}
                        className="w-[80px] h-[80px] 2xl:w-[100px] 2xl:h-[100px]"
                    />
                </div>

                <CardTitle className="text-white text-2xl font-bold">
                    {title}
                </CardTitle>

                <CardDescription className="text-white text-lg text-center">
                    {description}
                </CardDescription>
                <CustomProgress value={50} color="indigo" />
            </Card>
        </>

    )
}

export default SubjectCard