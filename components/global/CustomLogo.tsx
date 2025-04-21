import React from 'react'
import Image from 'next/image'

const CustomLogo = () => {
    return (
        <Image
          src="/ILM_AI_Logo.png"
          width={48}
          height={60}
          alt="ILM Logo"
        />
      )
}

export default CustomLogo