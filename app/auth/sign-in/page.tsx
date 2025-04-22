"use client"

import CustomLogo from "@/components/global/CustomLogo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm from "@/feature/auth/components/sign-in/SignInForm";
import Link from "next/link";

const SignInPage = () => {
    return (
        <div className="w-[500px] items-center flex flex-col gap-10">
            <Card className="w-full p-5 md:p-10 rounded-[20px] flex flex-col gap-6 bg-form-color border-none shadow-none">

                <CardHeader className="p-0 space-y-0 flex flex-col gap-6 justify-center items-center">

                    <CustomLogo />

                    <div className="text-center flex flex-col gap-2">
                        <CardTitle className="text-2xl font-semibold text-primary-font-color">Sign in to your account</CardTitle>
                        <CardDescription className="font-normal text-base text-label-color">Enter your details to sign in</CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    < SignInForm />
                </CardContent>

            </Card>

            <p className="text-primary-font-color">Do not have an account? <Link href="/auth/sign-up" className="text-button-primary-color">Sign Up</Link> here</p>


        </div>
    )
}

export default SignInPage;