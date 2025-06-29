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
                <p className="text-base font-bold text-foreground">Enter OTP </p>
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
                        // disabled={!value.trim()}
                        className={`rounded-full h-13 text-base font-semibold cursor-pointer`}
                    />
                </div>
            </div>
        </form>
    )
}

export default VerifyEmailForm