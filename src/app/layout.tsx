import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhatsApp Agent - Wablas Repack | Professional WhatsApp API Gateway",
  description: "Comprehensive WhatsApp API gateway service for businesses. Send/receive messages, manage devices, contacts, and more. Built with Next.js 15 and TypeScript.",
  keywords: ["WhatsApp", "API", "Gateway", "Wablas", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Business Messaging"],
  authors: [{ name: "Maul Jasmay" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "WhatsApp Agent - Professional WhatsApp API Gateway",
    description: "Send and receive WhatsApp messages at scale with our professional API gateway",
    url: "https://github.com/mauljasmay/whatsappwablasrepack",
    siteName: "WhatsApp Agent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Agent - Professional WhatsApp API Gateway",
    description: "Send and receive WhatsApp messages at scale",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ThemeProvider>
  );
}
