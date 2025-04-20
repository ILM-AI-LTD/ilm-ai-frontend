"use client"

import CustomButton from "@/components/global/CustomButton";
import InputField from "@/components/global/CustomInput";
import { SetNewPasswordSchema } from "@/schema";
import { useFormik } from "formik";

export default function SetNewPasswordForm() {

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
        useFormik({
            initialValues: {
                password: "",
                confirmPassword: "",
            },
            validate: (values) => {
                try {
                    SetNewPasswordSchema.parse(values);
                } catch (error: any) {
                    return error.flatten().fieldErrors;
                }
            },
            onSubmit: async (values, action) => {
                // setDisable(true);
                // Call your sign-in API here
            },
        });


    return (
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">

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
                label="Reset Password"
                type="submit"
                // isLoading={isLoading}
                disabled={!(values.password.trim() && values.confirmPassword.trim())}
                className={`rounded-full h-13 text-base font-semibold cursor-pointer ${(values.password.trim() && values.confirmPassword.trim()) ? "bg-button-primary-color hover:bg-button-primary-color" : "bg-button-disabled-color hover:bg-button-disabled-color cursor-not-allowed"}`}
            />

        </form>
    )
}