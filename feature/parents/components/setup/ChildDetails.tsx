"use client"
import InputField from '@/components/global/CustomInput'
import { CustomSelect } from '@/components/global/CustomSelect'
import { ChildDetailsSchema } from '@/schema'
import { useFormik } from 'formik'
import { useParentsSetupStore } from '../../store/useParentsSetupStore'
import AssistantCallout from './common/AssistantCallout'
import FooterParents from './common/FooterParents'
import ILMIAssistantv2 from './common/ILMIAssistantv2'

interface ChildDetailsSectionProps {
    onNext: () => void
    onBack: () => void
}


const ChildDetailsSection = ({ onNext, onBack }: ChildDetailsSectionProps) => {

    const childDetails = useParentsSetupStore((s) => s.childDetails)
    const setChildDetails = useParentsSetupStore((s) => s.setChildDetails);

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
        useFormik({
            initialValues: {
                fullName: (childDetails as any).fullName,
                username: (childDetails as any).username,
                ageGroup: (childDetails as any).ageGroup,
                password: (childDetails as any).password,
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

                setChildDetails({
                    fullName: values.fullName,
                    username: values.username,
                    ageGroup: values.ageGroup,
                    password: values.password,
                })
                onNext();
            },
        });

    return (
        <div className='h-full max-w-[1770px] w-full flex flex-col py-3'>
            <div className='flex-1 flex flex-col overflow-auto'>
                <div className='inline-flex  items-center'>
                    <ILMIAssistantv2
                        height={180}
                        width={140}
                        className='h-[180px] w-[140px]'
                    />

                    <div className='mb-20'>
                        <AssistantCallout
                            message="Let's Start With Your Child's Details"
                            orientation="left"
                        />
                    </div>
                </div>

                <form action="" className='w-full max-w-[800px] mx-auto flex flex-col gap-4 mb-4' onSubmit={handleSubmit}>
                    <InputField
                        placeholder="Enter your child's full name"
                        labelText="Full Name"
                        name='fullName'
                        type='text'
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.fullName as any}
                        touched={!!touched.fullName}
                        className='h-12 bg-primary border-0 placeholder:text-white/60'
                    />
                    <InputField
                        placeholder="Enter your child's username"
                        labelText="Username"
                        name='username'
                        type='text'
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.username as any}
                        touched={!!touched.username}
                        className='h-12 bg-primary border-0 placeholder:text-white/60'
                    />
                    <CustomSelect
                        label="Age Group"
                        placeholder="Select Age Group"
                        options={[
                            { value: "Year 1–2", label: "Year 1–2 (Key Stage 1)" },
                            { value: "Year 3–6", label: "Year 3–6 (Key Stage 2)" },
                            { value: "Year 7–8", label: "Year 7-8 (Key Stage 3)" },
                            { value: "Year 9–11", label: "Year 9–11 (GCSE Level)" },
                            { value: "Year 12-13", label: "Year 12-13 (A-Level)" },
                        ]}
                        value={values.ageGroup}                         // Formik’s current value
                        onValueChange={(val) => {
                            // Tell Formik about the new field value
                            handleChange({ target: { name: "ageGroup", value: val } })
                        }}

                    />

                    <InputField
                        placeholder={"\u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022"}
                        labelText="Password"
                        name='password'
                        type='password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.password as any}
                        touched={!!touched.password}
                        className='h-12 bg-primary border-0 placeholder:text-white/60'
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
                        className='h-12 bg-primary border-0 placeholder:text-white/60'
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