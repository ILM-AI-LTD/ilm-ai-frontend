import SubjectCard from "./SubjectCard"

const subjects = [
    {
        title: "Mathematics",
        description: "Master the art of mathematics with interactive problems, real-life examples that make numbers feel less scary and more fun.",
        iconSrc: "/Mathematics.svg"
    },
    {
        title: "Biology",
        description: "Learn biology by diving into animated cells, body systems, and nature explorations that make the living world exciting and easy to grasp.",
        iconSrc: "/Biology.svg"
    },
    {
        title: "Physics",
        description: "Explore physics through immersive animations, virtual experiments, and simulations that bring concepts of motion, energy, and forces to life.",
        iconSrc: "/Physics.svg"
    },
    {
        title: "Chemistry",
        description: "Discover the wonders of chemistry with interactive experiments and vibrant animations that bring reactions to life.",
        iconSrc: "/Chemistry.svg"
    },
]

export default function SubjectCoverSection() {
    return (
        <section className=' bg-background w-full flex flex-col items-center justify-center py-20 px-6 md:px-10 2xl:px-[135px] gap-8'>

            <p className="text-white font-bold text-[min(10vw,36px)] text-center">Explore Our Subjects</p>

            <div className='max-w-[1170px] grid grid-cols-1 md:grid-cols-2  bg-background rounded-4xl gap-4'>
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
