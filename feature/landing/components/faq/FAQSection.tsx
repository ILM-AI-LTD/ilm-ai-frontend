import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "../../constants";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import CustomButton from "@/components/global/CustomButton";

const FAQSection = () => {
  return (
    <section className="bg-secondary-bg-color py-32 px-6 md:px-10 2xl:px-[135px] flex flex-col items-center">
      <div className="max-w-[1170px] w-full grid grid-cols-1 md:grid-cols-2 rounded-4xl  gap-16 text-foreground">
        <div>
          <h1 className="font-bold text-[min(10vw,64px)] mb-6">
            Frequently Asked <span className=" text-[#8E8E8E]">Questions!</span>
          </h1>
          <Card className="bg-gradient-to-b from-[#ffffff] dark:from-[#0F172A] border-3 border-bg-border shadow-lg rounded-3xl py-8 px-6">
            {/* <CardTitle className=" text-2xl font-semibold">
              Still have Questions?
            </CardTitle> */}
            <div>
              <p className=" text-2xl font-semibold mb-2">
                Still have Questions?
              </p>
              <p className="text-foreground-subtitle text-lg">
                Contact us, we are happy to help you
              </p>
            </div>

            {/* <CardDescription className="text-[#677489] text-lg">
              
            </CardDescription> */}
            <Image
              src={"/landing/team_pic.svg"}
              alt={"image"}
              height={54}
              width={138}
              className="w-[137px] h-[54px] 2xl:w-[137px] 2xl:h-[54px]"
            />
            {/* <div className="flex">
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
            </div> */}

            {/* <CustomButton
              className={`btn-hover inline-flex h-12 w-1/2 items-center justify-center rounded-full bg-gradient-to-b from-[#E8E8E8] dark:from-[#1D2840] dark:to-[#000000] dark:shadow-[0px_6px_0px_0px_#373C4E] font-bold hover:bg-[#007AAC] border border-bg-border `}
              label={"Start Learning"}
              variant="outline"
            /> */}
            <CustomButton
              className={` inline-flex h-[48px] w-[215px] items-center justify-center rounded-full font-bold`}
              label={"Start Learning"}
              variant="outline"
              active={false}
            />
          </Card>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              // className="border-1 border-faq-border-color rounded-[12px] mb-4 px-6 py-4"
              className="bg-gradient-to-b from-[#ffffff] dark:from-[#0F172A] border-1 border-bg-border shadow-lg rounded-[12px] mb-4 px-6 py-4"
            >
              <AccordionTrigger className="font-semibold text-xl cursor-pointer py-2">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="font-medium text-base opacity-70">
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
