"use client"

import CustomButton from '@/components/global/CustomButton';
import InputField from '@/components/global/CustomInput';
import { SignInSchema } from '@/schema';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SignInForm = () => {
    const [disable, setDisable] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(true);

    useEffect(() => {
        const rememberMe = localStorage.getItem("rememberMe");
        setIsChecked(rememberMe === "true" || rememberMe === null);
    }, []);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        localStorage.setItem("rememberMe", event.target.checked.toString());
        // setIsremember(event.target.checked);
    };

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
                setDisable(true);
                // Call your sign-in API here
            },
        });


    return (
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
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

                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="form-checkbox h-4 w-4"
                        />
                        <label htmlFor="remember-me" className="font-medium text-sm text-primary-font-color">
                            Remember me
                        </label>
                    </div>

                    <div>
                        {disable ? (
                            <span className="text-sm font-medium text-blue-500 opacity-50">Forgot Password?</span>
                        ) : (
                            <Link href={"/#"} className="text-sm font-medium text-blue-500">
                                Forgot Password?
                            </Link>
                        )}
                    </div>
                </div>

            </div>

            <CustomButton
                label="Sign In"
                type="submit"
                // isLoading={isLoading}
                disabled={disable}
                className="rounded-full h-13 text-base font-semibold bg-button-primary-color hover:bg-button-primary-color cursor-pointer "
            />


        </form>
    )
}

export default SignInForm;

//TODO : remember me flicker issue fix with loading.