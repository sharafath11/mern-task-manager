"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface HeaderProps {
  isAuthenticated: boolean;
  userName?: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, userName, onLogout }) => {
  const router = useRouter();
  if(!isAuthenticated )router.push("/login")
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm py-4 px-6 flex items-center justify-between">
      
      {/* Brand / Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
        TaskManager
      </Link>

      {/* Right section */}
      <div>
        {!isAuthenticated ? (
          /* Guest Mode */
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>

            <Button
              className="rounded-xl bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push("/register")}
            >
              Sign Up
            </Button>
          </div>
        ) : (
          /* Authenticated Mode */
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">{userName}</span>

            <Button
              className="rounded-xl bg-red-600 hover:bg-red-700"
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
