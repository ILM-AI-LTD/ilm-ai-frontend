import CustomButton from "@/components/global/CustomButton"

const CustomerService = () => {
    return (
        <section className="bg-primary-bg-color py-20 px-6 md:px-10 2xl:px-[135px]">

            <div className="max-w-[1170px] w-full bg-secondary-bg-color mx-auto p-6 md:p-10 flex flex-col lg:flex-row items-center lg:justify-between text-white rounded-3xl">

                <p className="text-[min(10vw,36px)] font-bold text-center lg:text-left w-full lg:w-[30%] ">Start today with ILM AI</p>

                <div className="flex flex-col gap-4 justify-center items-center lg:items-start w-full lg:w-[60%]">
                    <p className="font-medium text-lg text-center lg:text-left">
                        Empower your learning journey with AI-driven education designed to unlock your potential.
                    </p>

                    <CustomButton
                        label="Get Started"
                        className="w-[148px] h-12 bg-brand-color hover:bg-brand-color rounded-full font-bold"
                    />
                </div>

            </div>
        </section>
    )
}

export default CustomerService