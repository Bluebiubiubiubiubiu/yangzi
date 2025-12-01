import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "杨紫星际档案 - 记录光芒，见证成长",
  description: "杨紫个人档案网站，收录影视作品、商业代言、荣誉奖项、行程动态等完整信息。记录光芒，见证成长。",
  keywords: "杨紫,演员,作品,代言,奖项,行程",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed inset-0 z-[-1] bg-black">
          <div className="absolute inset-0 bg-grid z-0" />
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent blur-[100px] pointer-events-none" />
        </div>
        <Navbar />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
