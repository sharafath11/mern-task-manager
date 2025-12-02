"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const {user,}=useUser()
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-10">
      <h1 className="text-3xl font-semibold text-gray-900">
        Welcome, {user?.name || user?.email}!
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
