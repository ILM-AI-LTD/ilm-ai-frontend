"use client"
import InputField from '@/components/global/CustomInput'
import AssistantCallout from './common/AssistantCallout'
import FooterParents from './common/FooterParents'
import ILMIAssistant from './common/ILMIAssistant'


const ChildDetailsSection = () => {

    return (
        <div className='h-full max-w-[1770px] w-full flex flex-col py-5'>
            <div className='flex-1 flex flex-col overflow-auto'>
                <div className='inline-flex  items-center'>
                    <ILMIAssistant
                        height={180}
                        width={140}
                        className='h-[180px] w-[140px]'
                    />

                    <div className='mb-20'>
                        <AssistantCallout
                            message="Let's Start With Your Child's Full Name"
                            orientation="left"
                        />
                    </div>
                </div>

                <div className='w-full max-w-[800px] mx-auto flex flex-col gap-4'>
                    <InputField
                        placeholder="Enter your child's full name"
                        labelText="Full Name"
                        name='full name'
                        type='text'
                        className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
                    />
                    <InputField
                        placeholder="Enter your child's username"
                        labelText="Username"
                        name='full name'
                        type='text'
                        className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
                    />
                    <InputField
                        placeholder={"\u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022"}
                        labelText="Password"
                        name='password'
                        type='password'
                        className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
                    />
                    <InputField
                        placeholder={"\u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022"}
                        labelText="Confirm Password"
                        name='confirmPassword'
                        type='password'
                        className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
                    />
                </div>

            </div>

            <FooterParents
                leftButton={{ label: "Back" }}
                rightButton={{ label: "Next" }}
            />
        </div>
    )
}

export default ChildDetailsSection