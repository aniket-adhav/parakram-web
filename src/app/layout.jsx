"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import ToastProvider from "@/components/providers/ToastProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          {/* 🔥 THIS IS REQUIRED */}
          <ToastProvider>
            <div className="min-h-screen overflow-y-auto custom-scrollbar bg-black">
                {children}
          </div>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
