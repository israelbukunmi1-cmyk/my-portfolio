import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { content } from "@/content/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const title = `${content.name} — Full-stack Developer`;

export const metadata: Metadata = {
  metadataBase: new URL(content.siteUrl),
  title,
  description: content.headline,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: content.siteUrl,
    siteName: content.name,
    title,
    description: content.headline,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: content.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: content.headline,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-app text-ink antialiased">{children}</body>
    </html>
  );
}