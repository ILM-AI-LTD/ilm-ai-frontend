import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "../../constants";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import CustomButton from "@/components/global/CustomButton";

const FAQSection = () => {
  return (
    <section className="bg-secondary-bg-color py-20 px-6 md:px-10 2xl:px-[135px] flex flex-col items-center">
      <div className="max-w-[1170px] w-full grid grid-cols-1 md:grid-cols-2 rounded-4xl  gap-4 ">
        <div>
          <h1 className="font-bold text-[min(10vw,64px)] text-white mb-16">
            Frequently Asked <span className=" text-[#8E8E8E]">Questions!</span>
          </h1>
          <Card className="bg-gradient-to-b from-[#0F172A] border-3 border-[#1B2130] rounded-3xl py-8 px-6">
            <CardTitle className="text-white text-2xl font-bold">
              Still have Questions
            </CardTitle>

            <CardDescription className="text-[#677489] text-lg">
              Contact us, we are happy to help you
            </CardDescription>
            <div className="flex">
              <Image
                src={"/landing/dummyUser.jpeg"}
                alt={"image"}
                height={54}
                width={54}
                className="w-[54px] h-[54px] 2xl:w-[54px] 2xl:h-[54px]"
              />
              <Image
                src={"/landing/dummyUser.jpeg"}
                alt={"image"}
                height={54}
                width={54}
                className="w-[54px] h-[54px] 2xl:w-[54px] 2xl:h-[54px]"
              />
              <Image
                src={"/landing/dummyUser.jpeg"}
                alt={"image"}
                height={54}
                width={54}
                className="w-[54px] h-[54px] 2xl:w-[54px] 2xl:h-[54px]"
              />
            </div>

            <CustomButton
              className={`btn-hover inline-flex h-12 w-1/2 items-center justify-center rounded-full  bg-background text-white font-bold hover:bg-[#007AAC] hover:text-white border-1 border-brand-color `}
              label={"Start Learning"}
              variant="outline"
            />
          </Card>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              // className="border-1 border-faq-border-color rounded-[12px] mb-4 px-6 py-4"
              className="bg-gradient-to-b from-[#0F172A] border-1 border-[#1B2130] rounded-[12px] mb-4 px-6 py-4"
            >
              <AccordionTrigger className="font-semibold text-xl text-white cursor-pointer py-2">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="font-medium text-base text-white opacity-70">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
