"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  isLoading: boolean;
}

const LoginButton = ({ isLoading }: Props) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full rounded-xl py-5 font-medium bg-blue-600 hover:bg-blue-700 transition"
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="animate-spin h-5 w-5" />
          Logging in...
        </span>
      ) : (
        "Log In"
      )}
    </Button>
  );
};

export default LoginButton;
