import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type SubjectCardProps = {
  title: string;
  description: string;
  iconSrc: string;
};
const SubjectCard = ({ title, description, iconSrc }: SubjectCardProps) => {
  return (
    <Card className="bg-gradient-to-t from-[#ffffff] dark:from-[#020617] border-3 border-white dark:border-[#1b2130] rounded-3xl py-8 px-6 justify-center items-center shadow-lg">
      <Image
        src={iconSrc}
        alt={title}
        height={100}
        width={100}
        className="w-[80px] h-[80px] 2xl:w-[100px] 2xl:h-[100px]"
      />

      <CardTitle className="text-white text-[32px] font-semibold">
        {title}
      </CardTitle>

      <CardDescription className="text-foreground-subtitle text-lg text-center">
        {description}
      </CardDescription>
    </Card>
  );
};

export default SubjectCard;
