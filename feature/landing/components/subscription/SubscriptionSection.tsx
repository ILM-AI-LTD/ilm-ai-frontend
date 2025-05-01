'use client'

import { useState } from 'react';
import PricingSwitch from './PricingSwitch';
import plans from './data';
import PricingCard from './PricingCard';

const SubscriptionSection = () => {

    const [isYearly, setIsYearly] = useState(false);
    const togglePricingPeriod = (value: string) =>
        setIsYearly(parseInt(value) === 1);


    return (
        <section className='bg-primary-bg-color w-full flex flex-col items-center justify-center py-20 px-6 md:px-10 2xl:px-[135px] gap-8'>

            <div className='max-w-[1170px] w-full bg-secondary-bg-color rounded-3xl py-16 px-4 md:px-6  text-white flex flex-col items-center gap-8'>

                <div className='flex flex-col gap-4 text-center'>
                    <h2 className='font-bold text-[min(10vw,36px)]'>Choose Your Perfect Plan</h2>
                    <p className='font-normal text-lg'>Designed for every stage of your journey. Start today, no credit card required.</p>
                </div>

                <PricingSwitch onSwitch={togglePricingPeriod} />

                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plans.map((plan) => {
                        return (
                            <PricingCard key={plan.title} {...plan} isYearly={isYearly} />
                        );
                    })}
                </section>

            </div>

        </section>
    )
}

export default SubscriptionSection