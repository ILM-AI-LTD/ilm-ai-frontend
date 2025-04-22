"use client"

import CustomLogo from "@/components/global/CustomLogo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ResetPasswordForm from "@/feature/auth/components/reset-password/ResetPasswordForm";

const ResetPasswordPage = () => {
    return (
        <div className="flex items-center flex-col gap-10">
            <Card className="w-full md:w-[500px] p-5 md:p-10 rounded-[20px] flex flex-col gap-6 bg-form-color border-none shadow-none">

                <CardHeader className="p-0 space-y-0 flex flex-col gap-6 justify-center items-center">

                    <CustomLogo />

                    <div className="text-center flex flex-col gap-2">
                        <CardTitle className="text-2xl font-semibold text-primary-font-color">Reset your password</CardTitle>
                        <CardDescription className="font-normal text-base text-label-color">Enter your email address and we will send you password reset instructions</CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    < ResetPasswordForm />
                </CardContent>

            </Card>


        </div>
    )
}

export default ResetPasswordPage;