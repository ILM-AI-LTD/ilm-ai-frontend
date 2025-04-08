"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm from "@/feature/auth/sign-in/SignInForm";
import Link from "next/link";

const SignInPage = () => {
    return (
        <div>
            <Card className="w-[498px] rounded-3xl p-5 md:p-10 flex flex-col gap-10">

                <div className="flex justify-center">
                    <p className="text-2xl font-medium">Logo</p>
                </div>

                <CardHeader className='p-0 space-y-0 flex flex-col gap-2'>
                    <CardTitle className='text-[28px] font-medium'>Sign In</CardTitle>
                    <CardDescription className="text-sm font-normal text-label-color">Get into your account</CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                    < SignInForm />
                </CardContent>

                <CardFooter className="flex-col p-0">
                    {/* <p className="text-base font-medium">
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
                    </p> */}

                    <p>Don't have an account? <Link href="/auth/sign-in" className="text-blue-500">Sign Up</Link> here</p>
                </CardFooter>

            </Card>
        </div>
    )
}

export default SignInPage;