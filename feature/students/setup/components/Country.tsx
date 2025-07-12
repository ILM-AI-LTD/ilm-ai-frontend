import { countries } from "@/constants/Helpers";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import { CountryResponse } from "@/types/student";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AssistantCallout from "./common/AssistantCallout";
import { useStudentSetupStore } from "../store/useStudentSetupStore";
import FooterStudents from "./common/FooterStudents";

interface CountryProps {
  onNext: () => void;
}

const Country = ({ onNext }: CountryProps) => {
  const [selectedOption, setSelectedOption] = useState<CountryResponse | null>(
    null
  );
  const { country, setCountry } = useStudentSetupStore();

  const handleSelect = (option: CountryResponse) => {
    if (country?.id === option.id) {
      setCountry(null);
      setSelectedOption(null);
    } else {
      setCountry(option);
      setSelectedOption(option);
    }
  };

  return (
    <div className="h-full max-w-[1770px] w-full flex flex-col py-3">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="inline-flex  items-start gap-2">
          <ILMIAssistantv2
            height={180}
            width={140}
            className="h-[180px] w-[140px]"
          />

          <div className="mb-20">
            <AssistantCallout
              message="Let's Start By Selecting the Country"
              orientation="left"
            />
          </div>
        </div>

        <div
          className={`mx-auto max-w-[800px] grid  bg-background rounded-4xl gap-4 order-2 md:order-1 
                    ${countries.length === 1 ? "grid-cols-1" : ""}
                    ${countries.length === 2 ? "sm:grid-cols-2" : ""}
                    ${
                      countries.length >= 3
                        ? "sm:grid-cols-2 lg:grid-cols-3"
                        : ""
                    }`}
        >
          {countries.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="relative p-4 rounded-lg cursor-pointer transition-all group"
            >
              {selectedOption?.id === option.id && (
                <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-blue-500 stroke-white z-10" />
              )}

              <div className=" rounded-md">
                <Image
                  src={option.image}
                  alt={option.label}
                  height={80}
                  width={100}
                  className="w-full h-[80px] 2xl:h-[100px] object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <p className="flex justify-center mt-2 font-medium transition-transform duration-300 group-hover:scale-105">
                {option.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <FooterStudents rightButton={{ label: "Next", onClick: onNext }} />
    </div>
  );
};

export default Country;
