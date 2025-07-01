import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PricingSwitchProps {
    onSwitch: (value: string) => void
}

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => {
    return (
        <Tabs defaultValue="0" className="mx-auto" onValueChange={onSwitch}>
            <TabsList className=" bg-background rounded-full border-1 border-brand-color p-1">
                <TabsTrigger value="0" className="text-base rounded-full text-white  px-3 py-3">
                    Monthly
                </TabsTrigger>
                <TabsTrigger value="1" className="text-base rounded-full text-white px-3 py-3">
                    Annually
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default PricingSwitch;