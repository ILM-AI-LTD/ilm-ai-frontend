"use client";

import { cn } from "@/lib/utils";
// import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CircleCheck, CircleX } from "lucide-react";
import { useState } from "react";
import CustomIcon from "./CustomIcon";
import { Card } from "../ui/card";

// const ques =
//   "The diagram shows a burning candle. Which energy store is associated with the burning candle?";

// const ans = [
//   {
//     label: "Colors",
//     value: "colors",
//     icon: SwatchBook,
//     defaultChecked: true,
//     explanation:
//       "<p><strong>Explanation:</strong></p> <ul> <li>The student's answer is accurate...</li></ul>",
//     is_correct: false,
//   },
//   {
//     label: "Emojis",
//     value: "emojis",
//     icon: Smile,
//     explanation:
//       "<p><strong>Explanation:</strong></p> <ul> <li>The student's answer is accurate...</li></ul>",
//     is_correct: true,
//   },
//   {
//     label: "Spacing",
//     value: "spacing",
//     icon: Ruler,
//     explanation:
//       "<p><strong>Explanation:</strong></p> <ul> <li>The student's answer is accurate...</li></ul>",
//     is_correct: false,
//   },
//   {
//     label: "Space",
//     value: "space",
//     icon: Ruler,
//     explanation:
//       "<p><strong>Explanation:</strong></p> <ul> <li>The student's answer is accurate...</li></ul>",
//     is_correct: false,
//   },
// ];

const answerData = {
  explanation:
    "The student's answer is incorrect.  The correct answer is **A. chemical**.**Explanation:**- A burning candle involves a chemical reaction where the wax (fuel) reacts with oxygen, releasing energy in the form of light and heat. This energy comes from the chemical energy stored in the wax.- Option B, elastic, is incorrect as it relates to the energy stored in stretched or compressed materials.- Option C, electrostatic, is incorrect as it pertains to energy stored due to electric charges.- Option D, nuclear, is incorrect as it involves energy stored in the nucleus of atoms, which is not relevant to a burning candle.",
  is_correct: false,
};

type Props = {
  questions: {
    question_text: string;
    question_type: string;
  };
};
const CustomCheckboxCard = ({ questions }: Props) => {
  console.log("ques ------------", questions);
  const parts = questions.question_text.split("\n");
  const quesText = parts[0];
  console.log("ques ------------", quesText);

  const options = parts.slice(1, parts.length);
  console.log("parts ---", options);

  const [selected, setSelected] = useState<string | null>(null);
  const [evaluated, setEvaluated] = useState(false);

  // const correctAnswer = ans.find((a) => a.is_correct);
  const correctOption = options.find((opt) =>
    answerData.explanation.includes(opt)
  );

  const handleEvaluate = () => {
    if (selected) setEvaluated(true);
  };
  return (
    <>
      <Card>
        <div className="w-full p-8">
          <div
            className="prose prose-sm max-w-none text-foreground pb-6 text-2xl font-bold"
            dangerouslySetInnerHTML={{ __html: quesText }}
          />
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {ans.map((option, index) => {
          const isSelected = selected === option.value;
          const isCorrect = option.is_correct;
          const isWrongSelected = evaluated && isSelected && !isCorrect;
          const isCorrectSelected = evaluated && isSelected && isCorrect;
          const isCorrectButNotSelected = evaluated && !isSelected && isCorrect;

          return (
            <div
              key={option.value}
              onClick={() => {
                if (!evaluated) setSelected(option.value);
              }}
              className={cn(
                "relative ring-[1px] rounded-lg px-4 py-3 cursor-pointer text-start transition-all",
                isSelected
                  ? "ring-2 ring-primary text-primary"
                  : "ring-border text-muted-foreground",
                evaluated &&
                  isCorrectSelected &&
                  "bg-[#049F6C] border-green-600",
                evaluated && isWrongSelected && "bg-[#DF1C41] border-red-600",
                evaluated &&
                  isCorrectButNotSelected &&
                  "bg-[#049F6C] border-green-500 text-white"
              )}
            >
              <div className="flex flex-row gap-4 items-center">
                <div className="border border-foreground rounded-lg px-4 py-3 text-foreground">
                  {index + 1}
                </div>
                <p className="text-foreground font-medium">{option.label}</p>
              </div>

              {evaluated && isCorrectSelected && (
                <CircleCheck
                  className="absolute top-2 right-2 "
                  fill="white"
                  stroke="#049F6C"
                />
              )}

              {evaluated && isWrongSelected && (
                <CircleX
                  className="absolute top-2 right-2"
                  fill="white"
                  stroke="#DF1C41"
                />
              )}

              {evaluated && isCorrectButNotSelected && (
                <CircleCheck
                  className="absolute top-2 right-2 w-6 h-6"
                  fill="white"
                  stroke="#049F6C"
                />
              )}
            </div>
          );
        })}
      </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {options.map((option, index) => {
              const isSelected = selected === option;
              const isCorrect = evaluated && option === correctOption;
              const isWrong =
                evaluated && isSelected && option !== correctOption;
              // const isCorrect = option.is_correct;
              // const isWrongSelected = evaluated && isSelected && !isCorrect;
              // const isCorrectSelected = evaluated && isSelected && isCorrect;
              // const isCorrectButNotSelected = evaluated && !isSelected && isCorrect;

              return (
                <div
                  key={option}
                  onClick={() => {
                    if (!evaluated) setSelected(option);
                  }}
                  className={cn(
                    "relative ring-[1px] rounded-lg px-4 py-3 cursor-pointer text-start transition-all",
                    isSelected
                      ? "ring-2 ring-primary text-primary"
                      : "ring-border text-muted-foreground",
                    isCorrect && "bg-[#049F6C] border-green-600",
                    isWrong && "bg-[#DF1C41] border-red-600"
                    // evaluated &&
                    //   isCorrectSelected &&
                    //   "bg-[#049F6C] border-green-600",
                    // evaluated && isWrongSelected && "bg-[#DF1C41] border-red-600",
                    // evaluated &&
                    //   isCorrectButNotSelected &&
                    //   "bg-[#049F6C] border-green-500 text-white"
                  )}
                >
                  <div className="flex flex-row gap-4 items-center">
                    <div className="border border-foreground rounded-lg px-4 py-3 text-foreground">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <p className="text-foreground font-medium">
                      {option.slice(3)}
                    </p>
                  </div>

                  {evaluated && isCorrect && (
                    <CircleCheck
                      className="absolute top-2 right-2 "
                      fill="white"
                      stroke="#049F6C"
                    />
                  )}

                  {evaluated && isWrong && (
                    <CircleX
                      className="absolute top-2 right-2"
                      fill="white"
                      stroke="#DF1C41"
                    />
                  )}

                  {/* {evaluated && isCorrectButNotSelected && (
                <CircleCheck
                  className="absolute top-2 right-2 w-6 h-6"
                  fill="white"
                  stroke="#049F6C"
                />
              )} */}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-4">
            <button
              onClick={handleEvaluate}
              disabled={!selected || evaluated}
              className="bg-primary text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              Evaluate
            </button>
          </div>
        </div>
      </Card>
      {evaluated && (
        <div className=" mt-6 px-4 py-3 rounded-b-2xl rounded-tr-2xl border-2 border-bg-border text-foreground flex flex-row gap-4">
          <div className="flex flex-row gap-4 items-center">
            <CustomIcon
              iconSrc={"/landing/idea.svg"}
              altText="Idea"
              width={32}
              height={32}
            />
            <p className="text-2xl font-bold text-[#006C98]">Explanation</p>
          </div>
          {/* <div className="">
            {answerData.explanation
              .split("**")
              .map((chunk, idx) =>
                idx % 2 === 1 ? <strong key={idx}>{chunk}</strong> : chunk
              )}
          </div> */}
          <div
            className=" text-white dark:text-black p-4 flex-1 rounded-lg bg-[#006C98]"
            dangerouslySetInnerHTML={{ __html: answerData.explanation }}
          />
        </div>
      )}
    </>
    // <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
    //   {options.map((option, index) => (
    //     <CheckboxPrimitive.Root
    //       key={option.value}
    //       defaultChecked={option.defaultChecked}
    //       className="relative ring-[1px] ring-border rounded-lg px-4 py-3 text-start text-muted-foreground data-[state=checked]:ring-2 data-[state=checked]:ring-primary data-[state=checked]:text-primary"
    //     >
    //       <div className="flex flex-row gap-4 items-center">
    //         <div className="border border-foreground rounded-lg px-4 py-3 text-foreground">
    //           {index + 1}
    //         </div>
    //         <p className="text-foreground">{option.label}</p>
    //       </div>

    //       <CheckboxPrimitive.Indicator className="absolute top-2 right-2">
    //         <CircleCheck className="fill-primary text-primary-foreground" />
    //       </CheckboxPrimitive.Indicator>
    //     </CheckboxPrimitive.Root>
    //   ))}
    // </div>
  );
};

export default CustomCheckboxCard;
