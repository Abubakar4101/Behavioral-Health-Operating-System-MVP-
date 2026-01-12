import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/context/DemoContext";
import { Shell } from "@/components/layout/Shell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ventally | Clinical Workspace",
  description: "Next-generation EHR for modern clinicians",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <DemoProvider>
          <Shell>
            {children}
          </Shell>
        </DemoProvider>
      </body>
    </html>
  );
}
