import CustomButton from '@/components/global/CustomButton';
import InputField from '@/components/global/CustomInput';
import { SignUpSchema } from '@/schema';
import { useFormik } from 'formik';
import { useState } from 'react';

const SignUpForm = () => {
    const [disable, setDisable] = useState<boolean>(false);

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
        useFormik({
            initialValues: {
                Email: "",
                full_name: "",
                mobile: "",
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

            },
        });


    return (
        <form className='flex flex-col gap-6'>
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
                    labelText="Email address"
                    name="Email"
                    type="text"
                    value={values.Email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.Email && errors.Email.length > 0 ? errors.Email[0] : undefined}
                    touched={touched.Email}
                />

                <InputField
                    placeholder="Enter password"
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
                    placeholder="Retype password"
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
                label="Continue"
                type="submit"
                // isLoading={isLoading}
                disabled={disable}
                className="rounded-full h-12 text-base"
            />


        </form>
    )
}

export default SignUpForm