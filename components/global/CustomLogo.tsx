import React from 'react'
import Image from 'next/image'

type CustomLogoProps = {
  logoSrc: string;
}

const CustomLogo = ({ logoSrc }: CustomLogoProps) => {
  return (
    <Image
      src={logoSrc}
      width={126}
      height={35}
      alt="ILM Logo"
    />
  )
}

export default CustomLogo