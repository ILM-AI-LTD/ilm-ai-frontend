'use client';

import Country from '@/feature/students/setup/components/Country';
import Board from '@/feature/students/setup/components/Board';
import { useState } from 'react';

const STEPS = [
    { Component: Country, title: "Country" },
    { Component: Board, title: "Board" }
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