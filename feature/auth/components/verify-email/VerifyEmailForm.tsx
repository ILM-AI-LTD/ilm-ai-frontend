"use client"

import CustomButton from '@/components/global/CustomButton'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import React from 'react'

const VerifyEmailForm = () => {

    const [value, setValue] = React.useState("")

    return (
        <form className="flex flex-col gap-6">

            {/* <FormError error={error} /> */}

            <div className="flex flex-col items-start gap-2">
                <p className="text-base font-medium text-primary-font-color">Enter OTP </p>
                <div className="w-full flex flex-col gap-5">

                    <InputOTP
                        maxLength={6}
                        value={value}
                        onChange={(value) => setValue(value)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>


                    <CustomButton
                        type="submit"
                        label="Verify OTP"
                        disabled={!value.trim()}
                        // isLoading={isLoading}
                        className={`rounded-full h-13 text-base font-semibold cursor-pointer ${value.trim() ? "bg-button-primary-color hover:bg-button-primary-color" : "bg-button-disabled-color hover:bg-button-disabled-color cursor-not-allowed"}`}
                    />
                </div>
            </div>
        </form>
    )
}

export default VerifyEmailForm