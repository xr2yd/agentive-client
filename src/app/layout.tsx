import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07070a",
};

export const metadata: Metadata = {
  title: "Agentive Client Portal",
  description: "Agentive Client Portal - AI Automation Management & Insights",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Agentive Client Portal",
    description: "AI Automation Management & Insights for Agentive clients.",
    type: "website",
    siteName: "Agentive",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentive Client Portal",
    description: "AI Automation Management & Insights for Agentive clients.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
