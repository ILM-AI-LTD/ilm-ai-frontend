import React from 'react'
import Image from 'next/image'

type CustomLogoProps = {
  logoSrc: string;
}

const CustomLogo = ({logoSrc}:CustomLogoProps) => {
    return (
        <Image
          src={logoSrc}
          width={48}
          height={60}
          alt="ILM Logo"
        />
      )
}

export default CustomLogo