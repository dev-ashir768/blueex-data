import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orio",
};

import TanstackProvider from "@/providers/TanstackProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>
          <NextTopLoader
            color="#0074fc"
            showSpinner={false}
            speed={200}
            easing="ease"
          />
          <Toaster position="bottom-right" richColors />
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
