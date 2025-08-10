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
  title: "Balinda Mubarak – Portfolio",
  description: "Balinda Mubarak | Web Developer & AI Integrations Engineer",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Balinda Mubarak – Portfolio",
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
      </body>
    </html>
  );
}
