"use client"
import InputField from '@/components/global/CustomInput'
import { ChildDetailsSchema } from '@/schema'
import { useFormik } from 'formik'
import AssistantCallout from './common/AssistantCallout'
import FooterParents from './common/FooterParents'
import ILMIAssistant from './common/ILMIAssistant'

interface ChildDetailsSectionProps {
    onNext: () => void
    onBack: () => void
}

const ChildDetailsSection = ({ onNext, onBack }: ChildDetailsSectionProps) => {

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
        useFormik({
            initialValues: {
                fullName: "",
                userName: "",
                password: "",
                confirmPassword: "",
            },
            validate: (values) => {
                try {
                    ChildDetailsSchema.parse(values);
                } catch (error: any) {
                    return error.flatten().fieldErrors;
                }
            },
            onSubmit: async (values, action) => {
                onNext();
            },
        });

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

                <form action="" className='w-full max-w-[800px] mx-auto flex flex-col gap-4' onSubmit={handleSubmit}>
                    <InputField
                        placeholder="Enter your child's full name"
                        labelText="Full Name"
                        name='fullName'
                        type='text'
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.fullName}
                        touched={touched.fullName}
                        className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
                    />
                    <InputField
                        placeholder="Enter your child's username"
                        labelText="Username"
                        name='userName'
                        type='text'
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.userName}
                        touched={touched.userName}
                        className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
                    />
                    <InputField
                        placeholder={"\u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022"}
                        labelText="Password"
                        name='password'
                        type='password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.password}
                        touched={touched.password}
                        className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
                    />
                    <InputField
                        placeholder={"\u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022"}
                        labelText="Confirm Password"
                        name='confirmPassword'
                        type='password'
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.confirmPassword && errors.confirmPassword.length > 0 ? errors.confirmPassword[0] : undefined}
                        touched={touched.confirmPassword}
                        className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
                    />
                </form>

            </div>

            <FooterParents
                leftButton={{ label: "Back", onClick: onBack }}
                rightButton={{ label: "Next", onClick: handleSubmit, disabled: Object.keys(errors).length > 0 || Object.keys(touched).length === 0 }}
            />
        </div>
    )
}

export default ChildDetailsSection