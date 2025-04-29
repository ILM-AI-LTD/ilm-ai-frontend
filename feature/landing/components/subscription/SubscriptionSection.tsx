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
        <section className='bg-primary-bg-color w-full flex flex-col items-center justify-center px-5 md:px-32 py-32'>

            <div className='bg-secondary-bg-color rounded-3xl py-16 px-5 md:px-10  text-white flex flex-col gap-8 items-center'>

                <div className='flex flex-col gap-4 text-center'>
                    <h2 className='font-bold text-5xl '>Choose Your Perfect Plan</h2>
                    <p className='font-normal text-lg'>Designed for every stage of your journey. Start today, no credit card required.</p>
                </div>

                <PricingSwitch onSwitch={togglePricingPeriod} />

                <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8">
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