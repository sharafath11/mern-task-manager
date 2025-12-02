"use client";

import { authService } from "@/services/authService";
import { IUser } from "@/types/userTypes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await authService.getUser();
    console.log("dfgdgfd",user)
    if (!res?.ok || !res?.data) {
      return router.push("/login");
    }

    setUser(res.data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading user data...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-10">
      <h1 className="text-3xl font-semibold text-gray-900">
        Welcome, {user.name || user.email}!
      </h1>

      <p className="text-gray-700 text-lg">
        Manage your tasks and stay organized.
      </p>
      <Button
        className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
        onClick={() => router.push("/tasks")}
      >
        Go to My Tasks
      </Button>
    </div>
  );
}
