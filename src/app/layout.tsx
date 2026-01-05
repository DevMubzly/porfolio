import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Mubzly's - Portfolio",
  description: "Balinda Mubarak | Web Developer & AI Integrations Engineer",
  metadataBase: new URL("https://bmubarak.tech"),
  openGraph: {
    title: "Dev Mubzly",
    description: "Web Developer & AI Integrations Engineer",
    type: "website",
    url: "https://example.com",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
  <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh selection:bg-black selection:text-white flex flex-col`}>        
        {children}
        <Analytics />
      </body>
    </html>
  );
}
