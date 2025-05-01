import CustomButton from "@/components/global/CustomButton"

const CustomerService = () => {
    return (
        <section className="bg-primary-bg-color py-20 px-6 md:px-10 2xl:px-[135px]">

            <div className="max-w-[1170px] w-full bg-secondary-bg-color mx-auto p-6 md:p-10 flex flex-col lg:flex-row items-center lg:justify-between text-white rounded-3xl">

                <p className="text-[min(10vw,36px)] font-bold text-center lg:text-left w-full lg:w-[30%] ">Start today with ILM AI</p>

                <div className="flex flex-col gap-4 justify-center items-center lg:items-start w-full lg:w-[60%]">
                    <p className="font-medium text-lg text-center lg:text-left">
                        Speak with one of our sales specialists and determine which ILM AI product is best for you.
                    </p>

                    <CustomButton
                        label="Get in touch"
                        className="w-[148px] h-12 bg-white hover:bg-white rounded-full font-bold text-brand-color"
                    />
                </div>

            </div>
        </section>
    )
}

export default CustomerService