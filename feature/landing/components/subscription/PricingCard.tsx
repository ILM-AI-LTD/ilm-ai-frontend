import CustomButton from "@/components/global/CustomButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";

interface PricingCardProps {
  isYearly?: boolean;
  title: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  monthlyPriceId?: string;
  yearlyPriceId?: string;
  description: string;
  features: string[];
  actionLabel: string;
  popular?: boolean;
  exclusive?: boolean;
  discount?: boolean;
  discountedPrice?: {
    monthly?: number;
    yearly?: number;
  };
  idx: number;
}

// const calculateSubscriptionType = (
//   start: string,
//   end: string
// ): "monthly" | "yearly" | null => {
//   const startDate = new Date(start);
//   const endDate = new Date(end);
//   const diffInDays =
//     (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

//   if (diffInDays >= 28 && diffInDays <= 31) {
//     return "monthly";
//   } else if (diffInDays >= 364 && diffInDays <= 366) {
//     return "yearly";
//   }
//   return null;
// };

const PricingCard = ({
  isYearly,
  title,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  actionLabel,
  popular,
  discountedPrice,
  idx,
}: // monthlyPriceId,
// yearlyPriceId,
PricingCardProps) => {
  const originalPrice = isYearly ? yearlyPrice : monthlyPrice;
  const discountPrice = isYearly
    ? discountedPrice?.yearly
    : discountedPrice?.monthly;
  const savings = originalPrice && discountPrice ? discountPrice : null;

  // const currentSubscriptionType = calculateSubscriptionType(
  //   data?.currentPeriodStart,
  //   data?.currentPeriodEnd
  // );
  // const isCurrentSubscription =
  //   data?.productName === title &&
  //   data?.status === "active" &&
  //   ((isYearly && currentSubscriptionType === "yearly") ||
  //     (!isYearly && currentSubscriptionType === "monthly"));

  return (
    <Card
      className={cn(
        "w-full flex flex-col justify-between mx-auto sm:mx-0",
        "border-3 transition-colors duration-200",
        "[&:has(.btn-hover:hover)]:border-brand-color",
        " bg-gradient-to-b from-[#ffffff] dark:from-[#0F172A] text-foreground p-6 gap-6",
        idx === 1 ? "border-[#006C98]" : "border-bg-border"
      )}
    >
      <div className="flex flex-col gap-6">
        <CardHeader className="p-0 space-y-0 gap-2 border-b-1 border-dashed pb-4">
          {isYearly && yearlyPrice && monthlyPrice ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl font-normal">{title}</CardTitle>
              </div>

              <div className="flex flex-row gap-2">
                {popular ? (
                  <div className="flex flex-row px-2.5 rounded-xl h-fit text-sm py-1 bg-gradient-to-r from-brand-500 to-[#FF5834] ">
                    <Zap size={12} className="mr-1 mt-1" />
                    Popular
                  </div>
                ) : savings !== null ? (
                  <div
                    className={cn(
                      "px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200 text-black dark:bg-zinc-800 "
                    )}
                  >
                    Save ${savings ? savings * (isYearly ? 1 : 12) : 0}
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl font-normal text-foreground">
                  {title}
                </CardTitle>
              </div>

              {popular && (
                <div className="flex flex-row px-2.5 rounded-xl h-fit text-sm py-1 bg-gradient-to-r from-brand-500 to-[#FF5834] text-white">
                  <Zap size={12} className="mr-1 mt-1" />
                  Popular
                </div>
              )}
            </div>
          )}

          <div className="flex gap-0.5 items-baseline">
            {originalPrice && discountPrice ? (
              <div className="flex flex-row items-center gap-1">
                <div className="inline-flex gap-1 justify-center">
                  {/* <p className="text-xl line-through text-gray-400">
                    £{originalPrice}
                  </p> */}
                  {/* <span className="flex flex-col text-xs line-through text-gray-400 mt-1">
                    {yearlyPrice && isYearly
                      ? "/year"
                      : monthlyPrice
                        ? "/month"
                        : null}
                  </span> */}
                </div>

                <div className="inline-flex gap-1">
                  <h3 className="text-[min(10vw,26px)] font-bold">
                    {originalPrice - discountPrice === 0
                      ? "Free"
                      : `£${originalPrice - discountPrice}`}
                  </h3>
                  <span className="flex flex-col justify-end text-sm mb-1">
                    {originalPrice - discountPrice === 0
                      ? null
                      : yearlyPrice && isYearly
                      ? "per year"
                      : monthlyPrice
                      ? "per month"
                      : null}
                  </span>
                </div>
              </div>
            ) : (
              <div className="inline-flex gap-1">
                <h3 className="text-[min(10vw,26px)] font-bold">
                  {originalPrice === 0 ? "Free" : `£${originalPrice}`}
                </h3>
                <span className="flex flex-col justify-end text-sm mb-1">
                  {yearlyPrice && isYearly
                    ? "per year"
                    : monthlyPrice
                    ? "per month"
                    : null}
                </span>
              </div>
            )}
          </div>

          <CardDescription className="p-0 font-normal text-base">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 p-0">
          {features.map((feature: string) => (
            <CheckItem key={feature} text={feature} />
          ))}
        </CardContent>
      </div>

      <CardFooter className="flex flex-col gap-3 p-0">
        {/* <CustomButton
          className={cn(
            "btn-hover inline-flex h-12 w-full items-center justify-center rounded-full font-bold  text-foreground hover:bg-[#007AAC] border border-bg-border  hover:text-white",
            idx === 1
              ? "bg-gradient-to-b from-[#004D6C] to-[#006C98]  hover:border-0 text-white"
              : "bg-gradient-to-b from-[#E8E8E8] dark:from-[#1D2840] dark:to-[#000000] dark:shadow-[0px_6px_0px_0px_#373C4E] "
          )}
          label={actionLabel}
          variant="outline"
        /> */}
        <CustomButton
          className={cn(
            "btn-hover inline-flex h-12 w-full items-center justify-center rounded-full font-bold hover:text-white"
          )}
          label={actionLabel}
          variant="outline"
          active={idx === 1 ? true : false}
        />
      </CardFooter>
    </Card>
  );
};

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex flex-row items-start  gap-2">
    <div className="flex justify-start mt-1">
      <Check size={16} className=" text-brand-500" />
    </div>
    <p className="text-base font-medium">{text}</p>
  </div>
);

export default PricingCard;
