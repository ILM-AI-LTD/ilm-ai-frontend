"use client"

import CustomButton from "@/components/global/CustomButton";
import InputField from "@/components/global/CustomInput";
import { ResetPasswordSchema } from "@/schema";
import { useFormik } from "formik";

export default function ResetPasswordForm() {

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
        useFormik({
            initialValues: {
                email: "",
            },
            validate: (values) => {
                try {
                    ResetPasswordSchema.parse(values);
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

            </div>

            <CustomButton
                label="Reset Password"
                type="submit"
                // isLoading={isLoading}
                disabled={!values.email.trim()}
                className={`rounded-full h-13 text-base font-semibold cursor-pointer ${values.email.trim() ? "bg-brand-color hover:bg-brand-color" : "bg-button-disabled-color hover:bg-button-disabled-color cursor-not-allowed"}`}
            />

        </form>
    )
}