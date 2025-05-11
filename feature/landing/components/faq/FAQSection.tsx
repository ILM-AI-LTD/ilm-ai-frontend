import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
    {
        question: "Will the platform work on tablets or mobile devices?",
        answer: ""
    },
    {
        question: "Can multiple children use the same account?",
        answer: "We offer family and multi-learner plans that allow you to manage multiple profiles under one account."
    },
    {
        question: "What subjects does the platform cover?",
        answer: ""
    },
    {
        question: "What makes your platform different from others?",
        answer: ""
    }
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