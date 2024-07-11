import type { Metadata } from "next";
import { DM_Sans, Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-tc",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Outsider Vibes - Where Oddity Orchestrates",
  description: "探索音樂，分享快樂",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${notoSansTC.variable}`}>
        {children}
      </body>
    </html>
  );
}
