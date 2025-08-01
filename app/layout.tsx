import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { BackgroundProvider } from "@/components/background-provider";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description:
    "Create beautiful backgrounds with spots, grids, and dots for your web projects. Free and open-source.",
  keywords: [
    "tailwind backgrounds",
    "tailwind css backgrounds",
    "tailwind svg background",
    "tailwind grid background",
    "web design tool",
    "open source",
  ],
  authors: [{ name: "Pragyan Pandey", url: "https://pragyan.fyi" }],
  creator: "Pragyan Pandey",
  metadataBase: new URL("https://bg.pragyan.fyi"),
  openGraph: {
    title: "Tailwind Backgrounds",
    description: "Build beautiful Tailwind-friendly backgrounds instantly.",
    url: "https://bg.pragyan.fyi",
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@pragyanfyi",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundProvider>{children}</BackgroundProvider>
        </ThemeProvider>
        <Toaster expand={false} position="bottom-right" richColors />
      </body>
    </html>
  );
}
