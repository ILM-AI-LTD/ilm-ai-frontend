import { GettingStartedCard } from "./GettingStartCard";


const steps = [
    {
        title: 'Choose your AI mode',
        description:
            'Pick Mr. Classic or Mr. Sassy depending on your learning style.',
        imgSrc: 'mode.svg'
    },
    {
        title: 'Study your topic',
        description:
            ' Select lessons from a vast, structured curriculum.',
        imgSrc: 'topic.svg'
    },
    {
        title: 'Receive instant feedback',
        description:
            'Get evaluated with AI-powered insight and corrections.',
        imgSrc: 'feedback.svg'
    },
];

const GettingStartedSection = () => {
    return (
        <section className="bg-secondary-bg-color px-5 md:px-32 py-32 text-center">
            <h1 className='font-bold text-4xl text-white mb-16'>
                Getting started is easy!
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>

                {steps.map((step, idx) => (
                    <GettingStartedCard
                        key={idx}
                        index={idx}
                        title={step.title}
                        description={step.description}
                        imgSrc={step.imgSrc}
                    />
                ))}

            </div>


        </section>
    )
}

export default GettingStartedSection