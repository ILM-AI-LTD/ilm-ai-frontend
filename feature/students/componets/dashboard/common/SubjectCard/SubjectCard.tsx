import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { CustomProgress, Progress } from "@/components/ui/progress"
import Image from "next/image"


type SubjectCardProps = {
    title: string,
    description: string,
    iconSrc: string,
}
const SubjectCard = ({ title, description, iconSrc }: SubjectCardProps) => {
    return (
        <Card className="border border-[#b8c2ee] bg-transparent hover:bg-[#2d3152] rounded-3xl py-8 px-6 justify-center items-center transition-all duration-300">
            {/* <Image
                src={iconSrc}
                alt={title}
                height={100}
                width={100}
                className="w-[80px] h-[80px] 2xl:w-[100px] 2xl:h-[100px] group-hover:scale-150 transition-transform duration-300"
            /> */}
            <div className="transform-gpu transition-transform duration-300 group-hover:scale-150 mb-4">
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
    )
}

export default SubjectCard