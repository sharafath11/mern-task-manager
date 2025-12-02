"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showErrorToast, showInfoToast, showSuccessToast } from "@/utils/toast";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import LoginButton from "./components/LoginButton";
import { validateEmail } from "@/validation/emailValidation";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) return showInfoToast("Invalid email address");
    if (!password) return showInfoToast("Password is required");

    setIsLoading(true);

    const res = await authService.login(email, password);

    if (!res?.ok) {
      setIsLoading(false);
      return showErrorToast(res?.msg);
    }

    showSuccessToast(res.msg);
    window.location.href="/";
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      {/* Left Side (image / brand area) */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-16">
        <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
        <p className="text-lg opacity-85 text-center leading-relaxed">
          Sign in to access your dashboard, tasks and productivity tools.
        </p>
      </div>

      {/* Right Side (form) */}
      <div className="flex flex-1 justify-center items-center px-6 py-12">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-2">
            Log In
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Use your email and password to sign in
          </p>
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300" />
            <span className="px-3 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* LoginButton (your logic kept intact) */}
            <LoginButton isLoading={isLoading} />
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
