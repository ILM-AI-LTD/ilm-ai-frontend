import Image from 'next/image';
import React from 'react'

type ILMIAssistantProps = {
    height?: number;
    width?: number;
    className?: string;
}

const ILMIAssistant = ({height=500,width=500,className}: ILMIAssistantProps) => {
  return (
    
    <Image
        src="/ILMIAssistant.svg"
        height={height}
        width={width}
        alt="ILMI Assistant"
        className={`${className}`}
    />
  )
}

export default ILMIAssistant