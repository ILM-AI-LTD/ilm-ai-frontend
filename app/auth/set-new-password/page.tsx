"use client"

import CustomLogo from "@/components/global/CustomLogo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SetNewPasswordForm from "@/feature/auth/components/set-new-password/SetNewPasswordForm";

const SetNewPasswordPage = () => {
    return (
        <div className="w-full max-w-[500px]  flex items-center flex-col gap-10">
            <Card className="w-full p-5 md:p-10 rounded-[20px] flex flex-col gap-6 bg-secondary-bg-color border-none shadow-none">

                <CardHeader className="p-0 space-y-0 flex flex-col gap-6 justify-center items-center">

                    <CustomLogo />

                    <div className="text-center flex flex-col gap-2">
                        <CardTitle className="text-2xl font-semibold text-primary-font-color">Create new password</CardTitle>
                        <CardDescription className="font-normal text-base text-label-color">Your identity has been verified! Set your new password.</CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    < SetNewPasswordForm />
                </CardContent>

            </Card>


        </div>
    )
}

export default SetNewPasswordPage;