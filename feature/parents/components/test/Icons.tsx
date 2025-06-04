import Image from "next/image";

const Zap = () => (
    <Image
        src={"/Battery.gif"}
        alt="Zap Icon"
        width={80}
        height={80}
        priority
    />
);

const Activity = () => (
    <Image
        src={"/Battery.gif"}
        alt="Zap Icon"
        width={80}
        height={80}
        priority
    />
);


export const Icons = {
    zap: Zap,
    activity: Activity,
};
