import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Namanya Precious - Curriculum Vitae",
};

export default function CVPreciousLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
