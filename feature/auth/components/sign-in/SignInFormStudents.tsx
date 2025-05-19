"use client"

import CustomButton from '@/components/global/CustomButton';
import FormError from '@/components/global/CustomFormError';
import InputField from '@/components/global/CustomInput';
import { SignInStudentsSchema } from '@/schema';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '../../hooks/useAuth';

const SignInFormStudents = () => {
    const router = useRouter()
    const {
        signInStudents: { mutate: handleSignInStudents, isPending, error }
    } = useAuth();

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
        useFormik({
            initialValues: {
                username: "",
                password: "",
                rememberMe: false,
            },
            validate: (values) => {
                try {
                    SignInStudentsSchema.parse(values);
                } catch (error: any) {
                    return error.flatten().fieldErrors;
                }
            },
            onSubmit: async (values, action) => {
                handleSignInStudents({
                    data: { username: values.username, password: values.password },
                    rememberMe: values.rememberMe
                },
                    {
                        onSuccess: (res) => {
                            // console.log(res.data);
                            toast.success("Successfully Logged In.");
                            action.resetForm();
                            //TODO: redirect to appropriate page based on student workflow
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
                    placeholder="Enter username "
                    labelText="Username"
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.username && errors.username.length > 0 ? errors.username[0] : undefined}
                    touched={touched.username}
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
{/* 
                <Link href="/auth/reset-password">
                    <p className="text-base text-brand-color hover:text-brand-color font-semibold">Forgot password?</p>
                </Link> */}
            </div>

            <CustomButton
                label="Sign In"
                type="submit"
                isLoading={isPending}
                disabled={isPending}
                className="rounded-full h-13 text-base font-semibold bg-brand-color hover:bg-brand-color cursor-pointer "
            />

        </form>
    )
}

export default SignInFormStudents;