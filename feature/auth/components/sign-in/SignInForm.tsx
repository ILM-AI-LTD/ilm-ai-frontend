"use client"

import CustomButton from '@/components/global/CustomButton';
import FormError from '@/components/global/CustomFormError';
import InputField from '@/components/global/CustomInput';
import { SignInSchema } from '@/schema';
import { useFormik } from 'formik';
import { useAuth } from '../../hooks/useAuth';

const SignInForm = () => {


    const {
        signIn: { mutate: handleSignIn, isPending, error }
    } = useAuth();

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
        useFormik({
            initialValues: {
                email: "",
                password: "",
            },
            validate: (values) => {
                try {
                    SignInSchema.parse(values);
                } catch (error: any) {
                    return error.flatten().fieldErrors;
                }
            },
            onSubmit: async (values, action) => {
                handleSignIn(values, {
                    onSuccess: () => {
                        action.resetForm();
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

            <CustomButton
                label="Sign In"
                type="submit"
                isLoading={isPending}
                disabled={isPending}
                className="rounded-full h-13 text-base font-semibold bg-button-primary-color hover:bg-button-primary-color cursor-pointer "
            />

        </form>
    )
}

export default SignInForm;

//TODO : remember me flicker issue fix with loading.