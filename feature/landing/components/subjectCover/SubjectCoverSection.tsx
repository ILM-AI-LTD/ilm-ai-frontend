import SubjectCard from "./SubjectCard"

const subjects = [
    {
        title: "Mathematics",
        description: "Dive into dynamic, hands-on lessons that spark curiosity, build confidence, and keep you excited about learning.",
        iconSrc: "/Mathematics.svg"
    },
    {
        title: "Biology",
        description: "Dive into dynamic, hands-on lessons that spark curiosity, build confidence, and keep you excited about learning.",
        iconSrc: "/Biology.svg"
    },
    {
        title: "Physics",
        description: "Dive into dynamic, hands-on lessons that spark curiosity, build confidence, and keep you excited about learning.",
        iconSrc: "/Physics.svg"
    },
    {
        title: "Chemistry",
        description: "Dive into dynamic, hands-on lessons that spark curiosity, build confidence, and keep you excited about learning.",
        iconSrc: "/Chemistry.svg"
    },
]

export default function FeatureDiagram() {
    return (
        <section className='bg-primary-bg-color w-full flex flex-col items-center justify-center px-5 md:px-32 py-32 gap-8'>

            <p className="text-white font-bold text-[min(10vw,48px)] text-center">Subjects We Cover</p>

            <div className='w-full grid grid-cols-1 sm:grid-cols-2 bg-primary-bg-color rounded-4xl p-5 sm:p-20 gap-4'>
                {
                    subjects.map((subject, index) => (
                        <SubjectCard 
                            key={index}
                            title={subject.title}
                            description={subject.description}
                            iconSrc={subject.iconSrc}
                        />
                    ))
                }
            </div>

        </section>
    )
}
