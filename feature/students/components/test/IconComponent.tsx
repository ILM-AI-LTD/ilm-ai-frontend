import { Icons } from "./Icons";


export const IconComponent = ({ iconName }: { iconName: string }) => {
    const Icon = Icons[iconName as keyof typeof Icons];
  return Icon ? <Icon /> : <span className="text-2xl">❓</span>;
};