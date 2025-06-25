"use client"

import CustomButton from '@/components/global/CustomButton';
import FormError from '@/components/global/CustomFormError';
import InputField from '@/components/global/CustomInput';
import { SignInParentsSchema } from '@/schema';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '../../hooks/useAuth';

const SignInFormParents = () => {
    const router = useRouter()
    const {
        signInParents: { mutate: handleSignInParents, isPending, error }
    } = useAuth();

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
        useFormik({
            initialValues: {
                email: "",
                password: "",
                rememberMe: false,
            },
            validate: (values) => {
                try {
                    SignInParentsSchema.parse(values);
                } catch (error: any) {
                    return error.flatten().fieldErrors;
                }
            },
            onSubmit: async (values, action) => {
                handleSignInParents({
                    data: { email: values.email, password: values.password },
                    rememberMe: values.rememberMe
                },
                    {
                        onSuccess: (res) => {
                            const { hasChild } = res.data;
                            toast.success("Successfully Logged In.");
                            action.resetForm();
                            if (hasChild) {
                                router.push('/parents/profile')
                                //TODO: redirect to dashboard
                            } else {
                                router.push('/parents/setup')
                            }
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
                    placeholder="Enter email address"
                    labelText="Email address"
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

            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={values.rememberMe}
                        onChange={handleChange}
                        className="size-4 rounded-full"
                    />
                    <label htmlFor="remember-me" className="text-base text-label-color mb-1">Keep me logged in</label>
                </div>

                <Link href="/auth/reset-password">
                    <p className="text-base text-brand-color hover:text-brand-color font-semibold">Forgot password?</p>
                </Link>
            </div>

            <CustomButton
                label="Sign In"
                type="submit"
                isLoading={isPending}
                disabled={isPending}
                className="rounded-full h-13 text-base font-semibold"
            />

        </form>
    )
}

export default SignInFormParents;