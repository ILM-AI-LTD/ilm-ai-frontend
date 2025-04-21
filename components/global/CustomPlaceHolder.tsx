import Image from "next/image"

const CustomPlaceHolder = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <Image
                priority
                src="/webpage_illustration.svg"
                height={500}
                width={500}
                alt="Follow us on Twitter"
            />

            <p className="text-5xl text-primary-font-color">Coming soon!</p>
        </div>
    )
}

export default CustomPlaceHolder