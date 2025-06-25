"use client"

import CustomButton from "@/components/global/CustomButton";
import FormError from "@/components/global/CustomFormError";
import InputField from "@/components/global/CustomInput";
import { ResetPasswordSchema } from "@/schema";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";

export default function ResetPasswordForm() {

    const { resetPassword } = useAuth();
    const { mutate, isPending, error } = resetPassword;

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
                mutate(values, {
                    onSuccess: () => {
                        toast.success("A password reset instruction has been sent to your registered email.")
                        action.resetForm();
                    },
                    onError: () => {
                        toast.error("Something went wrong!")

                    }
                });
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

            </div>

            <CustomButton
                label="Reset Password"
                type="submit"
                isLoading={isPending}
                disabled={!values.email.trim()}
                className={`rounded-full h-13 text-base font-semibold cursor-pointer ${values.email.trim() ? "" : "cursor-none"}`}
            />

        </form>
    )
}