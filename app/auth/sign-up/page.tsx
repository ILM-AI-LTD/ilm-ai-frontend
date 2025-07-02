import CustomLogo from "@/components/global/CustomLogo";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "@/feature/auth/components/sign-up/SignUpForm";
import Link from "next/link";

const SignUpPage = () => {
    return (
        <div className="flex items-center flex-col gap-10">

            <Card className="w-full md:w-[500px] p-5 md:p-10 rounded-[20px] flex flex-col gap-6 bg-secondary border-none shadow-none">

                <CardHeader className="p-0 space-y-0 flex flex-col gap-6 justify-center items-center">

                    <CustomLogo logoSrc="/ilmino.svg" />

                    <div className="text-center flex flex-col gap-2">
                        <CardTitle className="text-2xl font-semibold text-foreground">Create a new account</CardTitle>
                        <CardDescription className="font-normal text-base text-muted-foreground">Enter your details to sign up</CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    < SignUpForm />
                </CardContent>


                <CardFooter className="flex-col p-0">
                    <p className="text-center text-foreground font-normal text-sm">By creating an account, you are agreeing to our <Link href="#" className="underline text-primary">Terms and Conditions</Link> and <Link href="#" className="underline text-primary">Privacy Policy</Link> </p>
                </CardFooter>

            </Card>

            <p className="text-foreground font-bold">Already have an account? <Link href="/auth/sign-in" className="text-primary hover:text-primary/80">Sign In</Link> here</p>

        </div>

    )
}

export default SignUpPage;