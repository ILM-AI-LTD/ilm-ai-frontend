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
        <section className='bg-primary-bg-color w-full flex flex-col items-center justify-center py-20 px-6 md:px-10 2xl:px-[135px] gap-8'>

            <p className="text-white font-bold text-[min(10vw,36px)] text-center">Explore Our Subjects</p>

            <div className='max-w-[1170px] grid grid-cols-1 md:grid-cols-2 bg-primary-bg-color rounded-4xl gap-4'>
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
