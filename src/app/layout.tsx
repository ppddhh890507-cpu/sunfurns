import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sunfurns - Professional Sofa Manufacturer | B2B Furniture Supplier",
  description: "Sunfurns is a professional sofa manufacturer offering high-quality B2B furniture solutions. Factory direct pricing, custom OEM/ODM available. Contact us for wholesale inquiries.",
  keywords: "sofa manufacturer, furniture supplier, B2B furniture, wholesale sofa, custom furniture, OEM ODM furniture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
