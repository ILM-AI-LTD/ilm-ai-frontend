"use client"

import CustomLogo from "@/components/global/CustomLogo";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "@/feature/auth/sign-up/SignUpForm";
import Link from "next/link";

const SignUpPage = () => {
    return (

        <div className="w-[500px] items-center flex flex-col gap-10">
            <Card className="p-5 md:p-10 rounded-[20px] flex flex-col gap-6">

                <CardHeader className="p-0 space-y-0 flex flex-col gap-6 justify-center items-center">

                    <CustomLogo />

                    <div className="text-center flex flex-col gap-2">
                        <CardTitle className="text-2xl font-semibold text-primary-color">Create a new account</CardTitle>
                        <CardDescription className="font-normal text-base text-label-color">Enter your details to sign up</CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    < SignUpForm />
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

                    
                </CardFooter> */}


                <CardFooter className="flex-col p-0">

                    <p className="text-center text-label-color font-normal text-sm">By creating an account, you are agreeing to our <Link href="#" className="text-primary-color underline">Terms and Conditions</Link> and <Link href="#" className="text-primary-color underline">Privacy Policy</Link> </p>

                </CardFooter>

            </Card>

            <p>Already have an account? <Link href="/auth/sign-in" className="text-blue-500">Sign In</Link> here</p>
            
        </div>

    )
}

export default SignUpPage;