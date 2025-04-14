"use client"

import CustomLogo from "@/components/global/CustomLogo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm from "@/feature/auth/sign-in/SignInForm";
import Link from "next/link";

const SignInPage = () => {
    return (
        <div className="w-[500px] items-center flex flex-col gap-10">
            <Card className="w-full p-5 md:p-10 rounded-[20px] flex flex-col gap-6">

                <CardHeader className="p-0 space-y-0 flex flex-col gap-6 justify-center items-center">

                    <CustomLogo />

                    <div className="text-center flex flex-col gap-2">
                        <CardTitle className="text-2xl font-semibold text-primary-color">Sign in to your account</CardTitle>
                        <CardDescription className="font-normal text-base text-label-color">Enter your details to sign in</CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    < SignInForm />
                </CardContent>

                {/* <CardFooter className="flex-col p-0">
                    <p className="text-base font-medium">
                        Already have an account?
                        {disable ? (
                            <span className=" text-brand-500 opacity-50 ml-1">
                                Sign in
                            </span>
                        ) : (
                            <Link
                                className="text-blue-500 ml-1"
                                to={"/signin"}
                            >
                                Sign in
                            </Link>
                        )}
                    </p>

                    <p>Don't have an account? <Link href="/auth/sign-up" className="text-blue-500">Sign Up</Link> here</p>
                </CardFooter> */}

            </Card>

            <p>Don't have an account? <Link href="/auth/sign-up" className="text-blue-500">Sign Up</Link> here</p>


        </div>
    )
}

export default SignInPage;