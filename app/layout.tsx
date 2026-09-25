import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "FixItNow — Your Trusted Home Service Platform",
  description:
    "Find trusted local professionals for every home project with FixItNow.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col ">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
