import CustomButton from '@/components/global/CustomButton';
import InputField from '@/components/global/CustomInput';
import { SignInSchema } from '@/schema';
import { useFormik } from 'formik';
import { useState } from 'react';

const SignInForm = () => {
    const [disable, setDisable] = useState<boolean>(false);

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

            },
        });


    return (
        <form className='flex flex-col gap-6'>
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

export default SignInForm