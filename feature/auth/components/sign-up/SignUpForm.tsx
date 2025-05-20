"use client"
import CustomButton from '@/components/global/CustomButton';
import FormError from '@/components/global/CustomFormError';
import InputField from '@/components/global/CustomInput';
import { SignUpSchema } from '@/schema';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '../../hooks/useAuth';

const SignUpForm = () => {
    const router = useRouter();
    const {
        signUp: { mutate: handleSignUp, isPending, error },
    } = useAuth()

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
        useFormik({
            initialValues: {
                email: "",
                fullName: "",
                password: "",
                confirmPassword: "",
            },
            validate: (values) => {
                try {
                    SignUpSchema.parse(values);
                } catch (error: any) {
                    return error.flatten().fieldErrors;
                }
            },
            onSubmit: async (values, action) => {
                handleSignUp(values, {
                    onSuccess: () => {
                        toast.success("Successfully Completed Registration.")
                        router.push('/parents/setup')
                        action.resetForm();
                    },
                    onError: () => {
                        toast.error("Something went wrong")
                    }
                })
            },
        });

    return (
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>

            <FormError error={error} />

            <div className="flex flex-col gap-4">

                <InputField
                    placeholder="Enter full name"
                    labelText="Full Name"
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.fullName}
                    touched={touched.fullName}
                />

                <InputField
                    placeholder="Enter email address"
                    labelText="Email Address"
                    name="email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.email && errors.email.length > 0 ? errors.email[0] : undefined}
                    touched={touched.email}
                />



                <InputField
                    placeholder={"\u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022"}
                    labelText="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.password}
                    touched={touched.password}
                />

                <InputField
                    placeholder={"\u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022"}
                    labelText="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.confirmPassword && errors.confirmPassword.length > 0 ? errors.confirmPassword[0] : undefined}
                    touched={touched.confirmPassword}
                />

            </div>

            <CustomButton
                label="Sign Up"
                type="submit"
                isLoading={isPending}
                disabled={isPending}
                className="rounded-full h-13 text-base font-semibold bg-brand-color hover:bg-brand-color cursor-pointer "
            />


        </form>
    )
}

export default SignUpForm