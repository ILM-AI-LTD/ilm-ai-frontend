import { Icons } from "./Icons";

export const IconComponent = ({ iconName, width = 80,
  height = 80,
}: {
  iconName: string;
  width?: number;
  height?: number;
}) => {
  const Icon = Icons[iconName as keyof typeof Icons];

  return Icon ? <Icon width={width} height={height} /> : <span className="text-2xl">❓</span>;
};