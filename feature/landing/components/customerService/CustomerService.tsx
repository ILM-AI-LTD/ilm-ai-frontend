import CustomButton from "@/components/global/CustomButton"

const CustomerService = () => {
    return (
        <section className="bg-primary-bg-color px-5 md:px-32 py-32 text-center">

            <div className="w-full bg-secondary-bg-color mx-auto p-5 md:p-16 flex flex-col md:flex-row items-center justify-between text-white rounded-3xl">

                <p className="text-[min(10vw,48px)] font-bold text-center md:text-left">Start today with ILM AI</p>

                <div className="flex flex-col gap-4 items-center justify-center">
                    <p className="font-medium text-lg">
                        Speak with one of our sales specialists and determine which ILM AI product is best for you.
                    </p>

                    <CustomButton
                        label="Get in touch"
                        className="w-[148px] h-12 bg-white hover:bg-white rounded-full text-brand-color"
                    />
                </div>

            </div>
        </section>
    )
}

export default CustomerService