// import AssistantCallout from './common/AssistantCallout'
// import FooterParents from './common/FooterParents'
// import ILMIAssistant from './common/ILMIAssistant'

// import AssistantCallout from "@/feature/students/components/setup/common/AssistantCallout"
// import FooterParents from "@/feature/parents/components/setup/common/FooterParents"
// import ILMIAssistant from "@/feature/parents/components/setup/common/ILMIAssistant"

"use client";

import React, { useEffect, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { CircleCheck, CpuIcon } from "lucide-react";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import FooterStudents from "./common/FooterStudents";
import AssistantCallout from "./common/AssistantCallout";
import { boards, countries } from "@/constants/Helpers";
import { useRouter } from "next/navigation";
import { BoardResponse } from "@/types/student";
import { toast } from "sonner";
import { useUpdateCountryBoard } from "../hooks/useUpdateCountryBoard";
import { useStudentSetupStore } from "../store/useStudentSetupStore";
import { Child, User } from "@/types/auth";

interface BoardProps {
  onNext: () => void;
  onBack: () => void;
}

const Board = ({ onBack, onNext }: BoardProps) => {
  const router = useRouter();
  const { country, board, setCountry, setBoard, reset } =
    useStudentSetupStore();
  const { mutate: completeSetup, isPending } = useUpdateCountryBoard();

  const handleSelect = (option: BoardResponse) => {
    if (board?.id === option.id) {
      setBoard(null);
    } else {
      setBoard(option);
    }
  };

  const handleRegisterChild = () => {
    if (!country || !board) {
      toast.error("Please select both country and board");
      return;
    }
    completeSetup(
      { id: currentUser?._id || "", country: country.label, board: board.name },
      {
        onSuccess: (res) => {
          //   console.log("res --------------------", res);
          const { country, board } = res.data.child;
          const matchedCountry = countries.find((c) => country === c.label);
          console.log("matchedCountry --", matchedCountry);

          //   setCountry(matchedCountry ?? null);
          if (matchedCountry) setCountry(matchedCountry);

          const matchedBoard = boards.find((b) => board === b.name);
          console.log("matchedBoard --", matchedBoard);
          if (matchedBoard) setBoard(matchedBoard);
          //   setBoard(matchedBoard ?? null);
          let childId = res.data.child._id;
          //   setBoard(res.data.child.board);
          //   let childId = res.data.child._id;
          toast.success("Your child has been successfully registered.");
          router.push("/student/home");
          //   reset();
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  const [currentUser, setCurrentUser] = useState<Child | null>(null);

  useEffect(() => {
    const savedSelection = sessionStorage.getItem("currentStudents");
    if (savedSelection) {
      try {
        setCurrentUser(JSON.parse(savedSelection));
      } catch (e) {
        console.error("Failed to parse saved selection", e);
      }
    }
  }, []);

  //   useEffect(() => {
  //     if (selectedOption) {
  //       localStorage.setItem("selectedBoard", JSON.stringify(selectedOption));
  //     } else {
  //       localStorage.removeItem("selectedBoard");
  //     }
  //   }, [selectedOption]);

  //   const handleSelect = (option: BoardResponse) => {
  //     setSelectedOption((prev) => (prev?.id === option.id ? null : option));
  //   };

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
          className={`mx-auto max-w-[800px] grid bg-primary-bg-color rounded-4xl gap-4 lg:grid-cols-4`}
        >
          {boards.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              // className={`relative p-4 cursor-pointer transition-all
              //     duration-300 ease-in-out rounded-full bg-[#020617]
              //     shadow-[0px_8px_0px_0px_#444]
              //     hover:scale-105 hover:bg-button-hover-color
              //     hover:shadow-[0px_8px_0px_0px_#006D98]
              //     ${selectedOption?.id === option.id ? 'ring-2 ring-white' : ''}`
              // }
              className={`
                                relative p-4 cursor-pointer transition-all 
                                duration-300 ease-in-out rounded-full 
                                shadow-[0px_8px_0px_0px_#444]
                                ${
                                  board?.id === option.id
                                    ? "bg-button-hover-color shadow-[0px_8px_0px_0px_#006D98]"
                                    : "bg-[#020617] hover:scale-105 hover:bg-button-hover-color hover:shadow-[0px_8px_0px_0px_#006D98]"
                                }
                            `}
            >
              {/* {selectedOption?.id === option.id && (
                                <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-blue-500 stroke-white z-10" />
                            )} */}
              <div className=" text-white  flex items-center justify-center gap-2 text-lg font-semibold">
                {option.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterStudents
        leftButton={{ label: "Back", onClick: onBack }}
        rightButton={{
          label: "Finish & View Dashboard",
          //   onClick: () => router.push("/student/dashboard"),
          onClick: handleRegisterChild,
          disabled: false,
          isPending: false,
        }}
      />
    </div>
  );
};

export default Board;
