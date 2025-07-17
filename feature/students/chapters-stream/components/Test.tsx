// import CheckboxCardDemo from "@/components/customized/checkbox/checkbox-11";
import CustomCheckboxCard from "@/components/global/CustomCheckBoxCard";
// import CustomTldrawEditor from "@/components/global/CustomTldrawEditor";
// import CustomTldrawEditor from "@/components/global/TestCustomTldrawEditor";
// import CustomTldrawEditor from "@/components/global/TestCustomTldrawEditorv2";
import CustomTldrawEditor from "@/components/global/TestCustomTldrawEditorv3";
// import { Card } from "@/components/ui/card";
import React from "react";

const ques = {
  questions: [
    {
      question_text:
        "1) State the Law of Conservation of Energy and explain what it means in a closed system.",
      question_type: "descriptive",
    },
    {
      question_text:
        "The diagram shows a burning candle. Which energy store is associated with the burning candle?\nA. chemical\nB. elastic\nC. electrostatic\nD. nuclear",
      question_type: "mcq",
    },
  ],
};

// const questions = ques.questions;

const Test = () => {
  return (
    <div>
      {ques.questions.length > 0 &&
        ques.questions.map((q, index) => (
          <div key={index} className="mb-4 p-6 rounded-2xl">
            {q.question_type === "descriptive" && (
              <>
                {/* <p className="font-semibold">{q.question_text}</p> */}
                {/* <textarea
                  className="border p-2 rounded w-full mt-2"
                  placeholder="Type your answer here..."
                /> */}
                {/* <CustomTldrawEditor questions={q} /> */}
                <CustomTldrawEditor questions={q} />
              </>
            )}

            {q.question_type === "mcq" && <CustomCheckboxCard questions={q} />}
          </div>
        ))}
      {/* </Card> */}
    </div>
  );
};

export default Test;
