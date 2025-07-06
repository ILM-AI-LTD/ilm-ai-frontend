import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type SubjectCardProps = {
  title: string;
  description: string;
  iconSrc: string;
};
const SubjectCard = ({ title, description, iconSrc }: SubjectCardProps) => {
  return (
    <Card className="bg-gradient-to-t from-[#020617] border-3 border-[#1B2130] rounded-3xl py-8 px-6 justify-center items-center">
      <Image
        src={iconSrc}
        alt={title}
        height={100}
        width={100}
        className="w-[80px] h-[80px] 2xl:w-[100px] 2xl:h-[100px]"
      />

      <CardTitle className="text-white text-2xl font-bold">{title}</CardTitle>

      <CardDescription className="text-[#677489] text-lg text-center">
        {description}
      </CardDescription>
    </Card>
  );
};

export default SubjectCard;
