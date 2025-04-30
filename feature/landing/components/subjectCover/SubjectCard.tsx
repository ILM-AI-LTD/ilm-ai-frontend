import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import Image from "next/image"


type SubjectCardProps = {
    title: string,
    description: string,
    iconSrc: string,
}
const SubjectCard = ({ title, description, iconSrc }: SubjectCardProps) => {
    return (
        <Card className="bg-secondary-bg-color rounded-3xl p-12 border-none justify-center items-center">
            <Image
                src={iconSrc}
                alt={title}
                height={100}
                width={100}
            />

            <CardTitle className="text-white text-2xl font-bold">
                {title}
            </CardTitle>

            <CardDescription className="text-white text-lg">
                {description}
            </CardDescription>
        </Card>
    )
}

export default SubjectCard