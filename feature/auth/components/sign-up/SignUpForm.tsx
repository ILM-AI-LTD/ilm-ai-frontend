"use client"

import CustomButton from '@/components/global/CustomButton';
import InputField from '@/components/global/CustomInput';
import { SignUpSchema } from '@/schema';
import { useFormik } from 'formik';
import { useState } from 'react';

const SignUpForm = () => {
    const [disable, setDisable] = useState<boolean>(false);

    const { values, errors, touched, handleSubmit, handleChange, handleBlur} =
        useFormik({
            initialValues: {
                email: "",
                full_name: "",
                institute: "",
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
                setDisable(true);
                // Call your sign-up API here
            },
        });


    return (
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">

                <InputField
                    placeholder="Enter full name"
                    labelText="Full Name"
                    type="text"
                    name="full_name"
                    value={values.full_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.full_name}
                    touched={touched.full_name}
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
                    placeholder="Enter institute name"
                    labelText="Institute/School Name"
                    name="institute"
                    type="text"
                    value={values.institute}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.institute}
                    touched={touched.institute}
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
                // isLoading={isLoading}
                disabled={disable}
                className="rounded-full h-13 text-base font-semibold bg-button-primary-color hover:bg-button-primary-color cursor-pointer "
            />


        </form>
    )
}

export default SignUpForm