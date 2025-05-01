import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
    {
        question: "Can I switch between Mr. Classic and Mr. Sassy?",
        answer: "Yes, you can easily switch between Mr. Classic and Mr. Sassy teaching styles in your account settings. Mr. Classic offers a traditional teaching approach, while Mr. Sassy provides a more engaging and humorous learning experience. Switch anytime based on your child's preference or learning needs!"
    },
    {
        question: "How does Ilm AI evaluate handwritten answers?",
        answer: "Our system uses advanced AI handwriting recognition technology. Students can write their answers on paper, snap a photo, and upload it. Ilm AI reads, analyzes, and provides detailed feedback instantly — just like a real teacher!"
    },
    {
        question: "Is there a free trial available before subscribing?",
        answer: "Absolutely! We offer a 14-day free trial that gives you full access to all features. No credit card required to start your trial. Experience the full capabilities of our platform before making a commitment."
    },
    {
        question: "How are progress and reports shared with parents?",
        answer: "Parents receive weekly progress reports via email and can access a comprehensive dashboard showing their child's performance, strengths, and areas for improvement. The dashboard highlights completed assignments, mastery levels, and learning trends. Parents can also enable real-time notifications for important milestones."
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
                            <AccordionItem value={`item-${index}`} key={index} className="border-1 border-faq-border-color rounded-[12px] mb-4 p-6">
                                <AccordionTrigger className="font-semibold text-2xl text-white cursor-pointer">{item.question}</AccordionTrigger>
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