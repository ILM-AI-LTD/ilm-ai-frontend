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
        <section className="bg-secondary-bg-color py-20 px-6 md:px-10 2xl:px-[135px] flex flex-col items-center justify-center">
            <h1 className='font-bold text-[min(10vw,36px)] text-white mb-16 text-center'>
            Let’s Dive In, It’s Super Easy!
            </h1>

            <div className='max-w-[1170px] grid grid-cols-1 md:grid-cols-3 gap-4'>

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