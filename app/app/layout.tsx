import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Querify AI - Natural Language to SQL",
  description: "Transform natural language questions into SQL queries using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050608] text-white`}
      >
        <div className="relative flex min-h-screen overflow-x-hidden bg-[#050608] text-white">
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(255,255,255,0.05),_transparent_24%),linear-gradient(180deg,_#050608_0%,_#07090d_40%,_#050608_100%)]" />
          <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-32 bg-[linear-gradient(180deg,_rgba(255,255,255,0.06),_transparent)] blur-3xl" />
          <Sidebar />
          <div className="min-w-0 flex-1">
            <Topbar />
            <main className="mx-auto w-full max-w-[1600px] px-4 py-4 pb-24 sm:px-6 sm:py-6 md:pb-8 xl:px-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
