import CustomLogo from "@/components/global/CustomLogo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SetNewPasswordForm from "@/feature/auth/components/set-new-password/SetNewPasswordForm";
import Link from "next/link";
import { Suspense } from "react";

const SetNewPasswordPage = () => {
  return (
    <div className="w-full max-w-[500px]  flex items-center flex-col gap-10">
      <Card className="w-full p-5 md:p-10 rounded-[20px] flex flex-col gap-6 bg-secondary border-none shadow-none">
        <CardHeader className="p-0 space-y-0 flex flex-col gap-6 justify-center items-center">
          <Link href="/">
            <CustomLogo logoSrc="/ilmino.svg" />
          </Link>

          <div className="text-center flex flex-col gap-2">
            <CardTitle className="text-2xl font-semibold text-foreground">
              Create new password
            </CardTitle>
            <CardDescription className="font-normal text-base text-muted-foreground">
              Your identity has been verified! Set your new password.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Suspense>
            <SetNewPasswordForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetNewPasswordPage;
