import Image from 'next/image';
import React from 'react'

type CustomIconProps = {
    iconSrc: string;
    altText: string;
    className?: string;
    height?: number;
    width?: number;
}

const CustomIcon = ({iconSrc,altText,height=24,width=24,className}: CustomIconProps) => {
  return (
    <Image
    src={iconSrc}
    width={width}
    height={height}
    alt={altText}
    className={className}
  />
  )
}

export default CustomIcon