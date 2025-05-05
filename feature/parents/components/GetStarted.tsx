import AssistantCallout from './common/AssistantCallout'
import FooterParents from './common/FooterParents'
import ILMIAssistant from './common/ILMIAssistant'

const GetStarted = () => {
    return (
        <div className='h-full max-w-[1770px] w-full flex flex-col py-10'>
            <div className='flex-1 flex flex-col items-center justify-center gap-2 overflow-auto'>
                <AssistantCallout
                    message="Hello! I’m Ilmi – your personal assistant. Let’s get started by setting up your child’s learning profile."
                    orientation="bottom"
                />

                <ILMIAssistant
                    height={297}
                    width={270}
                    className='h-[160px] w-[144px] md:h-[213px] md:w-[193px] 2xl:h-[297px] 2xl:w-[270px]'
                />
            </div>

          

            <FooterParents
                rightButton={{ label: "Let's Get Started" }}
            />
        </div>
    )
}

export default GetStarted