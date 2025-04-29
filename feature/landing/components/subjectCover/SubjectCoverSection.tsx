import Image from "next/image";


export default function FeatureDiagram() {
    return (
        <section className='bg-primary-bg-color w-full flex flex-col items-center justify-center px-5 md:px-32 py-32 gap-8'>

            <p className="text-white font-bold text-[min(10vw,48px)] text-center">Subjects We Cover</p>

            <Image
                src="/SubjectCover.svg"
                alt="subjectCover"
                height={1000}
                width={1000}
            />

        </section>
    )
}
