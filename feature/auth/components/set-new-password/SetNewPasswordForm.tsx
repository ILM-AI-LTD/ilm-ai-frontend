"use client"

import CustomButton from "@/components/global/CustomButton";
import FormError from "@/components/global/CustomFormError";
import InputField from "@/components/global/CustomInput";
import { SetNewPasswordSchema } from "@/schema";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";

export default function SetNewPasswordForm() {

    const router = useRouter()

    const { setNewPassword } = useAuth();
    const { mutate, isPending, error } = setNewPassword;

    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');

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
                if (!token || !email) {
                    alert('Missing token or email in URL');
                    return;
                }

                mutate(
                    {
                        token,
                        email,
                        newPassword: values.password,
                    },
                    {
                        onSuccess: () => {
                            toast.success("Your password has been updated.")
                            action.resetForm();
                            router.push('/auth/sign-in')
                        },
                        onError: () => {
                            toast.error("Something went wrong")
                        }
                    }
                );
            },
        });


    return (
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>

            <FormError error={error} />

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
                isLoading={isPending}
                // disabled={!(values.password.trim() && values.confirmPassword.trim())}
                className={`rounded-full h-13 text-base font-semibold cursor-pointer ${(values.password.trim() && values.confirmPassword.trim()) ? "" : "cursor-not-allowed"}`}
            />

        </form>
    )
}