"use client"

import InputField from "@/components/global/CustomInput"

const ChildDetailsForm = () => {
    return (
        <form action="" className="flex flex-col gap-4">
            <InputField
                placeholder="Enter your child's full name"
                labelText="Full Name"
                name='full name'
                type='text'
                className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
            />
            <InputField
                placeholder="Enter your child's username"
                labelText="Username"
                name='full name'
                type='text'
                className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
            />
            <InputField
                placeholder={"\u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022"}
                labelText="Password"
                name='password'
                type='password'
                className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
            />
            <InputField
                placeholder={"\u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022"}
                labelText="Confirm Password"
                name='confirmPassword'
                type='password'
                className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
            />
        </form>
    )
}

export default ChildDetailsForm