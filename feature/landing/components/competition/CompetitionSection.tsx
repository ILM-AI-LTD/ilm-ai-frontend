import CompetitionForm from "./CompetitionForm"

const CompetitionSection = () => {
    return (
        <section className='bg-primary-bg-color w-full flex flex-col items-center justify-center px-5 md:px-32 py-32'>
            <div className='bg-secondary-bg-color rounded-3xl py-16 px-5 md:px-10  text-white flex flex-col gap-8 items-center'>
                <div className='w-full lg:w-[65%] flex flex-col gap-4 text-center'>
                    <p className='font-bold text-[min(10vw,48px)]'>Join the ILM Lab Competition and Showcase Your Skills!</p>
                    <p className='font-normal text-lg'>Test your knowledge, get recognized, and win amazing prizes! Ready to put your learning to the test?</p>
                </div>

                <CompetitionForm />

            </div>
        </section>
    )
}

export default CompetitionSection