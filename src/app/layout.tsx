import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Balinda Mubarak - Developer",
  description: "Full-Stack Developer & AI Integration Engineer",
  metadataBase: new URL("https://bmubarak.tech"),
  openGraph: {
    title: "Balinda Mubarak",
    description: "Full-Stack Developer & AI Integration Engineer",
    type: "website",
    url: "https://bmubarak.tech",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8F8F8] text-[#222222]`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
