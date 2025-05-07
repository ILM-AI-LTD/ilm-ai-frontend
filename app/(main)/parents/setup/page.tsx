'use client';

import ChildDetailsSection from '@/feature/parents/components/ChildDetails';
import ChoosePlan from '@/feature/parents/components/ChoosePlan';
import GetStarted from '@/feature/parents/components/GetStarted';
import SelectAgeGroup from '@/feature/parents/components/SelectAgeGroup';
import { useState } from 'react';

const STEPS = [
    { Component: GetStarted, title: "Welcome" },
    { Component: ChoosePlan, title: "Choose Plan" },
    { Component: SelectAgeGroup, title: "Select Age" },
    { Component: ChildDetailsSection, title: "Child Details" },
];

const page = () => {

    const [step, setStep] = useState(0);
    const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
    const back = () => setStep((s) => Math.max(s - 1, 0));

    const { Component } = STEPS[step];


    return (
        <>
            <Component onNext={next} onBack={back} />

        </>

    )
}

export default page