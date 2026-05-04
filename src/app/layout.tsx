import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EcoLoop AI – Industrial Waste Intelligence & Marketplace",
  description:
    "The world's first AI-driven industrial metabolism engine. Automate the classification, processing, and trading of manufacturing byproducts into high-grade resources.",
  keywords: "AI waste classification, industrial waste marketplace, circular economy, CO2 savings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Fonts – Space Grotesk loaded via CSS @import for headline font */}
      </head>
      <body>
        {/* Global sticky navbar */}
        <Navbar />
        {/* Page content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
