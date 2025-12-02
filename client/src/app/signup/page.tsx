"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateSignup } from "@/validation/authValidation";
import { showErrorToast, showInfoToast, showSuccessToast } from "@/utils/toast";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const RegisterPage = () => {
  const router = useRouter();

  const [fullname, setFullname] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateSignup({
      name: fullname,
      email,
      password,
      confirmPassword,
    });

    if (error) {
      showInfoToast(error);
      return;
    }

    setIsLoading(true);

    const res = await authService.register(
      fullname,
      email,
      password,
      confirmPassword
    );

    if (!res?.ok) {
      setIsLoading(false);
      return showErrorToast(res?.msg);
    }

    showSuccessToast(res.msg);
    router.push("/login");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50">

      {/* LEFT SECTION */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 
                      bg-gradient-to-br from-violet-600 to-indigo-700 text-white px-16">
        <h1 className="text-4xl font-bold mb-4">Create an Account</h1>
        <p className="text-lg opacity-90 leading-relaxed text-center">
          Sign up to manage your tasks, stay organized, and track progress easily.
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-1 justify-center items-center px-6 py-12">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-100">

          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-2">
            Sign Up
          </h2>
          <p className="text-gray-500 text-center mb-8">Create an account to get started</p>

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-5">

            {/* NAME */}
            <div className="flex flex-col gap-2">
              <Label>Full Name</Label>
              <Input
                placeholder="John Doe"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="flex flex-col gap-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl py-5 font-medium bg-violet-600 hover:bg-violet-700 transition"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5" />
                  Creating account...
                </span>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
