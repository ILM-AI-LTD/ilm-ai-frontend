import Image from "next/image";
import React from "react";

type ILMIAssistantProps = {
  height?: number;
  width?: number;
  className?: string;
};

const ILMIAssistantv2 = ({
  height = 500,
  width = 500,
  className,
}: ILMIAssistantProps) => {
  return (
    <Image
      src="/student/home/ILMIAssistant.gif"
      height={height}
      width={width}
      alt="ILMI Assistant"
      className={`${className}`}
      priority
    />
  );
};

export default ILMIAssistantv2;
