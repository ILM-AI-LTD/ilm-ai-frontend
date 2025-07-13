"use client";

import CustomButton from "@/components/global/CustomButton";
import CustomLogo from "@/components/global/CustomLogo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInFormParents from "@/feature/auth/components/sign-in/SignInFormParents";
import SignInFormStudents from "@/feature/auth/components/sign-in/SignInFormStudents";
import Link from "next/link";
import { useState } from "react";

const SignInPage = () => {
  const [role, setRole] = useState<"students" | "parents">("students");

  return (
    <div className="w-full max-w-[500px] flex flex-col items-center gap-10">
      <Card className="w-full p-5 md:p-10 rounded-[20px] flex flex-col gap-6 bg-secondary border-none shadow-none">
        <CardHeader className="p-0 space-y-0 flex flex-col gap-6 justify-center items-center">
          <Link href="/">
            <CustomLogo logoSrc="/ilmino.svg" />
          </Link>
          <div className="text-center flex flex-col gap-2">
            <CardTitle className="text-2xl font-semibold text-foreground">
              Log In as a {role === "students" ? "Student" : "Parent"}
            </CardTitle>
            <CardDescription className="font-normal text-base text-muted-foreground">
              Enter your details to login
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0 w-full flex flex-col gap-6">
          {/* CustomButton Switcher */}
          <div className="flex justify-center gap-4">
            <CustomButton
              label="Parents"
              onClick={() => setRole("parents")}
              active={role === "parents"}
              className="h-9 font-bold text-sm rounded-full px-8 py-6"
            />

            <CustomButton
              label="Students"
              onClick={() => setRole("students")}
              active={role === "students"}
              className="h-9 font-bold text-sm rounded-full px-8 py-6"
            />
          </div>

          {/* Render Form */}
          {role === "students" ? <SignInFormStudents /> : <SignInFormParents />}
        </CardContent>
      </Card>

      <p className="text-foreground font-bold">
        Don’t have an account?{" "}
        <Link
          href="/auth/sign-up"
          className="text-primary hover:text-primary/80"
        >
          Sign Up
        </Link>{" "}
        here
      </p>
    </div>
  );
};

export default SignInPage;
