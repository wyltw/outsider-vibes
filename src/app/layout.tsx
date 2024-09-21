import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { DM_Sans, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import SheetToggleContextProvider from "@/contexts/SheetToggleContextProvider";
import ResultsListContextProvider from "@/contexts/ResultsListContextProvider";

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
      <body
        className={`${dmSans.className} ${notoSansTC.className} bg-[#FDFBFE]`}
      >
        <SheetToggleContextProvider>
          <ResultsListContextProvider>{children} </ResultsListContextProvider>
        </SheetToggleContextProvider>

        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
