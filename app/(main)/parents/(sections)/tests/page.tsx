import Image from 'next/image'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full gap-6'>
      <Image
        src={"/temp/construction.svg"}
        alt={"subject"}
        height={600}
        width={600}
      />

      <p className='text-3xl text-foreground text-center'>Tests Is Under Construction!</p>
      <p className='text-xl text-foreground italic'>We Are Launching Soon.</p>
    </div>
  )
}

export default page