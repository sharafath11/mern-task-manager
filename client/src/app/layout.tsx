"use client";

import { UserProvider } from "@/context/UserContext";
import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Header />
          <main className="p-6">
            {children}
            <Toaster />
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
