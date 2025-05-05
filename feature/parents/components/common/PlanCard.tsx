import { Card, CardTitle } from '@/components/ui/card';

type PlanCardProps = {
    Icon: React.ComponentType<{ color?: string }>
    title: string
    isSelected?: boolean
    onClick?: () => void
}


const PlanCard = ({ Icon, title, isSelected = false, onClick }: PlanCardProps) => {

    const fillColor = isSelected ? '#4B2700' : 'white'

    return (
        <Card
            onClick={onClick}
            className={`cursor-pointer bg-primary-bg-color max-w-[400px] w-full h-full flex flex-col items-center justify-center py-6 px-16 border-1 ${isSelected ? "border-brand-color-parent" : "border-white"}`}
        >
            <Icon color={fillColor} />

            <CardTitle className={`font-semibold text-xl text-center ${isSelected ? "text-brand-color-parent" : "text-white"}`}>
                {title}
            </CardTitle>
        </Card>
    )
}

export default PlanCard