"use client";

import { useEffect, useState } from "react";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import FooterStudents from "./common/FooterStudents";
import AssistantCallout from "./common/AssistantCallout";
import { boards, countries } from "@/constants/Helpers";
import { useRouter } from "next/navigation";
import { BoardResponse } from "@/types/student";
import { toast } from "sonner";
import { useUpdateCountryBoard } from "../hooks/useUpdateCountryBoard";
import { useStudentSetupStore } from "../store/useStudentSetupStore";
import { Child } from "@/types/auth";

import CustomButton from "@/components/global/CustomButton";

interface BoardProps {
  onNext: () => void;
  onBack: () => void;
}

const Board = ({ onBack, onNext }: BoardProps) => {
  const router = useRouter();
  const { country, board, setCountry, setBoard, reset } =
    useStudentSetupStore();
  const { mutate: completeSetup, isPending } = useUpdateCountryBoard();

  const [selectedOption, setSelectedOption] = useState<BoardResponse | null>(
    null
  );

  const handleSelect = (option: BoardResponse) => {
    if (board?.id === option.id) {
      setBoard(null);
      setSelectedOption(null);
    } else {
      setBoard(option);
      setSelectedOption(option);
    }
  };

  const handleRegisterChild = () => {
    if (!country || !board) {
      toast.error("Please select both country and board");
      return;
    }
    completeSetup(
      { id: currentUser?.id || "", country: country.label, board: board.name },
      {
        onSuccess: (res) => {
          const { country, board } = res.data.child;
          const matchedCountry = countries.find((c) => country === c.label);

          if (matchedCountry) setCountry(matchedCountry);

          const matchedBoard = boards.find((b) => board === b.name);
          if (matchedBoard) setBoard(matchedBoard);
          toast.success("Your child has been successfully registered.");
          router.push("/student/home");
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  const [currentUser, setCurrentUser] = useState<Child | null>(null);

  useEffect(() => {
    const savedSelection = sessionStorage.getItem("currentUser");
    if (savedSelection) {
      try {
        setCurrentUser(JSON.parse(savedSelection));
      } catch (e) {
        console.error("Failed to parse saved selection", e);
      }
    }
  }, []);

  return (
    <div className="h-full max-w-[1770px] w-full flex flex-col py-3">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="inline-flex  items-center">
          <ILMIAssistantv2
            height={180}
            width={140}
            className="h-[180px] w-[140px]"
          />

          <div className="mb-20">
            <AssistantCallout message="Select the Board" orientation="left" />
          </div>
        </div>

        <div
          className={`mx-auto max-w-[800px] grid  bg-background rounded-4xl gap-4 lg:grid-cols-4`}
        >
          {boards.map((option, index) => (
            <CustomButton
              onClick={() => handleSelect(option)}
              key={index}
              active={selectedOption?.id === option.id}
              label={option.name}
              className="font-semibold text-sm h-11 px-10 py-6"
            />
          ))}
        </div>
      </div>

      <FooterStudents
        leftButton={{ label: "Back", onClick: onBack }}
        rightButton={{
          label: "Finish & View Dashboard",
          onClick: handleRegisterChild,
          disabled: false,
          isPending: false,
        }}
      />
    </div>
  );
};

export default Board;
