import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import Image from "next/image"


type SubjectCardProps = {
    title: string,
    description: string,
    iconSrc: string,
}
const SubjectCard = ({ title, description, iconSrc }: SubjectCardProps) => {
    return (
        <Card className="bg-secondary-bg-color rounded-3xl py-8 px-6 border-none justify-center items-center">
            <Image
                src={iconSrc}
                alt={title}
                height={100}
                width={100}
                className="w-[80px] h-[80px] 2xl:w-[100px] 2xl:h-[100px]"
            />

            <CardTitle className="text-white text-2xl font-bold">
                {title}
            </CardTitle>

            <CardDescription className="text-white text-lg text-center">
                {description}
            </CardDescription>
        </Card>
    )
}

export default SubjectCard