import React from 'react'
import Image from 'next/image'

const CustomLogo = () => {
    return (
        <Image
          src="/ILM_Logo.png"
          width={80}
          height={53}
          alt="ILM Logo"
        />
      )
}

export default CustomLogo