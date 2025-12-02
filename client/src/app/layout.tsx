"use client";

import Header from "@/components/Header/Header";
import { authService } from "@/services/authService";
import { useEffect, useState } from "react";
import "./globals.css";
import { Toaster } from "react-hot-toast";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    authService.getUser().then((res) => {
      if (res?.ok) setUser(res.data);
    });
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Header
          isAuthenticated={!!user}
          userName={user?.name}
          onLogout={handleLogout}
        />

        <main className="p-6">{children}  <Toaster /> </main>
      </body>
    </html>
  );
}
