import CustomLogo from "@/components/global/CustomLogo";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "@/feature/auth/components/sign-up/SignUpForm";
import Link from "next/link";

const SignUpPage = () => {
    return (
        <div className="flex items-center flex-col gap-10">

            <Card className="w-full md:w-[500px] p-5 md:p-10 rounded-[20px] flex flex-col gap-6 bg-secondary-bg-color border-none shadow-none">

                <CardHeader className="p-0 space-y-0 flex flex-col gap-6 justify-center items-center">

                    <CustomLogo logoSrc="/ilmino.svg" />

                    <div className="text-center flex flex-col gap-2">
                        <CardTitle className="text-2xl font-semibold text-primary-font-color">Create a new account</CardTitle>
                        <CardDescription className="font-normal text-base text-label-color">Enter your details to sign up</CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    < SignUpForm />
                </CardContent>


                <CardFooter className="flex-col p-0">
                    <p className="text-center text-primary-font-color font-normal text-sm">By creating an account, you are agreeing to our <Link href="#" className=" underline">Terms and Conditions</Link> and <Link href="#" className="underline">Privacy Policy</Link> </p>
                </CardFooter>

            </Card>

            <p className="text-primary-font-color">Already have an account? <Link href="/auth/sign-in" className="text-brand-color">Sign In</Link> here</p>

        </div>

    )
}

export default SignUpPage;