import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sunfurns - 专业沙发制造商 | B2B家具供应商",
  description: "Sunfurns是一家专业沙发制造商，提供高品质B2B家具解决方案。工厂直供价，定制OEM/ODM服务。批发询价请联系我们。",
  keywords: "沙发制造商, 家具供应商, B2B家具, 批发沙发, 定制家具, OEM ODM家具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}