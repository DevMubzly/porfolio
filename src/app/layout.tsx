import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const brooklyn = localFont({
  src: "../../public/fonts/BrooklynFreeRegular-ZpEYq.otf",
  variable: "--font-brooklyn",
});

export const metadata: Metadata = {
  title: "Balinda Mubarak - Product Engineer",
  description: "Product Engineer crafting elegant web applications and intelligent AI-powered systems.",
  metadataBase: new URL("https://bmubarak.xyz"),
  openGraph: {
    title: "Balinda Mubarak",
    description: "Product Engineer crafting elegant web applications and intelligent AI-powered systems.",
    type: "website",
    url: "https://bmubarak.xyz",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${brooklyn.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <SidePanel />
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
