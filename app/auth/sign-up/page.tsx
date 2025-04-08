"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "@/feature/auth/sign-up/SignUpForm";
import Link from "next/link";

const SignUpPage = () => {
    return (
        <div>
            <Card className="w-[498px] rounded-3xl p-5 md:p-10 flex flex-col gap-10">

                <div className="flex justify-center">
                    <p className="text-2xl font-medium">Logo</p>
                </div>

                <CardHeader className='p-0 space-y-0 flex flex-col gap-2'>
                    <CardTitle className='text-[28px] font-medium'>Sign up</CardTitle>
                    <CardDescription className="text-sm font-normal text-label-color">Create a new account</CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                    < SignUpForm />
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

                    <p>Already have an account? <Link href="/auth/sign-in" className="text-blue-500">Sign In</Link> here</p>
                </CardFooter>

            </Card>
        </div>
    )
}

export default SignUpPage;