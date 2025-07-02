"use client";

import CustomButton from "@/components/global/CustomButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { usePaper } from "@/context/PaperContext";
import { IconComponent } from "@/feature/students/subject/components/IconComponent";
import { physicsChapters } from "@/feature/students/subject/constants/physics";
import Image from "next/image";

export function NavigationCard() {
  const { selectedPaper, setSelectedPaper } = usePaper();
  const current = physicsChapters[selectedPaper];

  const scrollToMainChapter = (chapterName: string) => {
    const id = chapterName.replace(/\s+/g, "-").toLowerCase();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Card className="max-w-[320px] w-full p-3 md:p-6 rounded-[20px] flex flex-col gap-6 border bg-secondary ">

      <CardHeader className="p-0 space-y-0 flex flex-col gap-6 justify-center items-center">
        <Image
          src={"/subject/navigation.gif"}
          width={114}
          height={114}
          alt="Navigation GIF"
        />
      </CardHeader>

      <CardContent className="p-0 w-full">
        <div className="flex justify-evenly items-center gap-2 mb-6">
          <CustomButton
            label="Paper 1"
            onClick={() => setSelectedPaper("paper1")}
            active={selectedPaper === "paper1"}
            className={`text-lg transition-all duration-300 ease-in-out`}
          />

          <CustomButton
            label="Paper 2"
            onClick={() => setSelectedPaper("paper2")}
            active={selectedPaper === "paper2"}
            className={`text-lg transition-all duration-300 ease-in-out`}
          />
        </div>

        {current.chapters.map((chapter, index) => (
          <div key={index} className="flex gap-6 mb-4">
            <div>
              <IconComponent iconName={chapter.icon} width={20} height={20} />
            </div>
            <div
              className="text-foreground font-bold cursor-pointer"
              onClick={() => scrollToMainChapter(chapter.name)}
            >
              {chapter.name}
            </div>
          </div>
        ))}
      </CardContent>

    </Card>
    // </div>
  );
}
