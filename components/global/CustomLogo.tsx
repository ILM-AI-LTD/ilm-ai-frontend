import React from "react";
import Image from "next/image";

type CustomLogoProps = {
  logoSrc: string;
  width?: number;
  height?: number;
};

const CustomLogo = ({ logoSrc, width = 126, height = 35 }: CustomLogoProps) => {
  return <Image src={logoSrc} width={width} height={height} alt="ILM Logo" />;
};

export default CustomLogo;
