'use client';

import ChildDetailsSection from '@/feature/parents/components/setup/ChildDetails';
import ClassScheduleSection from '@/feature/parents/components/setup/ClassScheduleSection';
import GetStarted from '@/feature/parents/components/setup/GetStarted';
import { useState } from 'react';

const STEPS = [
    { Component: GetStarted, title: "Welcome" },
    { Component: ChildDetailsSection, title: "Child Details" },
    { Component: ClassScheduleSection, title: "Class Schedule" },
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