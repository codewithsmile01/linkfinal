import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "./globals.css";
import NavItems from "@/components/custom ui/NavItems";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-black min-h-screen flex flex-col`}>
          <NavItems />
          <div className="md:bg-slate-400 flex-1 w-full">
            <main className="max-w-6xl mx-auto">
              {children}
              <Toaster position="top-right" />
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
