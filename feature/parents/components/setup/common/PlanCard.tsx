import { Card, CardTitle } from '@/components/ui/card';

type PlanCardProps = {
    Icon: React.ComponentType<{ color?: string }>
    title: string
    isSelected?: boolean
    onClick?: () => void
}


const PlanCard = ({ Icon, title, isSelected = false, onClick }: PlanCardProps) => {

    const fillColor = isSelected ? '#7C4202' : 'white'

    return (
        <Card
            onClick={onClick}
            className={`cursor-pointer  bg-background max-w-[450px] w-full h-full flex flex-col items-center justify-center py-6 px-16 border-1 hover:scale-101 transform duration-300 border-parent-chatbox-color shadow-parent-chatbox-color shadow-md`}
        >
            <Icon color={fillColor} />

            <CardTitle className={`font-semibold text-xl text-center ${isSelected ? "text-parent-chatbox-color" : "text-white"}`}>
                {title}
            </CardTitle>
        </Card>
    )
}

export default PlanCard