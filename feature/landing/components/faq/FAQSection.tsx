import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
    {
        question: "Can multiple children use the same account?",
        answer: "We offer family and multi-learner plans that allow you to manage multiple profiles under one account."
    },
    {
        question: "Will the platform work on tablets or mobile devices?",
        answer: "Absolutely. ILM AI is optimized for desktops, tablets, and smartphones, both Android and iOS."
    },
    {
        question: "What subjects does the platform cover?",
        answer: "Currently, ILM AI covers Maths, Physics, Chemistry, and Biology"
    },
    {
        question: "What makes your platform different from others?",
        answer: "Our platform combines interactive lessons, smart progress tracking, and personalised learning paths to create a truly engaging and adaptive learning experience."
    },
    {
        question: "Can I set goals or schedules for my child?",
        answer: "Yes! Our platform allows parents to set learning goals and timetables to build healthy learning habits."
    },
    {
        question: "Can I set goals or schedules for my child?",
        answer: "Yes! Our platform allows parents to set learning goals and timetables to build healthy learning habits."
    },
    {
        question: "Can I customize my learning path?",
        answer: "Absolutely! You can personalise your learning experience by selecting specific topics or skills you wish to focus on, and adjust your pace accordingly."
    },
    {
        question: "How do I know if the script is too hard or too easy for my child?",
        answer: "The platform uses performance analytics to adjust difficulty automatically and alerts parents if changes are recommended."
    },
    {
        question: "How can I get started?",
        answer: "Simply sign up, create a profile, and select the subjects you want to study. You can begin exploring lessons and resources immediately!"
    },
    
];


const FAQSection = () => {
    return (
        <section className="bg-secondary-bg-color py-20 px-6 md:px-10 2xl:px-[135px] flex flex-col items-center">

            <h1 className='font-bold text-[min(10vw,36px)] text-white mb-16 text-center'>
                Frequently Asked Questions
            </h1>

            <div className="max-w-[1170px] w-full">
                <Accordion type="single" collapsible className="w-full">
                    {
                        faqItems.map((item, index) => (
                            <AccordionItem value={`item-${index}`} key={index} className="border-1 border-faq-border-color rounded-[12px] mb-4 px-6 py-4">
                                <AccordionTrigger className="font-semibold text-xl text-white cursor-pointer py-2">{item.question}</AccordionTrigger>
                                <AccordionContent className="font-medium text-base text-white opacity-70">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </div>

        </section>
    )
}

export default FAQSection