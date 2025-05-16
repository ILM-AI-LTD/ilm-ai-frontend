import CustomLogo from "@/components/global/CustomLogo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInFormParents from "@/feature/auth/components/sign-in/SignInFormParents";
import SignInFormStudents from "@/feature/auth/components/sign-in/SignInFormStudents";
import { TabsContent } from "@radix-ui/react-tabs";
import Link from "next/link";

const SignInPage = () => {
    return (
        <div className="w-full max-w-[500px] flex flex-col items-center gap-10">
            <Card className="w-full p-5 md:p-10 rounded-[20px] flex flex-col gap-6 bg-secondary-bg-color border-none shadow-none">

                <CardHeader className="p-0 space-y-0 flex flex-col gap-6 justify-center items-center">

                    <CustomLogo logoSrc="/ILM_AI_Logo.svg" />

                    <div className="text-center flex flex-col gap-2">
                        <CardTitle className="text-2xl font-semibold text-primary-font-color">Sign in to your account</CardTitle>
                        <CardDescription className="font-normal text-base text-label-color">Enter your details to sign in</CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="p-0 w-full">

                    <Tabs defaultValue="signin-parents" className="w-full">
                        <TabsList className="bg-primary-bg-color rounded-full border-1 border-brand-color p-1 mx-auto">
                            <TabsTrigger value="signin-parents" className="text-base rounded-full text-white  px-3 py-3">
                                Parents
                            </TabsTrigger>
                            <TabsTrigger value="signin-students" className="text-base rounded-full text-white px-3 py-3">
                                Students
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="signin-parents">
                            < SignInFormParents />
                        </TabsContent>
                        <TabsContent value="signin-students">
                            < SignInFormStudents />
                        </TabsContent>



                    </Tabs>
                </CardContent>

            </Card>

            <p className="text-primary-font-color">Do not have an account? <Link href="/auth/sign-up" className="text-brand-color">Sign Up</Link> here</p>


        </div>
    )
}

export default SignInPage;